const express = require('express');
const router = express.Router();
const Storage = require('node-storage');
const store = new Storage('./data');
const {Schedule} = require('../Schedule');
const {CourseModel} = require('../models/CourseModel');


const {body, param, validationResult} = require('express-validator');

//TASK 4
// save the schedule in storage..
router.post('/schedules', [

    // validate the name field, sanitize it. if it already exists return an error
    body('name')
        .trim()
        .custom((value, {req}) => !Schedule.nameAlreadyExists(req.body.name))
        .withMessage('The schedule name already exists. Please choose another one.')
        .not().isEmpty().withMessage('Please enter the schedule name'),

], (req, res) => {

    let {name} = req.body;

    // if we have errors return it
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }

    (new Schedule(name)).save();

    res.send({msg: `Schedule named "${name}" has been successfully created!`});

});

// TASK 5
router.put('/schedules/:name/subjects/:subject/courses/:course', [

    param('name')
        .trim()
        .custom((value, {req}) => Schedule.nameAlreadyExists(req.params.name)).withMessage('That schedule cannot be found')
        .not().isEmpty().withMessage('Please enter the schedule name'),

    param('subject')
        .trim()
        .not().isEmpty().withMessage('Please enter the subject')
        .custom((value, {req}) => CourseModel.getAllCourseCodeBySubjectCode(req.params.subject).length > 0).withMessage('Please enter a valid subject'),

    param('course')
        .trim()
        .not().isEmpty().withMessage('Please enter the course ID')
        .custom((value, {req}) => CourseModel.isValidCourseId(req.params.course)).withMessage('Please enter a valid Course ID')

], (req, res) => {

    let {name, subject, course} = req.params;

    // if we have errors return it
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }

    let courses = CourseModel.search(subject, course).map(item => {
        return {
            id: item.id,
            subject: item.subject,
        }
    });

    // if we cannot match their search...
    if (courses.length === 0) {
        return res.status(404).send('Not a valid course content.');
    }


    let schedule = Schedule.get(name);
    console.log(schedule);
    schedule.courses.push(courses);
    schedule.save();

    res.send(schedule)

});

// TASK 6 - Get the list of subject code, course code pairs for a given schedule. [5 points]
router.get('/schedules/:schedule', (req, res) => {
    if (!Schedule.nameAlreadyExists(req.params.schedule)) {
        res.status(404).send('Schedule not found');
    }

    res.send(Schedule.get(req.params.schedule));
});

// get all user schedules (with courses)
router.get('/schedules', (req, res) => {
    let schedules = Schedule.getAll();

    return res.send(schedules);
});

// TASK 9 delete all schedules
router.delete('/schedules', (req, res) => {
    Schedule.deleteAll();
    return res.send({"msg": "All schedules have been deleted successfully."});
});

// TASK 7 - delete a schedule with a given name
router.delete('/schedules/:schedule', (req, res) => {

    // check if schedule exists
    if (!Schedule.nameAlreadyExists(req.params.schedule)) {
        res.status(404).send('Schedule not found');
    }
    Schedule.delete(req.params.schedule);
    res.send({"msg": "This schedule has been deleted successfully"});
});

module.exports = router;
