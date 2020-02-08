/*
 * All tasks are saved in one file
 */


/*
 * TASK ONE - Convert from binary to array
 */

// Get binary form from decimal using LOOP
let getBinaryUsingLoop = function (number) {
    let binary = "";
    let half = parseInt(number / 2) // store it in variable since number is manipulated
    // Loop through the number until half of the number since we will be dividing it each time
    for (let i = 0; i <= half; i++) {

        // store 1 or 0 in the binary variable depending on if it has a remainder or not
        // the answer will need to be reversed since it's stored to the right
        binary += number % 2 === 1 ? "1" : "0";

        // divide by 2 to do this process again and parse it as an int
        number = parseInt(number / 2);
    }
    // Since the binary is moved to the left, we just reverse the string and we have the answer
    // Also parseInt to get rid of padding 0's
    return parseInt(binary.split("").reverse().join(""));
}

// console.log(getBinaryUsingLoop(5));

// Get binary form from decimal using RECURSION
let getBinaryUsingRecursion = function (number) {

    var binary = "";

    let getBinary = function (number, binary) {

        if (number <= 0) {
            return binary;
        }

        binary += number % 2 === 1 ? "1" : "0";
        return getBinary(parseInt(number / 2), binary);
    }

    binary = getBinary(number, binary);
    // Since the binary is moved to the left, we just reverse the string and we have the answer
    return binary.split("").reverse().join("");
}
// console.log(getBinaryUsingRecursion(20));


// Loop to test out the binary conversion using loop and recursion
// for (let i = 1; i <= 20; i++) {
//     console.log(`Binary of ${i} using loop:      ${getBinaryUsingLoop(i)}`);
//     console.log(`Binary of ${i} using recursion: ${getBinaryUsingRecursion(i)}\n`);
// }




/**
 * TASK 2 - Simple Parser
 */

// Declare a function with string as a parameter that parses it into an object and returns it
let parseJSON = function (string) {

    // If not formatted by curly brackets...
    if (string.charAt(0) != "{" || string.charAt(string.length - 1) != "}") {
        console.error("The string is not a valid JSON string!");
    }

    // Get rid of curly brackets using slice... 
    string = string.slice(1, string.length - 1);

    // Split into array by comma
    string = string.split(",");

    let parsedObject = {};

	// Loop through the array of string that's split by comma
    for(let s of string) {
        // Split by ":" and store into the object
        let s_arr = s.split(":");
        parsedObject[s_arr[0]] = s_arr[1];       
    }
   
    return parsedObject;
    
}

// Sample object converted to string to make our lives easier for testing...
let s = {
    number: 23,
    just: "wanna say that",
    you: "are",
    "a very": "cool",
    guy: "!",
}

let parsedObject = parseJSON(JSON.stringify(s));

// Other test options...
// let parsedObject = parseJSON(JSON.stringify({num: 23, date: 22}));
// let parsedObject = parseJSON("{num: 3, base: 3}"); 

console.log(parsedObject);


/**
 * TASK 3 - SIMPLE PARSER
 */
// Function with parameters threshold and lists (array)
let findList = function(threshold, ...lists) {

	// loop through the list (however many there are passed)
	for (let list of lists) {
	
		// loop through each individual list 
		for (let i = 0; i <= list.length; i++) {
		
			// if it reaches the threshold, break
			if (list[i] > threshold) {
				break;
				
				// if it gets to the last element without breaking, return this list
			} else if ( i === list.length) {
				return list;
			}
		}
	
	}

};

// array of list for testing
let l1 = [1, 25, 35, 39];
let l2 = [55, 58, 59, 60];
let l3 = [103, 104, 106, 109];

// binding with findList function to test...
let foundList = findList(40, l1, l2, l3);

// print it out... as an array
console.log(foundList);

// print as array without commas or brackets
console.log(...foundList);