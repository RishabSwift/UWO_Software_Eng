/*
 * Tutorial 2 Task 1
 */

let printHello = function (name) {
    let message = "Hello ";
    console.log(message + name);
};

let printGreeting = printHello;
printGreeting("John");



/*
 * Tutorial 2 Task 2
 */

let printVertical = function (string) {
    for (let i = 0; i < string.length; i++) {
        console.log(string.charAt(i));
    }
};

let printWithSpace = function (string) {
    let stringWithSpace = "";
    for (let i = 0; i < string.length; i++) {
        stringWithSpace += string.charAt(i) + " ";
    }
    console.log(stringWithSpace);
};

let printInReverse = function (string) {
    let stringInReverse = "";
    for (let i = string.length; i >= 0; i--) {
        stringInReverse += string.charAt(i);
    }
    console.log(stringInReverse)
};

let genericPrinter = function (string, functionName) {
    functionName(string);
};

printInReverse("Hello There");
printVertical("How are you doing?");
printWithSpace("earth is flat");
genericPrinter("earth is 2019 years old", printInReverse);

/*
 * Tutorial 2 Task 3
 */

let calenderName = function (string) {

    let monthName = function (number) {

        const monthNames = [null, "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // the first index is null so that 12 = december instead of it being 11
        return monthNames[number] + "_m";
    };
    let dayName = function (number) {
        const dayNames = [null, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        return dayNames[number] + "_d";
    };

    return string === "d" ? dayName : monthName;

};

let findNameOfTheMonth = calenderName("m");
let findNameOfTheDay = calenderName("d");

console.log(findNameOfTheDay(1));
console.log(findNameOfTheMonth(2));


/*
 * Tutorial 2 Task 4
 */

// I'm confused which should be base and which should be power, so I have set it as this.
// However, I can change it if it's necessary
let powerOf = function (number) {
    let raiseToPower = function (power) {
        let sum = 1;
        for (let i = 0; i < power; i++) {
            sum *= number;
        }
        return sum;
    };

    return raiseToPower;
};

console.log(powerOf(3)(3));