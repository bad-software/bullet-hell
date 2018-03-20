import m from 'mithril'
import { Engine } from 'matter-js'
import { Model } from 'Models/'
import { ctrl } from './controller'


export const Game = new class C_Game extends Model {
  constructor() {
    super()
    this.ableToSpawn = false
    this.collision = {
      filters: {
        stars: 0x10,
      }
    }

    this.engine = Engine.create()
    this.hasRun = false
    this.highScore = 0 // Used to skip intro after first time
    this.isOver = false
    this.isRunning = false
    this.keys = {} // Map of each active key's code
    this.lastDelta = 0
    this.mouse = {} // Map of each active mouse button's number
    this.player = null
    this.score = 0

    this.settings = {
      maxBullets: 100,
      maxEnemies: 20,
      spawnRate: 5000, //ms
      spawnVariance: 0.5, // Multiplier to lower spawn rate
      gravity: 0,
      height: 0,
      width: 0,
    }

    // The current state we're in
    this.state = 'Init'

    this.timeSinceLastSpawn = 0

    // Alias for engine.world
    this.world = this.engine.world
    this.world.gravity.y = 0

    this.ctrl = ctrl
  }
}