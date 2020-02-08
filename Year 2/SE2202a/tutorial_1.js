/*
 * Tutorial 1
 */

 const createOffset = function (offset) {
    let string = "";
    for (i = 0; i < offset; i++) {
        string += " "
    }

    return string;
};

// Task 1 - Draw a rectangle
function makeSquare(offset, length) {

    let offsetSpace = createOffset(offset);

    let square = "";

    for (i = 0; i < length; i++) {
        square += "\n" + offsetSpace;
        for (j = 0; j < length; j++) {
            square += " * ";
        }
    }

    return square;
}

console.log(makeSquare(5, 4));


function createTriangle(offset, height) {

    let offsetSpace = createOffset(offset);

    let triangle = "";

    for (i = 0; i < height; i++) {

        triangle += "\n" + offsetSpace;

        triangle += "  ".repeat(height - i);

        for (j = 0; j <= i; j++) {
            triangle += " * ";
        }

    }

    return triangle;
}

console.log(createTriangle(5, 5));