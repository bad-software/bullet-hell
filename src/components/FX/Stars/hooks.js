import { Bodies, World } from 'matter-js'
import { randomPosition } from 'Lib/utility/matter'
import { Game } from 'Models/Game'
import { getRandomElement, randomRange } from 'Lib/utility'




function oninit() {
  const colors = {
    // A few layers of varying opacity
    grayscale: [
      `rgba( 255, 255, 255, 0.1 )`,
      `rgba( 255, 255, 255, 0.1 )`,
      `rgba( 255, 255, 255, 0.15 )`,
      `rgba( 255, 255, 255, 0.2 )`,
      `rgba( 255, 255, 255, 0.4 )`,
    ],
    // One layer for each color, calculate opacity for each star
    rgb: [
      () => `rgba( 255, 90, 90, ${randomRange( 0.3, 0.4 )})`, // red
      () => `rgba( 255, 127, 0, ${randomRange( 0.4, 0.5 )})`, // orange
      () => `rgba( 127, 115, 0, ${randomRange( 0.3, 0.6 )})`, // yellow
      () => `rgba( 100, 160, 200, ${randomRange( 0.5, 0.6 )})`, // cyan
    ]
  }

  const
    screenRatio = 15,
    count =
      Game.settings.width / screenRatio
      + Game.settings.height / screenRatio,
    colorRatio = 0.15

  // Add grayscale stars
  colors.grayscale.forEach(( x, i ) => {
    populate( count * ( 1 - colorRatio ) / colors.grayscale.length, x)
  })

  // Add color stars
  populate( count * colorRatio, colors.rgb )
}

function addStar({ color }) {
  const
    options = {
      isStatic: true,
      collisionFilter: {
        mask: Game.collision.filters.stars
      },
      render: {
        fillStyle: color
      }
    },
    position = randomPosition(),
    star = Bodies.circle(
      position.x,
      position.y,
      1,
      options
    )

  World.add( Game.world, star )
}

function populate( count, color ) {
  count = Math.round( count )

  if ( Array.isArray( color )) {
    for ( let i = 0; i < count; i++ ) {
      addStar({ color: getRandomElement( color )})
    }
  } else {
    for ( let i = 0; i < count; i++ ) {
      addStar({ color })
    }
  }


}

export const hooks = {
  oninit,
}