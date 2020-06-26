let p1 = ['3', '4', '5', '7'];
let p2 = ['3', '4', '5', '7'];

const winningConditions = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7'],
];

console.log(JSON.stringify(p1) == JSON.stringify(p2));

for (let i = 0; i < p1.length; i++) {
  let temp = [];
  for (let j = 0; j < p1.length; j++) {
    if (j !== i) temp.push(p1[j]);
  }
  winningConditions.forEach((el) => {
    if (JSON.stringify(el) == JSON.stringify(temp)) console.log('menang');
  });
}
