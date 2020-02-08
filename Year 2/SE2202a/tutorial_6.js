/**
 * -------------------------------
 *  TASK 1
 *  ------------------------------
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
}

console.error('---- Task 1 ----');
// Initialize the shape class for testing...
let s = new Shape(5, 10);
s.showPoint();

// Using setters to change the x and y value rather than passing it through constructor like earlier... (we can't even do that!)
s.setX(-10);
s.setY(4);
console.log(`New x: ${s.getX()}, new Y: ${s.getY()}`);

// Testing for private encapsulated members of the class... should be undefined if it works!
console.log(s._x); // ... and it is undefined

/**
 * -------------------------------
 *  TASK 2 & 3
 *  ------------------------------
 *  What is the rectangle and square terms in the task?
 *  It's unclear, so I'm going with my assumption that it takes in length in the square class...
 *  ------------------------------
 */

class Square extends Shape {
    //Should have constructor method
    constructor(x, y, newLength) {
        super(x, y);

        let _length;

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

        for (let i = 0; i < this.getX(); i++) {
            let line = "\n" + offset(this.getX() - i);

            for (let j = 0; j < ((i * 2) + 1); j++)
                line += "*";

            triangle += line;
        }

        console.log(triangle);
    }


}

// Testing stuff...
/*---FOR SQUARE --*/
// Initialize the square class for testing...
console.error('---- Task 2 ----');
let square = new Square(5, 5, 10);

// Using setters to change the x and y value rather than passing it through constructor like earlier... (we can't even do that!)
square.setX(-10);
square.setY(4);
square.setLength(10);
square.showPoint();
console.log(`New x: ${square.getX()}, new Y: ${square.getY()}, new Length: ${square.getLength()}`);

// Testing for private encapsulated members of the class... should be undefined if it works!
console.log(square._length); // ... and it is undefined!

/*---FOR TRIANGLE --*/

console.log('--------------');
// Initialize the triangle class for testing...
let triangle = new Triangle(2, 2, 10);

// Using setters to change the x and y value rather than passing it through constructor like earlier... (we can't even do that!)
triangle.setX(-2);
triangle.setY(3);
triangle.setHeight(5);
triangle.showPoint();
console.log(`New x: ${triangle.getX()}, new Y: ${triangle.getY()}, new Height: ${triangle.getHeight()}`);

// Testing for private encapsulated members of the class... should be undefined if it works!
console.log(triangle._length); // ... and it is undefined!


console.error('---- Task 3 ----');
square.setX(5);
square.draw();
triangle.setX(5);
triangle.draw();