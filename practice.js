// const num =10
// for (let i=1;1>=num;i++){
//     console.log(i)
// }

// const num = 20;

// for (let i = 2; i <= num; i=i+2) {
//   console.log(i);
// }

// const num =20;
// while(i=num<=20){
//     console.log(i)
//     i +=2
// }

// let i = 2;  // start from 2

// while (i <= 20) {
//   console.log(i);
//   i += 2;   // increase by 2 to stay on even numbers
// }
// const num =15;

// do(num/2==0){

// }while{
//     number i
// }
// const num = 5;
// for (i = 1; i<=num; i++){
//     row="";
//     for (j=1;j<=num;j++){
//         row+="*"
//     }
//     console.log(row)
// }

// const num = 5;
// for (let i=0;i<=num;i++){
//     row="";
//     for (let j=5; j>i;j--){
//         row+="*"
//     }
//     console .log(row)
// }
// Left-Angle Triangle
// const num =5;
// for (let i=1;i<=num;i++){
//   row=""
//     for (let j=1;j<=num-i;j++){
//         row+=" "}
// for(let k=1;k<=i;k++){
//     row+="*"
// }
//     console.log(row)
// }
// const num = 5;
// for (let i=1; i<=num; i++){
//     row=""
//     // row+=""
//     for (let j=1;j<=num-i;j++){
//         row+=" "
//     }
//     for (let k=1;k<=i;k++){
//         row+="*"
//     }
//     console.log(row)
// }




// const num = 5;

// for (let i =1; i<=num;i++){
//     row=""
//     for (let j=1;j<=num-i;j++){
//         row+=" "
//     }
//     for(let k=0;k<2*i-1;k++){
//         row+="*"
//     }
//     console.log(row)
// }


// Hoisting is JavaScript’s default behavior of moving declarations to the top of their scope (before code execution).

// It means variables and functions can be used before they are declared (with some rules).

// 1. Function Hoisting

// Functions declared with function declaration are hoisted completely.
// That means you can call them even before they are defined.
const nom=5

for (i=1;i<=nom;i++){
    row =""
    for (let j=1;j<=nom-i;j++){
        row+=" "
    }
    for(let k=1;k<=i;k++){
        row+="*"
    }
    console.log(row)
}

















