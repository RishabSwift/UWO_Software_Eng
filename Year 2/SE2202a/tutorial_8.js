/**
 * -------------------------------
 *  TASK 1
 *  ------------------------------
 *
 *  Used from old Tutorial 6 as per the assignment
 */

class Shape {

    constructor(newX, newY) {

        // Private members
        let _x;
        let _y;

        /**
         * Setter for X
         * @param x
         */
        this.setX = (x) => {
            // ensure x is more than 0.. if not, make it 0
            _x = x > 0 ? x : 0;
        };

        /**
         * Setter for Y
         * @param y
         */
        this.setY = (y) => {
            // ensure y is more than 0.. if not, make it 0
            _y = y > 0 ? y : 0;
        };
        /**
         * Getter for X
         * @returns x
         */
        this.getX = () => {
            return _x;
        };

        /**
         * Getter for Y
         * @returns y
         */
        this.getY = () => {
            return _y
        };

        // Manually setting X and Y using the setters
        this.setX(newX);
        this.setY(newY);
    }

    showPoint() {
        console.log(this.getX() + ", " + this.getY());
    }

    /**
     * Return string with a number of empty spaces that's equal to offset
     * @param offset
     * @returns {string} empty space
     */
    createHorizontalOffset(offset) {
        // If undefined, then use the X as the offset
        if (offset === 'undefined') {
            offset = this.getX();
        }
        return " ".repeat(offset);
    }

    /**
     * Print a number of empty lines equal to the y
     */
    draw() {
        for (let i = 0; i < this.getY(); i++) {
            console.log(); // empty line
        }
    }

    /**
     * Display the x and y...
     */
    displayInfo() {
        console.log(`x: ${this.getX()}, y: ${this.getY()}`);
    }
}


class Square extends Shape {
    //Should have constructor method
    constructor(x, y, newLength) {
        super(x, y);

        let _length;
        this.type = 'Square';

        this.setLength = (length) => {
            _length = length > 0 ? length : 1;
        };

        this.getLength = () => {
            return _length;
        };


        this.setLength(newLength);
    }

    /**
     * Wanted to create an OPEN BOX square b/c it's sexier
     * @override
     */
    draw() {
        super.draw();
        this.createHorizontalOffset();

        // Draw the first line of the square
        console.log("*  ".repeat(this.getX()));
        // Loop and draw the two sides and the inner
        for (let i = 2; i < this.getX(); i++) {
            console.log("* " + "   ".repeat(this.getX() - 2) + " *");
        }
        // Last line... same as first
        console.log("*  ".repeat(this.getX()));

    }

    /**
     * Display the info
     * @override
     */
    displayInfo() {
        console.log(`Type: ${this.type}`);
        // call the parent
        super.displayInfo();
    }
}


class Triangle extends Shape {
    // Constructor
    constructor(x, y, height) {
        super(x, y);

        let _height;

        this.setHeight = (height) => {
            // if height is less than 1 (aka 0), then it's 1
            _height = height > 0 ? height : 1;
        };

        this.getHeight = () => {
            return _height;
        };
        this.setHeight(height);

        this.type = 'Triangle';
    }

    /**
     * @override
     *
     * Draw a triangle
     */
    draw() {
        super.draw();

        let triangle = "";

        let offset = (n) => {
            let emptySpace = "";
            for (let i = 0; i < n; i++) {
                emptySpace += " ";
            }
            return emptySpace;
        };

        // draw out the triangle.. simple stuff as last lab and tutorial 1
        for (let i = 0; i < this.getX(); i++) {
            let line = "\n" + offset(this.getX() - i);

            for (let j = 0; j < ((i * 2) + 1); j++)
                line += "*";

            triangle += line;
        }

        console.log(triangle);
    }

    /**
     * Display the info
     * @override
     */
    displayInfo() {
        console.log(`Type: ${this.type}`);
        // call the parent
        super.displayInfo();
    }


}


// Testing stuff...
/*---FOR SQUARE --*/
// Initialize the square class for testing...
console.error('---- Task 1 ----');
let s = new Shape(5, 10);
s.displayInfo();
console.log();

let square = new Square(5, 5, 10);
square.displayInfo();
console.log();

let triangle = new Triangle(2, 2, 10);
triangle.displayInfo();

console.error('---- Task 2----');


/**
 * -------------------------------
 *  TASK 2
 *  ------------------------------
 *
 */

// given to us
let plainObjects = [
    {x: 5, y: 6},
    {type: 'Square', x: 7, y: 10, length: 10},
    {x: 8, y: 9, type: 'Triangle', height: 50}];

/**
 * Function to parse the object
 * @param array
 * @returns {[]}
 */
function parseObject(array) {
    let result = [];
    // loop through the array
    for (let element of array) {
        // depending on if it has a type...
        if (element.type) {
            // store it in the array
            result.push(element.type === 'Square' ? new Square(element.x, element.y, element.length) : new Triangle(element.x, element.y, element.height));
        } else {
            // if no type, then it's the base (parent) object
            result.push(new Shape(element.x, element.y));
        }
    }
    return result;
}

let object = parseObject(plainObjects);

for (let element of object) {
    element.displayInfo();
}

console.error('---- Task 3----');


/**
 * -------------------------------
 *  TASK 2
 *  ------------------------------
 *
 */

let processed = plainObjects.map(object => {
    // check the type, and return an object depending on the type

    if (object.type === 'Square') {
        return new Square(object.x, object.y, object.length);
    } else if (object.type === 'Triangle') {
        return new Triangle(object.x, object.y, object.height);
    } else {
        return new Shape(object.x, object.y);
    }
});

for (let element of object) {
    element.displayInfo();
};