import m from 'mithril'
import pull from 'lodash/pull'
import { Events, World } from 'matter-js'
import { Entities } from 'models/Entities'
import { Game } from 'models/Game'


export function events() {
  // Keys
  document.body.addEventListener('keydown', e => {
    Game.keys[ e.code ] = true
  })

  document.body.addEventListener('keyup', e => {
    Game.keys[ e.code ] = false
  })

  // Mouse
  document.body.addEventListener('mousedown', e => {
    Game.mouse[ e.button ] = true
  })

  document.body.addEventListener('mouseup', e => {
    Game.mouse[ e.button ] = false
  })

  // Collision
  Events.on( Game.engine, 'collisionStart', event => {
    // Get collision pairs
    const pairs = event.pairs

    // Loop through each pair to see what the objects are
    pairs.forEach( x => {
      let
        bullet,
        enemy,
        player

      // Is there a bullet?
      if ( x.bodyA.label === 'Bullet' ) bullet = x.bodyA
      else if ( x.bodyB.label === 'Bullet' ) bullet = x.bodyB

      // Is there an enemy?
      if ( x.bodyA.label === 'Enemy' ) enemy = x.bodyA
      else if ( x.bodyB.label === 'Enemy' ) enemy = x.bodyB

      // Is there a player?
      if ( x.bodyA.label === 'Player' ) player = x.bodyA
      else if ( x.bodyB.label === 'Player' ) player = x.bodyB

      // Did a player and bullet collide?
      if ( bullet ) {
        if ( enemy ) {
          handleCollision_Bullet_Enemy( bullet, enemy )
        } else if ( player ) {
          handleCollision_Bullet_Player( bullet, player )
        }
      } else if ( enemy && player ) {
        handleCollision_Enemy_Player( enemy, player )
      }
    })
  })
}

function handleCollision_Bullet_Enemy( bullet, enemy ) {
  // matter-js will often trigger multiple collisions for each 
  // polygon the bullet touches, but we can only kill the enemy once
  if ( enemy.parent.isAlive ) {
    // Color the enemy red
    enemy.parent.parts.forEach(( x, i ) => {
      if ( i !== 0 ) {
        x.render.fillStyle = '#f00'
        x.render.strokeStyle = '#f00'
      }
    })

    // Remove the bullet
    pull( Entities.bullets, bullet )
    World.remove( Game.world, bullet )

    // Remove the enemy after a delay so we can see its color change
    setTimeout( () => {
      pull( Entities.enemies, enemy.parent )
      World.remove( Game.world, enemy.parent )
    }, 500 )

    Game.score += 20000

    // Kill the enemy
    enemy.parent.isAlive = false
  }
}

function handleCollision_Bullet_Player( bullet, player ) {
  player.parent.parts.forEach(( x, i ) => {
    if ( i !== 0 ) {
      x.render.fillStyle = '#f00'
      x.render.strokeStyle = '#f00'
    }
  })

  //Entities.bullets.forEach( x => x.render.fillStyle = '#fff' )
  bullet.render.fillStyle = '#fff'

  pull( Entities.bullets, bullet )

  // Game over!
  Game.running = false
  Game.over = true
}

function handleCollision_Enemy_Player( enemy, player ) {
  enemy.parent.parts.forEach(( x, i ) => {
    if ( i !== 0 ) {
      x.render.fillStyle = '#f00'
      x.render.strokeStyle = '#f00'
    }
  })

  player.parent.parts.forEach(( x, i ) => {
    if ( i !== 0 ) {
      x.render.fillStyle = '#f00'
      x.render.strokeStyle = '#f00'
    }
  })

  // Game over!
  Game.running = false
  Game.over = true
}
