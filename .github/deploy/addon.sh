#!/usr/bin/env bash

function setup_files() {
	cd "$GITHUB_WORKSPACE"
	export build_root="$(pwd)"
}

function main() {
	setup_hosts_file
	check_branch_in_hosts_file
	setup_ssh_access
	maybe_install_node_dep
	maybe_run_node_build
	setup_files # Adding the custom function in the order where needed.
	deploy
}

main
