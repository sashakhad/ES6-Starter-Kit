'use strict';

//////////////////////////////////////////////Let + Const///////////////////////////////////////

//let
//No hoisting -- but there is the "temporal dead zone"
//Lexical scoping in () and {}
//No redeclarations

console.log("let example: ")
for(let i = 0; i < 3; i++){
  console.log(i)
}

//console.log(i) //will throw an error since let lexically scopes

//const
//like let, but no reassignment allowed

const constant = 1
//constant = 2 // attempts to reassign will throw an error

//////////////////////////////////////////////Arrow Functions///////////////////////////////////////

let fn = (x,y,z) => {
  console.log(x,y,z)
  return 1
}
fn(1,2,3)

//Single parameter and single line. But really, just put () around your params for legibility.
//Implicit return 
let add1 = x => x + 1 

//No implicit return when function body is in {}
let add2 = x => {return x + 2}

//Lexical 'this' binding to whatever 'this' is during declaration
//NEW WAY
function Animal(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| properly refers to the Animal object
  }, 1000);
}

var animal = new Animal();

//OLD WAY
// function Animal() {
//   var self = this; // Some choose `that` instead of `self`. 
//                    // Choose one and be consistent.
//   self.age = 0;

//   setInterval(function growUp() {
//     // The callback refers to the `self` variable of which
//     // the value is the expected object.
//     self.age++;
//   }, 1000);
// }


//////////////////////////////////////////////Classes///////////////////////////////////////

class Shmoosh {
  constructor(first, last){
    this.first = first;
    this.last = last;
  }
  toString() {
      return this.first + " " + this.last;
  }
}

class Shmooshette extends Shmoosh {
  constructor(first, last, feeling){
    super(first, last);
    this.feeling = feeling;
  }
  toString(){
    return super.toString() + " is " + this.feeling;
  }
  doMath(){
    return "2 + 2 equals " + (2 + 2)
  }
  sayHi(){
    return `Hi!!!! from ${super.toString()}`;
  }
}

let shmooshette = new Shmooshette("Miss", "Shmoosh", "shmooshy");
shmooshette.toString() // returns "Miss Shmoosh is shmooshy"
shmooshette.doMath()
console.log(shmooshette.sayHi())

//////////////////////////////////////////////Template Strings///////////////////////////////////////

//OLD WAY
var a = 5;
var b = 10;
console.log("Fifteen is " + (a + b) + " and not " + (2 * a + b) + ".");
// "Fifteen is 15 and
// not 20."

