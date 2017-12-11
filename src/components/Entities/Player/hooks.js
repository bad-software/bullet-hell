import { Bodies, Svg, World } from 'matter-js'
import { Entities } from 'Models/Entities'
import { Game } from 'Models/Game'

const
  boostFuel = 100,
  options = {
    angularDecay: 0.000000002,
    boost: {
      acceleration: 0.000072,
      burnRate: 0.2,
      chargeRate: 0.005,
      fuel: boostFuel,
      maxFuel: boostFuel,
    },
    boostLimit: 2000,
    density: 0.001,
    fireLimit: 200, // How many ms between shots
    friction: 0,
    frictionAir: 0.009,
    frictionStatic: 0,
    isBoosting: false,
    label: 'Player',
    lastBoosted: 0,
    lastFired: 0, // How many ms it's been since we last fired
    lateralThrust: 0.00003,
    maxAngularVelocity: 0.015,
    spawnProtectionRadius: 150,
    thrust: 0.00004,
    yaw: 0.00066,

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

  // Tell the world
  console.log( 'player:' )
  console.log( player )

  // Set player entity reference and add to world
  Entities.player = player
  World.add( Game.world, player )
}



export const hooks = {
  oncreate,
}