const Storage = require('node-storage');
const store = new Storage('./data');


class Schedule {

    courses = [];

    constructor(name) {
        this.name = name;
        this.courses = [];
    }

    /**
     * Get the courses on a schedule
     * @returns {*}
     */
    get courses() {
        return arrayUnique(store.get(`schedules.saved.${name}`));
    }

    /**
     * TASK 4 (part)
     * Determine if name already exists in database
     * @param name
     * @returns {boolean}
     */
    static nameAlreadyExists(name) {
        return store.get(`schedules.saved.${name}`) !== undefined;
    }

    /**
     * Save schedule to database
     */
    save() {
        store.put(`schedules.saved.${this.name}`, (this.courses));
    }


    /**
     * Get all courses
     * @returns {*}
     */
    static getAll() {
        return store.get('schedules');
    }


    /**
     * TASK 6
     * Get a schedule given a name
     * @param name
     * @returns {Schedule}
     */
    static get(name) {
        let schedule = new Schedule(name);
        // set the courses (to be safe in case it's not already there)
        // return as Schedule object
        schedule.courses = arrayUnique(store.get(`schedules.saved.${name}`));
        return schedule;
    }

    /**
     * TASK 7
     * Delete a given schedule
     * @param name
     */
    static delete(name) {
        store.remove(`schedules.saved.${name}`);
    }

    /**
     * TASK 9
     * Delete all schedules
     */
    static deleteAll() {
        return store.remove('schedules.saved');
    }

}


//
/**
 * determine if hte array is unique. if not, make delete duplicate entires
 * @param array
 * @returns {*}
 */
function arrayUnique(array) {
    if (array === undefined) {
        return array;
    }

    return array;
    //
    // return array.reduce((unique, o) => {
    //     if (!unique.some(obj => obj.label === o.label && obj.value === o.value)) {
    //         unique.push(o);
    //     }
    //     return unique;
    // }, []);
}

module.exports = {Schedule};
