// Import necessary modules
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env file

// Configure CORS (Cross-Origin Resource Sharing) for handling cross-origin requests
app.use(cors({
	origin: true,
	credentials: true
}));

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies from the request headers
app.use(cookieParser());

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure EJS (Embedded JavaScript templates) as the view engine for rendering
app.set('view engine', 'ejs');
app.set('views', __dirname);  // Set the views directory

// Middleware to set global variables for use in EJS templates
app.use((req, res, next) => {
	res.locals.commonPath = path.join(__dirname, 'common');
	res.locals.protocol = process.env.protocol;
	res.locals.domainA = process.env['domain-a'];
	res.locals.domainB = process.env['domain-b'];
	res.locals.domainC = process.env['domain-c'];
	res.locals.port = process.env.port;
	res.locals.isPortPresent = req.get('host').includes(':');
	res.locals.currentDomain = req.get( 'host' );
	switch ( res.locals.currentDomain ) {
		case res.locals.domainA:
			res.locals.backgroundColor = process.env['domain-a-background'];
			break;
		case res.locals.domainB:
			res.locals.backgroundColor = process.env['domain-b-background'];
			break;
		case res.locals.domainC:
			res.locals.backgroundColor = process.env['domain-c-background'];
			break;
		default:
			res.locals.backgroundColor = 'bg-gray-100';
	}
	next();  // Proceed to the next middleware or route handler
});

// Mount routes for different demo types
const demoTypes = ['chips', 'first-party-sets', 'private-state-tokens', 'fedcm', 'storage-access-api'];
demoTypes.forEach(demoType => {
	const demoRoutes = require(`./demos/${demoType}/routes`);
	app.use(`/${demoType}`, demoRoutes);  // Mount the routes on a path specific to the demo type
});

// Mount routes for different scenarios
const scenarios = [
	'ecommerce',
	'single-sign-on',
	'analytics',
	'embedded-video',
	'payment-gateway',
];
scenarios.forEach(scenario => {
	const scenarioRoutes = require(`./scenarios/${scenario}/routes`);
	app.use(`/${scenario}`, scenarioRoutes);  // Mount the routes on a path specific to the scenario
});

// Catch-all route handler for unmatched routes, rendering the default page
app.use((req, res) => {
	res.render(path.join(__dirname, 'common/index'), {
		title: 'Privacy Sandbox Demos'
	});
});

// Start the server and listen on the specified port
app.listen(process.env.port, () => {
	console.log('Server is running on port ' + process.env.port);
});
