const express = require('express');
const router = express.Router();
const { getUsers, regUser } = require('../controllers/users-controller');

router
    .route('/')
    .get(getUsers)
    .post(regUser)

module.exports = router;