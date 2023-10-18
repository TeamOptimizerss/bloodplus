const express = require('express');
const router = express.Router();

const MailController = require('../controllers/MailController');

router.post('/sendmail', MailController.sendMail);

module.exports = router;
