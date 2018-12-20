const express = require('express');

const router = express.Router();

const middleware = require('../middleware');

const adminController = require('../controllers/admin');


router.get('/dashboard', middleware.isLoggedIn, adminController.getStudents);

router.get('/add-user', middleware.isLoggedIn, adminController.getAddUserPage);

router.post('/add-user', middleware.isLoggedIn, adminController.postAddUser);

router.get('/edit-student/:studentId', middleware.isLoggedIn, adminController.getEditStudent);

router.post('/edit-student', middleware.isLoggedIn, adminController.postEditStudent);

router.post('/delete-student', middleware.isLoggedIn, adminController.postDeleteStudent);

// AUTH ROUTES

// router.get('/register', adminController.getRegisterPage);

// router.post('/register', adminController.postRegisterPage);

// router.get('/login', adminController.getLoginPage);

// router.post('/login',)

module.exports = router;