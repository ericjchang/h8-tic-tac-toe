const boardTracker = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for(let i = 0; i <= 7; i++) {
        let winCondition = winConditions[i];
        let a = board[winCondition[0]]; // boards[[0, 1, 2][0]]
        let b = board[winCondition[1]]; // boards[[0, 1, 2][1]]
        let c = board[winCondition[2]]; // boards[[0, 1, 2][2]]
    
        if (a === '' || b === '' || c === '') {
          continue;
        }
        if (a === b && b === c) {
          return true
        }
      }
      return false;
    }
    
    module.exports = boardTracker;