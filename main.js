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

const a = 1
//a = 2 // attempts to reassign will throw an error

//////////////////////////////////////////////Arrow Functions///////////////////////////////////////

let fn = (x,y,z) => {
  console.log(x,y,z)
  return 1
}
fn(1,2,3)

//Single parameter and single line.
//Implicit return 
let add1 = x => x + 1 

//No implicit return when function body is in {}
let add2 = x => {x + 2}

//Lexical 'this' binding to whatever 'this' is during declaration
//NEW WAY
function Animal(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| properly refers to the Animal object
  }, 1000);
}

var animal = new Animal();

//THE PROBLEM
// function Animal() {
//   // The Animal() constructor defines `this` as itself.
//   this.age = 0;

//   setInterval(function growUp() {
//     // In nonstrict mode, the growUp() function defines `this` 
//     // as the global object, which is different from the `this`
//     // defined by the Animal() constructor.
//     this.age++;
//   }, 1000);
// }

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
  sayHi(){
    return "HI!!!! from " + super.string();
  }
  doMath(){
    return "2 + 2 equals " + (2 + 2)
  }
}

let shmooshette = new Shmooshette("Miss", "Shmoosh", "shmooshy");
shmooshette.toString() // returns "Miss Shmoosh is shmooshy"

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
//NOTE: you must use single quotes ('') to evaluate expressions within a string.

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

function displayPersonPerson(p){  
    let {name, age} = p;
    console.log(name, age);
}

var john = {name:"John", age: 20};  
displayPerson(person); //logs John 20

var nobody = {}

function displayPersonDefaults({name = "no name provided", age = 0}){  
    console.log(name, age);
}

displayPersonDefaults(nobody) // "no name provided 0"


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

//NOTE:
//No default parameters for ...rest params
/*
function fn(...rest=100){}  
fn() // throws a syntax error  

function fn(foo=1, bar=2, ...rest){}  
fn() // totally cool!  
*/


//Modules

import {x, y} from "./module.js";  

x()
y()

//////////////////////////////////////////////Collections: Set, Map, WeakMap, WeakSet/////////////////////

//////////////////////////////////////////////Promises///////////////////////////////////////

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
//Uncommenting this will crash the code -- update coming soon.

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