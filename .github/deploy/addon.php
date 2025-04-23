<?php

namespace Deployer;

set( 'rsync', [
	'exclude'       => [
		'.git',
		'.github',
		'deploy.php',
		'composer.lock',
		'.env',
		'.env.example',
		'.gitignore',
		'.gitlab-ci.yml',
		'.circleci',
		'phpcs.xml',
	],
	'exclude-file'  => true,
	'include'       => [],
	'include-file'  => false,
	'filter'        => [],
	'filter-file'   => false,
	'filter-perdir' => false,
	'flags'         => 'rz', // Recursive, with compress
	'options'       => [ 'delete', 'delete-excluded', 'links', 'no-perms', 'no-owner', 'no-group' ],
	'timeout'       => 300,
] );


desc( 'Restart the site' );
task( 'site:restart', function () {
	run( 'cd {{release_path}} && ee site disable && ee site enable' );
} );

/**
 * Update the tasks variable and add your tasks in the order where they should be.
 * You can also remove any tasks which you may not need.
 */
$tasks = [
	'deploy:prepare',
	'deploy:unlock',
	'deploy:lock',
	'deploy:release',
	'rsync',
	'deploy:symlink',
	'site:restart',
	'deploy:unlock',
	'cleanup',
];

// Stop editing now. The above given tasks will be run by deploy.php of this action now.
