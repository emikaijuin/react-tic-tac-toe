import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      currentPlayer: "X",
      X_positions: [],
      O_positions: [],
      win: false,
      draw: false,
      canReset: false,
      message: "X's turn."
    }
  }

  // Driver functions
  
  play = e => {
    if (e.target.innerHTML) { return "Invalid move." }
    this.markSquare(e.target)
    this.updatePositions(parseInt(e.target.id))
    this.setState({
      win: this.checkWin(),
      draw: this.checkDraw()
    }, () => this.determineNext())
  }
  
  determineNext = () => {
    let message
    if (this.state.win) {
      message = `Congratulations, player ${this.state.currentPlayer} won!`
      this.setState({canReset: true})
    } else if (this.state.draw) {
      message = 'Game is a draw.'
      this.setState({canReset: true})
    } else {
      this.setState({currentPlayer: this.toggleCurrentPlayer() })
      message = `${this.state.currentPlayer == "X" ? "O" : "X"}'s turn.`
    }
    this.setState({message: message})
  }
  
  // Continue Game Functions
  
  updatePositions = (index) => {
    let currentPositions = this.currentPositions()
    let updatedPositionState = {}
    currentPositions.push(index)
    updatedPositionState[`${this.state.currentPlayer}_positions`] = currentPositions
    
    return updatedPositionState
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
        this.currentPositions().includes(winPos[0]) && 
        this.currentPositions().includes(winPos[1]) && 
        this.currentPositions().includes(winPos[2])
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
    Array.from(document.querySelector('.board').children).forEach(elem => {
      elem.innerHTML = ""
    })
    this.setState({
      currentPlayer: "X",
      X_positions: [],
      O_positions: [],
      win: false,
      draw: false,
      message: `${this.state.currentPlayer}'s turn.`,
      canReset: false
    })
  }
  
  // Helpers
  
  currentPositions = () => this.state[`${this.state.currentPlayer}_positions`]
    
  markSquare = elem => elem.innerHTML = this.state.currentPlayer
  
  toggleCurrentPlayer = () => this.state.currentPlayer === "X" ? "O" : "X"

  // Render

  render() {
    return (
      <div className="App">
        <div id="message"> { this.state.message }</div>
        <button disabled={ !this.state.canReset } onClick={this.resetGame}>Reset Game</button>
        <div className="board" onClick={this.play}>
          <div id="0" className="square"></div>
          <div id="1" className="square"></div>
          <div id="2" className="square"></div>
          <div id="3" className="square"></div>
          <div id="4" className="square"></div>
          <div id="5" className="square"></div>
          <div id="6" className="square"></div>
          <div id="7" className="square"></div>
          <div id="8" className="square"></div>
        </div>
      </div>
    );
  }
}

export default App;
