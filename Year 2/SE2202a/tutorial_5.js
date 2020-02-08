/// TASK 1 AND 2... 

let prototype =
    {
        real: 0,
        img: 0,
        print: function () {
            console.log("Prototype is Printing this:" + this.real + "+" + this.img + "i")
        }
    };

//This is the function that is returning with template that contains both img. nad the real numbers
function prototypeFunction(r, i) {
    let complex = Object.create(prototype);
    complex.real = r;
    complex.img = i;
    return complex;
}

let compObject = prototypeFunction(5, 9);
compObject.print();

/**
 * Construction function
 * @param r
 * @param i
 * @constructor
 */
function ConstructorFunction(r, i) {
    this.real = r;
    this.img = i;

    this.print = function () {
        console.log("Printing from constructionFunction this.print: " + this.real + "+" + this.img + "i");
    };
    this.add = function (object2) {
        return new ConstructorFunction((this.real + object2.real), (this.img + object2.img));
    };
    this.subtraction = function (object2) {
        return new ConstructorFunction((this.real - object2.real), (this.img - object2.img));
    };
    this.multiplication = function (object2) {
        return new ConstructorFunction((this.real * object2.real - this.img * object2.img), (this.real * object2.img + this.img * object2.real));
    };

    // No need for mathematically correct as said by TA
    this.division = function (object2) {
        return new ConstructorFunction((this.real / object2.real - this.img / object2.img), (this.real / object2.img + this.img / object2.real));
    };

}

let newObject = new ConstructorFunction(2, 9);
let object2 = new ConstructorFunction(3, 7);
newObject.print();
object2.print();
newObject.add(object2);
let printyThingAdd = newObject.add(object2);
printyThingAdd.print();
let printyThingSub = newObject.subtraction(object2);
printyThingSub.print();
let printyThingMult = newObject.multiplication(object2);
printyThingMult.print();
let printDivide = newObject.division(object2);
printDivide.print();
