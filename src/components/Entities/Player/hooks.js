import { Bodies, Svg, World } from 'matter-js'
import { Entities } from 'models/Entities'
import { Game } from 'models/Game'

const options = {
  angularDampening: 0.001, // I know it's not the right word but I'm at a loss
  density: 0.001,
  fireLimit: 200, // How many ms between shots
  label: 'Player',
  lastFired: 0, // How many ms it's been since we last fired
  maxAngularVelocity: 0.07,
  spawnProtectionRadius: 150,
  thrust: 0.00004,
  yaw: 0.0005,

  bullet: {
    distance: 8, // Distance from player
    radius: 3,
    rotSpeed: 4,
    speed: 9,
    opts: {
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      label: 'Bullet',
      restitution: 1,
      render: {
        //fillStyle: '#fff',
      },
      slop: 0.00000001,
    },
  },

  render: {
    fillStyle: '#fff',
    strokeStyle: '#fff',
    // Fix matter-js bug where edge lines are
    // visible due to sub-pixel rounding
    lineWidth: 1,
  },
}

function oncreate( vnode ) {
  // Normally we search children instead of directly using
  // an index but there is only one path for this sprite
  const
    path = vnode.dom.children[0],
    vertices = Svg.pathToVertices( path ),
    player = Bodies.fromVertices(
      // Center of screen
      Game.settings.width / 2,
      Game.settings.height / 2,
      vertices,
      options,
    )

  // Set player entity reference and add to world
  Entities.player = player
  World.add( Game.world, player )
}



export const hooks = {
  oncreate,
}