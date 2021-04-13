const express = require('express');
const router = express.Router();
const {CourseModel} = require('../models/CourseModel');


// Get all subject code and descriptions (task 1)
router.get('/courses', (req, res) => {
    return res.send(CourseModel.getAll());
});

router.get('/subjects', (req, res) => {
    return res.send(CourseModel.getAllSubjects());
});

router.get('/components', (req, res) => {
    return res.send(CourseModel.getAllComponents());
});


router.get('/subjects/:subject', (req, res) => {
    let courses = CourseModel.getAllCourseCodeBySubjectCode(req.params.subject);
    if (courses.length === 0) {
        return res.sendStatus(404);
    }
    return res.send(courses);
});

// to satisfy a task - Used in front end TASK #3
router.get('/subjects/:subject/courses/:course', (req, res) => {
    let courses = CourseModel.search(req.params.subject, req.params.course, req.query.component);

    if (courses.status === 'error') {
        return res.status(404).send(courses.message);
    }

    return res.send(courses);
});

// search...
router.get('/search', (req, res) => {
    let courses = CourseModel.searchUsingOR(req.query.subject, req.query.course, req.query.component);

    if (courses.status === 'error') {
        return res.status(404).send(courses.message);
    }

    return res.send(courses);
});


module.exports = router;

