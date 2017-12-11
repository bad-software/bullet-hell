import { Svg } from 'matter-js'
import { Entities } from 'Models/Entities'
import { Game } from 'Models/Game'
import { spawnEnemy } from './spawnEnemy'


function oncreate( vnode ) {
  this.options = {
    density: 0.0001,
    enemyType: 'saucer',
    friction: 0,
    frictionAir: 0.075,
    frictionStatic: 0,
    // Maximum impact speed hull can withstand before capsizing
    impactThreshold: 1,
    isAlive: true,
    label: 'Enemy',
    fireLimit: 3000, // How many ms between shots
    lastFired: 0, // How many ms it's been since we last fired
    thrust: 0.00001,

    bullet: {
      distance: 25, // Distance from enemy
      radius: 4,
      rotSpeed: 4,
      speed: 4,
      timeAlive: 0,
      timeToLive: 6000, // Divide by fireLimit to get max on-screen bullets
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      label: 'Bullet',
      restitution: 1,
      render: {
        fillStyle: '#fff',
      },
      slop: 0.00000001,
    },

    render: {
      fillStyle: '#fff',
      strokeStyle: '#fff',
      // Fix matter-js bug where edge lines are
      // visible due to sub-pixel rounding
      lineWidth: 1,
    },
  }

  this.sprites = Array.from( vnode.dom.children )
    .map( x => Svg.pathToVertices( x.children[0] ))
}

function onupdate( vnode ) {
  if (
    Game.ableToSpawn &&
    Entities.enemies.length < Game.settings.maxEnemies
  ) {
    spawnEnemy( vnode )

    Game.timeSinceLastSpawn = 0
    Game.ableToSpawn = false
  }
}

export const hooks = {
  oncreate,
  onupdate,
}