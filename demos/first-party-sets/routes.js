const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('common/under-construction', {
		title: '🚧 First Party Sets Demo'
	});
});

module.exports = router;
