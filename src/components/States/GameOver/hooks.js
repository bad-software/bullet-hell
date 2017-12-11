import { Game } from 'models/Game'

function oninit() {
  this.textIndex = Math.floor( Math.random() * this.text.length )
  // Round score
  Game.score = Math.round( Game.score )
  // Update high score
  Game.highScore = Math.max( Game.score, Game.highScore )
}

export default {
  oninit
}