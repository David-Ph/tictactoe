const newPlayer = function(name, marker) {
    return {
        name, 
        marker
    };
};

const gameBoard = (function(){

    // * cache DOM
    let gameBoard = document.getElementById('game-board');
    let resetBtn = document.getElementById('restart-btn');
    let gameStatus = document.querySelector('.game-status');

    // * bind events
    // event delegation for square click
    gameBoard.addEventListener('click', _onSquareClick);
    resetBtn.addEventListener('click', _resetGame);

    // ? create variable to store the board
    let board;
    
    // ? initialize the board
    function init(){
        // create squares for the board
        board = [];
        gameStatus.innerHTML = "Let's Play!";
        gameBoard.innerHTML = '';
        for(let i = 0; i < 9; i++){
            let newSquare = document.createElement('div');
            newSquare.classList.add('square');
            board.push(newSquare);
            gameBoard.appendChild(newSquare);
        }
    }

    function _onSquareClick(event){

        if(!game.hasWinner){
            if(event.target.classList.contains('square')){
                let clickedSquare = event.target;
                // check for empty squares before inserting anything
                if(_checkForEmptySquare(clickedSquare)){
                    // check player turn
                    game.clickedSquares++;
                    if(game.switchPlayerTurn() === 2){
                        clickedSquare.innerHTML = game.playerOne.marker;
                    }else{
                        clickedSquare.innerHTML = game.playerTwo.marker;
                    }
                    game.hasWinner = game.checkWinner();
                    _getGameResult();           
                }
            }
        }

    }

    function  _getGameResult(){
        if(!game.hasWinner && game.clickedSquares === 9){
            gameStatus.innerHTML = "It's a draw!";
        }else if(game.hasWinner === 1){
            gameStatus.innerHTML = 'Player One wins!';
        }else if(game.hasWinner === 2){
            gameStatus.innerHTML = 'Player Two wins!';
        }
    }

    function _checkForEmptySquare(clickedSquare){
        if(clickedSquare.innerHTML === ''){
            return 1;
        }else{
            return 0;
        }
    }

    function _resetGame(){
        game.clickedSquares = 0;
        game.hasWinner = 0;
        _resetBoard();
    }

    function _resetBoard(){
        board.forEach((square) => {
            square.innerHTML = '';
        })
        gameStatus.innerHTML = "Let's Play!";
    }

    // call this at the end to initialize the game
    // and allows for board to be populated
    // before being returned
    init();
    return {
        init,
        board
    }
})();

const game = (function(){

    let playerOne = newPlayer('Player 1', 'O');
    let playerTwo = newPlayer('Player 2', 'X');
    let turn = 1;
    let clickedSquares = 0;
    let hasWinner = 0;

    function switchPlayerTurn(){
        // if it's player one's turn
        if(turn === 1){
            // switch it to player 2 next
            turn = 2;
            return 2;
        }else{
            // and vice versa
            turn = 1;
            return 1;
        }
    }

    function checkWinner(){
        let winner = 0;
        let winningSquares = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        winningSquares.forEach((item) => {
            if(
                gameBoard.board[item[0]].innerHTML === gameBoard.board[item[1]].innerHTML && 
                gameBoard.board[item[1]].innerHTML === gameBoard.board[item[2]].innerHTML &&
                (   
                    gameBoard.board[item[0]].innerHTML === playerOne.marker || 
                    gameBoard.board[item[0]].innerHTML === playerTwo.marker 
                )
            ){
                if(turn === 2){
                    winner = 1;
                }else if(turn === 1){
                    winner = 2;
                }
            }
        })
        // will return 1 if player 1 wins, return 2 if player 2 wins, and return 0 if no one wins.
        return winner;
    }

    return{
        playerOne,
        playerTwo,
        clickedSquares,
        switchPlayerTurn,
        checkWinner,
        hasWinner
    }
})();