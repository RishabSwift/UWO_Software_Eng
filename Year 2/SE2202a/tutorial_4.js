/**
 * Task 1 - Applying filter, map and reduce function on arrays of numbers
 */

    // "...send it as an argument the filter function": 
    // I was confused about this part, so I assumed that it meant to filter method of array
    // As such, I created a function for the filter to filter out the numbers in the given range.

    // 1.
    // array of distances in meters.
let distances = [134, 6, 7, 83, 9, 1, 0, 9, 6, 17, 54, 16];

// 2. a)
function withinRange(distance) {
    // Within range 5-10 (inclusive)
    return distance >= 5 && distance <= 10;
}

// Output the filtered array
// Filter method takes in an argument [array] and then runs it for each element of the array
let filtered = distances.filter(withinRange);
console.log(filtered);

// another way... inline function
//  distances.filter(function(distance) {
//      return distance >= 5 && distance <= 10;
//  });

// 2. b)
// Filter using short hand function notation... (again, as per my understanding of the question). 
console.log(distances.filter(distance => {
    // Within range 5-10 (inclusive)
    return distance >= 5 && distance <= 10;
}));

// 3. a)
// function to convert to inches
function convertToInch(distance) {
    return distance * 39.37;
}

// question was unclear about which distance to use.. the filtered distances between 5 and 10 or the original distance...
// I used the original one... but the filtered one would be simple if we stored it in a new variable and used the map function on it.
console.log(distances.map(convertToInch));

// 3. b)
// using short hand arrow notation
let distancesInches = filtered.map(distance => {
    return distance * 39.37
});
console.log(distancesInches);

// 4. a)
// by minimum i'm assuming it's the lowest distance in inches...
function findMinimumValue(a, b) {
    // ternary operator to determine the lowest value
    return a < b ? a : b;
}

// Using the reduce method...
console.log(distancesInches.reduce(findMinimumValue));


// Same thing, using short hand arrow notation all in one
let minimumArrowNotation = distances.filter(num => ((num >= 5) && (num <= 20))).map(num => (num * 39.37)).reduce((a, b) => (a, b) ? a : b);

// Output the minimum value
console.log(minimumArrowNotation)


/**
 * TASK 2
 * All done in one go..
 */

let points = [{x: 5, y: 6}, {x: 3, y: 7}, {x: 8, y: 0}, {x: 9, y: 10}, {x: 15, y: 4}, {x: 0, y: 15}];
console.log(points);

// filter => ensure that x and y don't equal 0
let maxDistance = points.filter(point => (point.x != 0) && (point.y, 2))
// mapped with pytharogean theorem to determine the distance... in short hand notation
    .map(point => Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)))
    // reduced for finding max distance
    .reduce(calculateMaxDistance);


// Calculate the max distance
function calculateMaxDistance(d1, d2) {
	// return whichever is greater.
    return d1 > d2 ? d1 : d2;
}

console.log("The max distance is: " + maxDistance);