import { Bodies, World } from 'matter-js'
import { Game } from 'Models/Game'


export function boundaries() {
  const settings = {
    isStatic: true,
    size: 15,
    render: {
      friction: 0,
      frictionStatic: 0,
      restitution: 0,
      fillStyle: '#111',
      strokeStyle: '#111'
    }
  }


  function createWall( x, y, width, height ) {
    return Bodies.rectangle(
      x,
      y,
      width,
      height,
      settings
    )
  }

  const
    height = Game.settings.height,
    width = Game.settings.width,

    top = createWall( width * 0.5, 0, width, settings.size ),
    bottom = createWall( width * 0.5, height, width, settings.size ),
    left = createWall( 0, height * 0.5, settings.size, height),
    right = createWall( width, height * 0.5, settings.size, height )

  World.add(Game.world, [ top, right, bottom, left ])
}