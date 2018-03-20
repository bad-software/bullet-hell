import m from 'mithril'
import pull from 'lodash/pull'
import { Events, World } from 'matter-js'
import { Entities } from 'Models/Entities'
import { Game } from 'Models/Game'
import { checkHullBreach, setColor } from 'Lib/utility/matter'

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
        enemies = [],
        player

      // Is there a bullet?
      if ( x.bodyA.label === 'Bullet' ) bullet = x.bodyA
      else if ( x.bodyB.label === 'Bullet' ) bullet = x.bodyB

      // Are either or both of them enemies?
      if ( x.bodyA.label === 'Enemy' ) enemies.push( x.bodyA )
      if ( x.bodyB.label === 'Enemy' ) enemies.push( x.bodyB )

      // Is there a player?
      if ( x.bodyA.label === 'Player' ) player = x.bodyA
      else if ( x.bodyB.label === 'Player' ) player = x.bodyB

      /*if ( enemies.length === 2 ) {
        handleCollision_Enemies( enemies )
      } */
      /*else*/ if ( bullet ) {
        if ( enemies.length )
          handleCollision_Bullet_Enemy( bullet, enemies[0] )
        else if ( player ) handleCollision_Bullet_Player( bullet, player )
      } else if ( enemies.length && player )
        handleCollision_Enemy_Player( enemies[0].parent, player.parent )
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

    // Destroy the enemy
    Entities.ctrl.enemies.destroy( enemy )

    // Increment score
    Game.score += 20000
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
  Game.ctrl.end()
}

function handleCollision_Enemies( enemies ) {
  enemies.forEach(( e, i ) => {
    // Check if enemy is alive and make sure the other
    // enemy's velocity is over the enemy's threshold

    if (
      e.parent.isAlive &&
      i === 0 ?
        checkHullBreach( e.parent, enemies[1].parent )
        : checkHullBreach( e.parent, enemies[0].parent )
    )
      Entities.ctrl.enemies.destroy( e.parent )
  })
}

function handleCollision_Enemy_Player( enemy, player ) {
  if ( enemy.isAlive ) {
    if ( true ) { // if player is would die
      enemy.parts.forEach(( x ) => {
        setColor( x, '#f00' )
      })

      player.parts.forEach(( x ) => {
        setColor( x, '#f00' )
      })

      // Game over!
      Game.isRunning = false
      Game.isOver = true
    } else { // If player would live
      if (
        checkHullBreach( enemy, player )
      ) {
        enemy.parts.forEach(( x ) => {
          setColor( x, '#f00' )
        })

        Entities.ctrl.enemies.destroy( enemy )
      }
    }
  }
}