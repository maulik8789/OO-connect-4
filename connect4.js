/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
let count = 0;
let win = 0;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // (DONE)TODO: set "board" to empty HEIGHT x WIDTH matrix array
  board= [
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
  ];
}
// document.addEventListener('click', function(e){
//   e.preventDefault();
//   console.log(t);
// })

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  //(DONE) TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  var htmlBoard = document.querySelector("#board");
  
  // TODO: add comment for this code
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top1");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      var cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // (DONE)TODO: write the real version of this, rather than always returning 0
  for (let i = 5; i>= 0; i--)
  {
    if (board[i][x] == null)
    return i;
  }
  
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // (DONE)TODO: make a div and insert into correct table cell
  let dotDiv = document.createElement('div');
  dotDiv.classList.add('piece');
  if(currPlayer == 1)
  {
    dotDiv.classList.add('p1');
  }
  else
  {
    dotDiv.classList.add('p2');
  }
  currCell = document.getElementById (y+'-'+x);
  console.log(currCell.id);
  currCell.append(dotDiv);
  console.log(currCell.offsetHeight)
  
}

/** endGame: announce game end */

function endGame(msg) {
  // (DONE)TODO: pop up alert message
  win = 1;
  alert(msg);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}


/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  count++;
  let disp = document.querySelector('#playerNum');

  if (win == 1) return;
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
   return;
  }

  // place piece in board and add to HTML table
  // (DONE)TODO: add line to update in-memory board
  if (board[y][x] == null )
  {
    placeInTable(y, x);
    board[y][x] = currPlayer;  
  }
 

  // check for win
  if (checkForWin() == true) {
    console.log(`Player ${currPlayer} won!`)
    setTimeout(function(){
      endGame(`Player ${currPlayer} won!`);
    }, 100); 
    win = 1;
    disp.textContent = 'Player# ' + currPlayer + 'won!';
    document.getElementById("column-top").removeEventListener("click", handleClick);
  }

  // check for tie
  // (DONE)TODO: check if all cells in board are filled; if so call, call endGame
  if (count == 42)
  {
    setTimeout(function(){
      endGame('it is a tie!');
    }, 100);
  }
  // switch players
    // (DONE)TODO: switch currPlayer 1 <-> 2
     
    if(currPlayer == 1 && win == 0) 
    {
      currPlayer = 2;
      let topC = document.querySelector('#column-top1');
      topC.setAttribute("id", "column-top2");
      disp.classList.add('display2');
      disp.textContent = 'Player #2 Turn';
      disp.classList.remove('display1');
    }
    else if(currPlayer == 2 && win == 0)   
    {
      currPlayer = 1;
      let topC = document.querySelector('#column-top2');
      topC.setAttribute("id", "column-top1"); 
      disp.classList.add('display1');
      disp.textContent = 'Player #1 Turn';
      disp.classList.remove('display2');
    }

}

let reset = document.querySelector('#reset');
reset.addEventListener('click', function(e){
  e.preventDefault();
  location.reload();
})
reset;


makeBoard();
makeHtmlBoard();