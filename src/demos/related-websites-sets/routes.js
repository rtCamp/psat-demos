const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('src/common/under-construction', {
		title: '🚧 Related Website  Sets Demo'
	});
});

module.exports = router;
