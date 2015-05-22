'use strict';

//Arrow Functions

let fn = (x,y,z) => {
  console.log(x,y,z)
  return 1
}

fn(1,2,3)

//Classes

class Test {
  test() {
    return "test";
  }
}

var test = new Test;
var a = test.test(); // "test"
console.log(a)

//Generators

//Generator code won't work until you use browserify or regenerator
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


//Private Properties

const beastHealth = Symbol();  
const beastMagic = Symbol();

class Beast{  
  constructor(name, health, magic){
    this.name = name;
    this[health] = health;
    this[magic] = magic;
  }
}

var beast = new Beast("Reptar", 10); 

console.log(beast);  

for(var key in beast){  
  console.log(key + ":" + beast[key]); // name: Reptar
}

//Template Strings

//Destructuring

//Default Values

//Rest

//Let + Const



//Modules

import {x, y} from "./hi.js";  

x()
y()
//z()

//Collections: Set, Map, WeakMap, WeakSet

//Promises

//Tail Calls: Recursion

function factorial(n, acc = 1) {
    
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES6
factorial(100000)