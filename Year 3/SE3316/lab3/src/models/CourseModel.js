const {Timetable} = require('../Timetable');

class CourseModel {

    /**
     * Task 1
     * Get all courses mapped by name and description
     * @returns {*}
     */
    static getAll() {
        return this.mapByNameAndDescription(Timetable.getAll());
    }

    /**
     * Map helper
     * @param arr
     * @returns Array
     */
    static mapByNameAndDescription(arr) {
        return arr.map(item => {
            return {
                name: item.name,
                description: item.description,
            }
        });
    }

    /**
     * Get all subjects
     * @returns Array
     */
    static getAllSubjects() {
        let all = Timetable.getAll().map(item => {
            return item.subject;
        });
        return [...new Set(all)]; // all unique
    }

    /**
     * Get all course components
     * @returns Array
     */
    static getAllComponents() {
        let all = Timetable.getAll().map(item => {
            return item.component;
        });
        return [...new Set(all)]; // all unique
    }


    /**
     * TASK 2
     * get subject from course code (catalog_nbr)
     * @param subject
     * @returns {{subject: (Document.subject|Certificate), id: *}[]}
     */
    static getAllCourseCodeBySubjectCode(subject) {
        return Timetable.getAll().filter(course => course.subject === subject).map(item => {
            return {
                id: item.id,
                subject: item.subject,
            }
        });
    }

    /**
     * Determine if the course ID is valid
     * @param id
     * @returns {boolean}
     */
    static isValidCourseId(id) {
        return Timetable.getAll().filter(course => course.id === id).length > 0;
    }


    /**
     * TASK 3
     * Search using OR
     * Get the course code
     * @param subject
     * @param course
     * @param optionalComponent
     * @returns {*[]|{message: string, status: string}}
     */
    static search(subject, course, optionalComponent) {

        if (!optionalComponent) {
            optionalComponent = undefined;
        }

        let timetable = Timetable.getAll();

        let results = timetable.filter((item) => {

            // the initial condition is that subject and course ID must be present and match
            // if it doesn't, we will return false
            let condition = item.subject === subject && item.id.includes(course);

            if (!condition) return false;

            // if we have an optionalComponent as a query param, then we should search for that too
            // otherwise return the initial condition
            if (optionalComponent === undefined) {
                return condition;
            }

            return condition && optionalComponent === item.component;

        });

        // if we have some results, return it
        if (results.length > 0) {
            return results;
        }


        // check if subject or course code doesn't exist
        if (timetable.filter(item => subject === item.subject).length === 0) {
            return {
                status: 'error',
                message: 'Subject not found!'
            }
        }

        if (timetable.filter(item => course === item.id).length === 0) {
            return {
                status: 'error',
                message: 'Course ID not found'
            }
        }

        return results;
    }


    /**
     * Used for front end search
     * Where we can search using an OR statement for better user experience...
     * The above method - search() - is only there to satisfy the task #3
     * @param subject
     * @param course
     * @param component
     */
    static searchUsingOR(subject, course, component) {
        let timetable = Timetable.getAll();

        subject = subject.toUpperCase();
        course = course.toUpperCase();
        component = component.toUpperCase();

        return timetable.filter((item) => {


            // if they entered all...
            if (subject && course && component) {
                return item.subject === subject && item.id.includes(course) && item.component === component;
                // if they entered subject and course ID... match these two together
            } else if (subject && course) {
                return item.subject === subject && item.id.includes(course);
            }
            // if they entered course ID only, only search for that...
            else if (!subject && course && !component) {
                return item.id.includes(course);
            }

            // if they only entered subject...
            else if (subject && !course && !component) {
                return item.subject === subject;

                // if only component
            } else if (!subject && !course && component) {
                return item.component === component;
            } else if (!subject && course && component) {
                return item.id.includes(course) && item.component === component;
            } else if (subject && !course && component) {
                return item.subject === subject && item.component === component;
            }

        });

    }

}

module.exports = {CourseModel};