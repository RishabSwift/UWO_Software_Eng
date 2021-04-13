const fs = require('fs');
const {Course} = require('./Course');

class Timetable {

    /**
     * Parse the timetable.json file and return it as an array of Course objects
     * @returns {[]}
     */
    static getAll() {

        let courses = [];

        // read file synchronously
        const data = fs.readFileSync('src/timetable.json', 'utf8');

        let timetable = JSON.parse(data);

        // loop through data and store all in their respective fields
        timetable.forEach((item) => {
            let course = new Course(item.catalog_nbr, item.subject, item.className, item.catalog_description, item.course_info[0]); // access 0 element because it's nested array
            courses.push(course)
        });

        return courses;
    }


}

module.exports = {Timetable};