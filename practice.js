for (let i = 1; i <= 5; i++) {
  let a = "";

  for (let j = 1; j <= 5-i; j++) {
    a += " ";
  }
  for (let k=1;k<=i;k++){
    a+="*"
  }
  console.log(a);
}
let n = 5;

for (let i = 1; i <= n; i++) {
  let row = "";

  // spaces
  for (let s = 1; s <= n - i; s++) {
    row += " ";
  }

  // stars
  for (let j = 1; j <= 2 * i - 1; j++) {
    row += "*";
  }

  console.log(row);
}