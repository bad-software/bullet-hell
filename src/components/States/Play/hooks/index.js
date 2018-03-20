import { Composite, Engine, Render, World } from 'matter-js'
import { Entities } from 'Models/Entities'
import { Game } from 'Models/Game'
import { Sound } from 'Models/Sound'
import { boundaries } from './boundaries'
import { gameLoop } from './gameLoop'
import { events } from './events'


function oninit() {
  Game.hasRun = true
}

function oncreate( vnode ) {
  boundaries()
  events()

  // Create a renderer
  this.render = Render.create({
    element: vnode.dom,
    engine: Game.engine,
    options: {
      height: Game.settings.height,
      width: Game.settings.width,
      wireframes: false,
    }
  })

  // Run the renderer
  Render.run( this.render )

  // Self explanatory
  Game.isRunning = true

  // Run game loop
  gameLoop()
}

function onremove() {
  // Reset properties
  Game.isOver = false
  Game.score = 0
  Game.timeSinceLastSpawn = 0

  // Clear entities model
  Entities.bullets = []
  Entities.enemies = []
  Entities.enemyBullets = []
  Entities.player = null

  // Shut down Matter
  World.remove( Game.world, Composite.allBodies( Game.world ))
  Render.stop( this.render )
  Engine.clear( Game.engine )
}


export const hooks = {
  oninit,
  oncreate,
  onremove,
}