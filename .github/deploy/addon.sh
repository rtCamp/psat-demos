#!/bin/bash

__dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
source "$__dir/helper.sh"

APP_DIR="$GITHUB_WORKSPACE"

[[ -d "${APP_DIR:-}" ]] || emergency "$APP_DIR path doesn't exits. Aborting.."

setup_basic() {
    info "Init and Validations."
    hosts_file="$GITHUB_WORKSPACE/.github/hosts.yml"
    REMOTE_USER=$(shyaml get-value "${GITHUB_BRANCH}.user" < "$hosts_file" || true)
    REMOTE_HOST=$(shyaml get-value "${GITHUB_BRANCH}.hostname" < "$hosts_file" || true) REMOTE_PATH=$(shyaml get-value "${GITHUB_BRANCH}.deploy_path" < "$hosts_file" || true)
    RELEASES_LIMIT=$(shyaml get-value "${GITHUB_BRANCH}.prev_releases_limit" < "$hosts_file" || true)

    [[ "${REMOTE_HOST:-}" ]] || emergency "The variable ${CYAN} hostname ${ENDCOLOR} is missing in hosts.yml"
    [[ "${REMOTE_USER:-}" ]] || emergency "The vairable ${CYAN} user ${ENDCOLOR} is missing in hosts.yml"
    [[ "${REMOTE_PATH:-}" ]] || emergency "The variable ${CYAN} deploy_path ${ENDCOLOR} is missing in hosts.yml"

    # remove leading slash
    REMOTE_PATH="${REMOTE_PATH%/}"

    setup_ssh

    ssh-keyscan -H "$REMOTE_HOST" >>/etc/ssh/ssh_known_hosts 2>/dev/null

    APP_PATH="${REMOTE_PATH}/app"
    RELEASE_FOLDER_NAME="releases/$(date +'%d-%b-%Y--%H-%M')"
    APP_REMOTE_RELEASE_PATH="${REMOTE_PATH}/app/${RELEASE_FOLDER_NAME}"

    info "Everything looks good !"
}

handle_releases(){
    # create folder
    info "Deploy code to server."
    cd ~/
    mkdir -p "$RELEASE_FOLDER_NAME"
    echo "::group::local rsync log."
    rsync -avzhP "${APP_DIR}/" "${RELEASE_FOLDER_NAME}/"
    echo "::endgroup::"
    remote_execute "$REMOTE_PATH" "mkdir -p ${REMOTE_PATH}/app/releases"
    echo "::group::remote rsync log."
    rsync -avzhP  "${RELEASE_FOLDER_NAME}" "$REMOTE_USER"@"$REMOTE_HOST":"$REMOTE_PATH/app/releases/"
    echo "::endgroup::"
    info "Deploy code to server."
}

handle_build_server(){
    # building the app
    info "App Build: Started"
    remote_execute "$REMOTE_PATH" "ln -sfn $APP_REMOTE_RELEASE_PATH $REMOTE_PATH/builder"
    echo "::group::Remote Build log."
    remote_execute "$REMOTE_PATH" "docker compose up builder --no-log-prefix --exit-code-from builder"
    echo "::endgroup::"
    BUILD_STANDALONE_STATUS="$?"

    remote_execute "$REMOTE_PATH" "unlink $REMOTE_PATH/builder"

    # check if build was successful
    if [[ "$BUILD_STANDALONE_STATUS" -gt 0 ]]; then
        error "App Build: Failed"
        remote_execute "$REMOTE_PATH" "rm -rf $APP_REMOTE_RELEASE_PATH"
        exit 1
    else
        info "App Build: Successful"
    fi
}

handle_after_build(){
    info "Symlink latest deployment."
    remote_execute "$APP_PATH" "ln -sfn $RELEASE_FOLDER_NAME current"
    info "Restarting server"
    remote_execute "$REMOTE_PATH" 'docker compose restart server'
    remote_execute "$REMOTE_PATH" 'docker compose up -d server'
}

retain_releases(){
    echo "::group::Cleanup Releases."
    if [[ "${RELEASES_LIMIT:-}" ]]; then
        info "Removing redundant previous releases"
        info "Retain only -> $RELEASES_LIMIT releases"
        list_of_releases=$(remote_execute "${APP_PATH}/releases" "ls -1t")
        RELEASES_LIMIT=$(( "$RELEASES_LIMIT" + 1 ))
        to_remove_dirs=$( tail +$RELEASES_LIMIT <<< "$list_of_releases" )

        for dir in $to_remove_dirs; do
            info "Removing dir -> $dir"
            remote_execute "${APP_PATH}/releases" "rm -rf $dir"
        done
    fi
    echo "::endgroup::"
}

function main() {
    setup_basic
    handle_releases
    handle_build_server
    handle_after_build
    retain_releases
}
main
