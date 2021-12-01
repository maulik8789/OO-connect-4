/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */




//makeBoard();
//makeHtmlBoard();


///oo_version-----------------------------------------
///---------------------------------------------------
///---------------------------------------------------

class Game{
  constructor(WIDTH, HEIGHT){
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;
    this.makeBoard();
    this.makeHtmlBoard();
    this.win = 0;
    this.currPlayer = 1; // active player: 1 or 2
    
    this.findSpotForCol;
    this.placeInTable;
    

  }
    //Constructor ends.. all default values are added.
  
    //Now, functions as methods.--------------

    /** makeBoard: create in-JS board structure:
    *   board = array of rows, each row is array of cells  (board[y][x])
    */

  makeBoard() {
    
    this.board = []; // array of rows, each row is array of cells  (board[y][x])
    
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }


  /** makeHtmlBoard: make HTML table and row of column tops. */

  makeHtmlBoard() {
    let board = document.getElementById('board');

    //var parent = this;
    // make column tops (clickable area for adding a piece to that column)
    var top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    this.handleGamePlay = this.handleClick.bind(this);
    top.addEventListener('click', this.handleClick.bind(this));

    for (let x = 0; x < this.WIDTH; x++) {
      let headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      let row = document.createElement('tr');

      for (let x = 0; x < this.WIDTH; x++) {
        let cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${this.currPlayer}`);
    piece.style.top = -50 * (y + 2);
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */

  endGame(msg) {
    
    alert(msg);
  }

  /** handleClick: handle click of column top to play piece */
  
  handleClick(evt) {
    let x ,y;
      // get x from ID of clicked cell
      x = +evt.target.id;

      // get next spot in column (if none, ignore click)
      y = this.findSpotForCol(x); 
      if (y === null) {
        return;
      }
      
       

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
    
    // check for win
    if (this.checkForWin()) {
      this.win = 1;
      document.querySelector('#curPlayer').textContent = 'Player#'+ this.currPlayer + ' is WINNER!';
      document.querySelector("#column-top").remove(); //EventListener('click', this.handleGamePlay.bind(this));
      this.endGame(`Player ${this.currPlayer} won!`);
    }
    
    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      document.querySelector("#column-top").remove(); //("click", this.handleGamePlay);
      this.endGame('Tie!');
    }

    // switch players
    if(this.currPlayer === 1 && this.win == 0){
      this.currPlayer = 2;
      document.querySelector('#curPlayer').textContent = 'Player#'+this.currPlayer + ' Turn';
    }
    else if(this.currPlayer === 2 && this.win == 0){
      this.currPlayer = 1;
      document.querySelector('#curPlayer').textContent = 'Player#'+this.currPlayer + ' Turn';
      
    } 
    

/////if Player is COMPUTER
    if (player == 'Computer' && this.currPlayer == 2 && this.win == 0){
      for (let i = 0; this.board[y][x] != undefined || this.board[y][x] != null ; i++){
        x = Math.floor((Math.random() * 6) + 0);
        y = this.findSpotForCol(x);
       }
       // place piece in board and add to HTML table
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x);
      
      // check for win
      if (this.checkForWin()) {
        return this.endGame(`Player ${this.currPlayer} won!`);
      }
      
      // check for tie
      if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame('Tie!');
      }

      // switch players
      if(this.currPlayer === 1 && this.win == 0){
        this.currPlayer = 2;
        document.querySelector('#curPlayer').textContent = 'Player#'+this.currPlayer + ' Turn';
      }
      else if(this.currPlayer === 2 && this.win == 0){
        this.currPlayer = 1;
        document.querySelector('#curPlayer').textContent = 'Player#'+this.currPlayer + ' Turn';
        
      }
    }
    
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
    let HEIGHT = this.HEIGHT;
    let WIDTH = this.WIDTH;
    let board = this.board;
    let currPlayer = this.currPlayer;
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < HEIGHT &&
          x >= 0 &&
          x < WIDTH &&
          board[y][x] === currPlayer
      );
    }

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}



/////Start new Game
let start = document.querySelector('#start');

///// Choose Opponent
var player = '';
function chooseOppo(select) {
  if(select.options[select.selectedIndex].text == 'Human'){
    //alert('Player#2 is: ' + select.options[select.selectedIndex].text);
    start.addEventListener('click', function(e){
      e.preventDefault();
      player = '';
      let newGame = document.querySelector('#board');
      newGame.innerHTML = '';
      new Game(6, 7);
    })    
  }
  else if(select.options[select.selectedIndex].text == 'Computer'){
    //alert('Player#2 is: ' + select.options[select.selectedIndex].text);
    start.addEventListener('click', function(e){
      e.preventDefault();
      player = 'Computer';
      let newGame = document.querySelector('#board');
      newGame.innerHTML = '';
      new Game(6, 7);
    });
  }  
  else if(select.options[select.selectedIndex].text == 'Choose'){
    alert('Please choose an opponent!');
    start.addEventListener('click', function(e){
      e.preventDefault();
      player = '';
      let newGame = document.querySelector('#board');
      newGame.innerHTML = '';
    });  
  }
  
}