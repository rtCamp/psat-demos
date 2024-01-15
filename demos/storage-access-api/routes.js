const express = require('express');
const path = require('path');
const router = express.Router();
const uuid = require( 'uuid' );

router.get('/', (req, res) => {
    	res.render(path.join(__dirname,'index'), {
		title: 'Storage Access API'
	    });
});

// Serve the analytics.js file to the site
router.get('/analytics.js', (req, res) => {
    let userName = req.cookies.userName;

    // An array of 20 most commonly used names
    const commonNames = [
        "Liam", "Olivia", "Noah", "Emma", "Oliver", "Ava", "Isabella", "Sophia", "Mia", "Charlotte",
        "Amelia", "Harper", "Evelyn", "Abigail", "Emily", "Elizabeth", "Mila", "Ella", "Scarlett", "Grace"
    ];

    // Function to randomly select a name from the array
    function getRandomName(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    // Call the function to get a random name
    const randomName = getRandomName(commonNames);
    if (!userName) {

        // Generate a new user name
        userName = randomName;

        // Store the user name in a cookie
        res.cookie('userName', userName, {
            Domain: res.locals.domainC,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
            sameSite: "none",
            secure: true
        });
    }

    // Set the appropriate content type and send the analytics code
    res.set('Content-Type', 'application/javascript');
    res.render(path.join(__dirname,'analytics'));
});

module.exports = router;