//NEW WAY
var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and not ${2 * a + b}.`);

// "Fifteen is 15 and
// not 20." 
//NOTE: you must use backticks (``) to evaluate expressions within a string.

//////////////////////////////////////////////Private Properties///////////////////////////////////////

const beastHealth = Symbol();  
const beastMagic = Symbol();

class Beast{  
  constructor(name, health, magic){
    this.name = name;
    this[beastHealth] = health;
    this[beastMagic] = magic;
  }
}

var beast = new Beast("Reptar", 10, 15); 

console.log("Obj: ",  beast);  
console.log("Stringified obj: " + JSON.stringify(beast));  

for(var key in beast){  
  console.log("For-in loop over obj: " + key + ":" + beast[key]); // name: Reptar
}

//////////////////////////////////////////////Destructuring///////////////////////////////////////


//Objects
//Be careful of the irrefutable patterns
//Also note that ? is not supported by babel, thus you cannot use it in this repo

function displayPerson(p){  
    let {name, age} = p;
    console.log(name, age);
}

var john = {name:"John", age: 20};  
displayPerson(john); //logs John 20

var nobody = {}

function displayPersonDefaults({name = "no name provided", age = 0}){  
    console.log(name, age);
}

displayPersonDefaults(nobody) // "no name provided 0"

//Arrays

var numbers = [1,2,3,4,5];  
var [first, second,,,,fifth] = numbers;
console.log(first, second, fifth) // 1,2,5

//Refutable patterns
var [x] = [1,2] // x = 1  
//var [one, two, three] = [1,2] //throws an error  
//var ?[one, two, three] = [1,2] //no error

//Swapping
var a = 1;  
var b = 2;

//The Old Way
var temp = a;  
a = b;  
b = temp;

//The New Way
[b, a] = [a, b];



//////////////////////////////////////////////Spread Operators//////////////////////////////////

let nums = [1,2,3]  
console.log(nums) // -->logs [1,2,3]  
console.log(...nums) // --> logs 1,2,3  

let nums1 = [1,2,3]  
let nums2 = [4,5,6]  
let combinedNums   = [...nums1, ...nums2]

console.log(combinedNums) // --> [1,2,3,4,5,6]

//////////////////////////////////////////////Rest Parameters//////////////////////////////////

function foo(...bar){  
    console.log(bar.join(" ")); 
}
foo("here", "are", "the", "arguments") // --> "here are the arguments"

//THE OLD WAY
// function foo(bar){  
//     var args = Array.prototype.slice.call(arguments);
// }

function logNums(first, second, third, ...others){
  console.log(first, second, third, others)
  console.log(others)
}
logNums(1,2,3,4,5,6,7,8)


//////////////////////////////////////////////Default Parameters///////////////////////////////////////

function hi(name = "world"){  
    console.log("Hello " + name + "!");
}

hi("Gaia")   // Hi Gaia!  
hi("")       // Hi !  
hi()         // Hello World!  
hi(undefined) // Hello World!  

//Function expressions as default params do not evaluate in line!

var count = 0;  
function increment(){  
    return count++;
}

function countDat(totalCount = increment()){  
    console.log(totalCount)
}

countDat()  // 0  
countDat()  // 0


//NOTE:
//No default parameters for ...rest params
/*
function fn(...rest=100){}  
fn() // throws a syntax error  

function fn(foo=1, bar=2, ...rest){}  
fn() // totally cool!  
*/


////////////////////////////////////////////////Modules//////////////////////////////////////////////

import {x, y} from "./module.js";  

x(); // logs x
y(); // logs y

//Aliasing  
import {B as C} from "./module.js";
var c = new C(); // this is an instance of the A class!  
c.show();

import * as lib from "./module";

lib.z(); // logs z

//Re-export!
export * from "./module"

//Programmatic Loading API -- not yet supported in this babel/ this repo

// System.import("./module.js")  
// .then(your_module => {
//     //executes the function only after your module has been loaded
//     console.log("module has been loaded!")
// })
// .catch(error =>  {
//     //if there's an error, do whatever you need
// })

// Promise.all(  
//     ["module1", "module2", "module3"]
//     .map(module => System.import(module))
// )
// .then(function([module1, module2, module3]){
//     //your code
// })

//////////////////////////////////////////////Collections: Set, Map, WeakMap, WeakSet/////////////////////

//collection of unique values

let set = new Set();
set.add(1)
//set.push(1) --> throws error

let map = new Map();
map.set("name", "Gaia")
map.get("name") //--> Gaia
//Remember -- there is no typecasting in maps
map.set(1, 1)
map.get("1") //doesn't get anything because "1" has not been set on the map

//For instance, you can use user object that you grab from an API and store that object as your key
//This would mean that you wouldn't have to store an associated user ID your object

var baby = {name: "Ben", age: 2}
var babyHobbies = new Map()
babyHobbies.set(baby, "crying")
//REMEMBER: complex objects refer to a specific space in memory. Identical objects won't grab the same value.
var clone = {name: "Ben", age: 2}
babyHobbies.get(clone) // won't work!

//WeakMap and WeakSet are exaclty like Map and Set but their keys will be discarded if they are not referred to anywhere else in your code

//////////////////////////////////////////////Promises///////////////////////////////////////

//NOTE: Promises are not yet supported by the compiler

// var promise = Promise(function(resolve, reject){  
//     //some async code here
//     //like AJAX, loading an image, writing to the DOM, etc

//     if(true/*nothing went wrong*/){
//         resolve("Stuff worked!");
//     } else {
//         reject(Error("It didn't work!"));
//     }
// });

// promise.then(function(result){  
//     console.log(result) // logs "Stuff worked!"
//     }, function(err){
//         console.log(err) // Error: "It didn't work!"
//     }
// )        

//jQuery Example
// var promise1 = $.get(something)  
// var promise2 = $.get(something_else)

// Promise.all([promise1, promise2)  
// .then(function(results){
//     //do stuff with each promise
// },
// function(err){  
//     //do something with your error
// }

//Static Promise methods
// Promise.all(your_items) // wait until all of these promises return  
// Promise.race(your_items) // wait until one of these promises return  
// Promise.reject(err) // gives you a rejected promise  
// Promise.resolve(value) // gives you resolved promise  


//////////////////////////////////////////////Tail Calls: Recursion///////////////////////////////////////

function factorial(n, acc = 1) {
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES6
factorial(100000)

///////////////////////////////////////////////Generators///////////////////////////////////////

//Generator code won't work until regenerator is fully implemented. 
//Uncommenting this will crash the code -- update coming.

//Run-to-complete paradigm

// function *abc(){  
//     yield "a";
//     yield "b";
//     return "c";
// }

// var generator = abc() NOTE: this does not call the function! It simply makes the generator object available for you to use in the the generator variable. abc() simply returns a "generator iterator" 

// generator.next() // returns {value: "a", done: false}  
// generator.next() // returns {value: "b", done: false}  
// generator.next() // returns {value: "c", done: true}  
// generator.next() // returns {value: undefined, done: true} -- it has nothing else to generate!   

//Two-Way data passing

// From Kyle Simpson
// function *foo(x) {
//     var y = 2 * (yield (x + 1));
//     var z = yield (y / 3);
//     return (x + y + z);
// }

// var it = foo( 5 );

// // note: not sending anything into `next()` here
// console.log( it.next() );       // { value:6, done:false }
// console.log( it.next( 12 ) );   // { value:8, done:false }
// console.log( it.next( 13 ) );   // { value:42, done:true }

// The yield (x + 1) is what sends out value 6. The second next(12) call sends 12 to that waiting yield (x + 1) expression, so y is set to 12 * 2, value 24. Then the subsequent yield (y / 3) (yield (24 / 3)) is what sends out the value 8. The third next(13) call sends 13 to that waiting yield (y / 3) expression, making z set to 13.

// Finally, return (x + y + z) is return (5 + 24 + 13), or 42 being returned out as the last value.