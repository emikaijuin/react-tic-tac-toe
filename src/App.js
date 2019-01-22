import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      currentPlayer: "X",
      X_positions: [],
      O_positions: []
    }
  }

  // Driver functions
  
  handlePlayClick = e => {
    if (e.target.innerHTML) { return "Invalid move." }
    
    let updatedState = {}
    updatedState.currentPlayer = this.state.currentPlayer === "X" ? "O" : "X"
    updatedState[`${this.state.currentPlayer}_positions`] = this.updatedPositions(parseInt(e.target.id))

    this.setState(updatedState)
  }

  // Continue Game Functions
  
  updatedPositions = (index) => {
    let currentPositions = [...this.state[`${this.state.currentPlayer}_positions`]]
    currentPositions.push(index)

    return currentPositions
  }
  
  // Check if and how game is over
  
  winningPositions() {
    return [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
  }
  
  checkWin = () => {
    let win = false
    this.winningPositions().forEach(winPos => {
      if ( 
        this.previousPositions().includes(winPos[0]) && 
        this.previousPositions().includes(winPos[1]) && 
        this.previousPositions().includes(winPos[2])
      ) {
        win = true
      }
    })
    return win
  }
  
  checkDraw = () => {
    if ([...this.state.X_positions, ...this.state.O_positions].length === 9 && !this.state.win) {
      return true
    } 
    return false
  }
  
  // New Game
  
  resetGame = () => {
    this.setState({
      currentPlayer: "X",
      X_positions: [],
      O_positions: []
    })
  }
  
  // Helpers
  
  previousPlayer = () => this.state.currentPlayer === "X" ? "O" : "X"

  previousPositions = () => this.state[`${this.previousPlayer()}_positions`]
    
  marker = index => {
    if (this.state.X_positions.includes(index)) {
      return "X"
    } else if (this.state.O_positions.includes(index)) {
      return "O"
    } else {
      return ""
    }
  }

  // Render

  render() {
    let message
    let canReset = true

    if (this.checkWin()) {
      message = `Congratulations, player ${this.previousPlayer()} won!`
      canReset = false
    } else if (this.checkDraw()) {
      message = 'Game is a draw'
      canReset = false
    } else {
      message = `${this.state.currentPlayer == "X" ? "O" : "X"}'s turn.`
    }

    return (
      <div className="App">
        <div id="message"> { message }</div>
        <button disabled={ canReset } onClick={this.resetGame}>Reset Game</button>
        <div className="board" onClick={this.handlePlayClick}>
          <div id="0" className="square">{ this.marker(0) }</div>
          <div id="1" className="square">{ this.marker(1) }</div>
          <div id="2" className="square">{ this.marker(2) }</div>
          <div id="3" className="square">{ this.marker(3) }</div>
          <div id="4" className="square">{ this.marker(4) }</div>
          <div id="5" className="square">{ this.marker(5) }</div>
          <div id="6" className="square">{ this.marker(6) }</div>
          <div id="7" className="square">{ this.marker(7) }</div>
          <div id="8" className="square">{ this.marker(8) }</div>
        </div>
      </div>
    );
  }
}

export default App;
