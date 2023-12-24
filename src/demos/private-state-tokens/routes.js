const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
	res.render('src/common/under-construction', {
		title: '🚧 Private State Tokens Demo'
	});
});

module.exports = router;
