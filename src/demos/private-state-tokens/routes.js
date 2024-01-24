const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
	res.render('common/under-construction', {
		title: '🚧 Private State Tokens'
	});
});

module.exports = router;
