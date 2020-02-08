/**
 * ---------------------------
 *          TASK 1
 * ---------------------------
 */

//IIFE block 1
(
    //IIFE that takes an array of numbers as a parameter
    function (...grades) {

        //inner function that returns teh avg
        let average = function () {
            //sum of elements / elements count
            return grades.reduce((previous, current) => {
                return previous + current;
            }, 0) / grades.length;
        };

        //inner function that returns max val
        let maximum = function () {
            return grades.reduce((previous, current) => {
                return previous >= current ? previous : current;
            }, 0);
        };

        //output inner functions to console
        console.log(average());
        console.log(maximum());
    }
)(23, 44, 24, 22, 132, 442); // invoke IIFE with number parameters which is taken as array


/**
 * ---------------------------
 *          TASK 2
 * ---------------------------
 */
let gradeObject = (

    //IIFE - creates an object with two methods
    function () {

        // return the object
        return {
            // average is an object method that returns the avg
            average: function (...grades) {
                //sum of elements / elements count
                return grades.reduce((prev, current) => {
                    return prev + current;
                }, 0) / grades.length;
            }
            ,
            // max is an object method that returns the max value
            maximum: function (...grades) {
                return grades.reduce((previous, current) => {
                    return previous >= current ? previous : current;
                }, 0);
            }
        };

    }
)(); // call the IIFE to invoke the empty object and establish the skeleton of an object

// call the two methods
console.log(gradeObject.average(50, 20, 30, 40));
console.log(gradeObject.maximum(10, 40));

/**
 * ---------------------------
 *          TASK 3
 * ---------------------------
 */

// using IIFE block, a new object is created and assigned to this variable
let gradeObjWithMutators = (

    function (...grades) {

        //create and return an object
        return {

            // initialize the "grades_" using the parameters
            // it is an array of number
            grades_: grades,
            // getter
            getGradeList: function () {
                return this.grades_;
            },
            // setter
            setGradeList: function (...newGrades) {
                this.grades_ = newGrades;
            },
            // average is an object method that returns the avg
            average: function () {

                //sum of elements / elements count
                return this.grades_.reduce((previous, current) => {
                    return previous + current
                }, 0) / this.grades_.length;
            },
            // max is a method that returns the max value
            maximum: function () {
                return this.grades_.reduce((previous, current) => {
                    return previous >= current ? previous : current
                }, 0);
            }

        };

    }
)(50, 30, 60); // invoke the IIFE


// Call the getter method and print the return using console.log
console.error(gradeObjWithMutators.getGradeList());
console.log("Avg: " + gradeObjWithMutators.average());
console.log("Max: " + gradeObjWithMutators.maximum());

// Call the setter method and send it a new array of numbers
gradeObjWithMutators.setGradeList(1, 2, 3, 4);

// Call the getter method again to see the effect of calling the setter
console.log();
console.error(gradeObjWithMutators.getGradeList());
console.log("Avg: " + gradeObjWithMutators.average());
console.log("Max: " + gradeObjWithMutators.maximum());