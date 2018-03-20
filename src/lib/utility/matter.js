import { Bodies, Body, World } from 'matter-js'
import { Entities } from 'Models/Entities'
import pull from 'lodash/pull'
import { Game } from 'Models/Game'

export function addVectorMaps(vec1, vec2 ) {
  return {
    x: vec1.x + vec2.x,
    y: vec1.y + vec2.y
  }
}

export function behindPlayer( player, distance = -200 ) {
  return {
    x: Math.cos( player.angle ) * distance,
    y: Math.sin( player.angle ) * distance
  }
}

export function checkHullBreach( body, projectile ) {
  return projectile.speed > body.impactThreshold
}

export function explodeBody( body, multiplier=1 ) {
  // Explode a Matter.Body into its constituent pieces.
  // Only works if the poly is composed of several parts
  const
    parent = body.parent

  parent.render.fillStyle = '#f00'

  // Does the parent component have multiple parts?
  setTimeout( () => {
    if (parent.parts.length > 1) {
      World.remove(Game.world, parent)
      pull(Entities.enemies, parent)
      parent.parts.forEach((part, i) => {
        const newPart = Bodies.fromVertices(
          // Center of screen
          part.position.x,
          part.position.y,
          [part.vertices],
          {
            angle: Math.random() * Math.PI * 2,
            render: {
              fillStyle: '#f00',
            },
          },
        )

        if ( parent.enemyType === 'saucer' ) {
          // Discard this redundant polygon
          if ( i !== 0 ) {
            const speed = Math.random() * multiplier

            World.add( Game.world, newPart )
            Body.setVelocity( newPart, {
              x: parent.velocity.x * speed,
              y: parent.velocity.y * speed
            })

            // Keep debris on screen if the game is over
            //if ( !Game.isOver )
            setTimeout( () => World.remove( Game.world, newPart ), 800 )
          }
        }
      })
    }
  }, 0 ) // Time to wait before explosion
}

export function getDistance( vectorA, vectorB ) {
  const
    a = vectorA.x - vectorB.x,
    b = vectorA.y - vectorB.y

  return Math.sqrt( a*a + b*b )
}

export function getMagnitude( vector ) {
  return vector.x ** 2 * vector.y ** 2
}

export function normalize( vector ) {
  const m = getMagnitude( vector )
  return { x: vector.x / m, y: vector.y / m }
}

export function randomPosition() {
  return { 
    x: Math.random() * Game.settings.width, 
    y: Math.random() * Game.settings.height 
  }
}

export function setColor( body, color='#fff') {
  body.render.fillStyle = color
  body.render.strokeStyle = color
}