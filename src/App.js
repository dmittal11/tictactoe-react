import React, { Component } from 'react';
import hasSubArray from './utils/utils';
import './App.css';
import Operation from './components/Operation';


// State 

// State: 

// 	- Board 
// 	- Player 
// 	- Winner
	
// Functions:

// 	handleClick:
// 					- Check that the current value within the board is null
// 					- Know the current positions of either X or 0
// 					- Check the current positions against the winning positions 
// 					- According to the results the Winner can either be x or 0
					
// 	createBoard:    - Use the map function to create the necessary divisions 




// Render

// Child Component - Status 

// 1) Pass the right props to Status 

// 2) Call the function that allows the boxes to be rendered to the screen 

// 3) The reset button is disabled once the game has started and there is no winner

// 4) The reset button is enabled once the game is complete or if there is a winner 


// Refactor the code 



class App extends Component {


  // Contructor Method 
  constructor(props){
    super(props)

    this.state = {
      board: Array(9).fill(),
      player: null
    }


  }

  // Takes argument called player 
  // Player is a parameter
  player(player){
    this.setState({
      player
    })
  }

   // Takes the argument index
   // Index is the parameter 
  handleClick(index){

    let winner = false 

    if(!this.state.board[index]){
      this.state.board[index] = this.state.player
    

    let playerPositions = [];
    for(let i=0; i<this.state.board.length; i++){
        if(this.state.board[i] === this.state.player){
          playerPositions.push(i)
        }
    }

    let winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6] 
    ]

    for(let j = 0; j<winningLines.length; j++){
      const [a, b, c] = winningLines[j] // destructuring 

      if(hasSubArray(playerPositions, [a, b, c])){
        if(window.confirm(this.state.player + ' Has Won!! \n Would You like to reset the game')){
          winner = true
          break;
        }
      }
    }
  }

    if(winner){
      this.setState({
        board: Array(9).fill(),
        player: null
      })
    } else{
      this.setState({
        board: this.state.board,
        player: this.state.player === 'x' ? '0' : 'x'
      })

    }
}



  renderBoxes(){
    return(
    this.state.board.map((box, index) => (
      <div className="box" key={index} onClick={() => this.handleClick(index)}>
        {box}
      </div>
    ))
    )
  }


  render(){
  return (

    <div className="container">
      <h1>Tic Tac Toe App</h1>
      
       <Operation setPlayer={(player) => this.player(player)} getPlayer={this.state.player} />

      <div className="board">

      {/* Board code goes here   */}
      
      {this.renderBoxes()}
      

      </div>

      {/* Button code goes here  */}
    </div>
  );
}
}

export default App;
