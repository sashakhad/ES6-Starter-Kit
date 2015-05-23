console.log("hi")

export function x(){
  console.log("x")
  return 1
}  
export function y(){
  console.log("y")
  return 2
}  
export function z(){
  console.log("z")
  return 3
}  

class A {  
  constructor(item){
    this.A = item;
  }
  show(){
    console.log("A");
    return "This is function A";
  }
}
export {A as B};