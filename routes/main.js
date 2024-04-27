const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const memberController = require('../controllers/member');

// Routes for user authN
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

// Routes for user
router.get('/user/:id', memberController.getMember);
router.get('/members', memberController.getMembers);
router.put('/user/edit', memberController.editMember);
router.delete('/user/delete/:id', memberController.deleteMember);

module.exports = router;
