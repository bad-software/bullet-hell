import {Entities} from 'Models/Entities'
import {Body} from 'matter-js'

const
  xThrust = ( enemy, angle ) => Math.cos( angle ) * enemy.thrust,
  yThrust = ( enemy, angle ) => Math.sin( angle ) * enemy.thrust

export function thrust( enemy, angle ) {
  // Apply thrust towards player
  Body.applyForce( enemy, enemy.position,
    {
      x: xThrust( enemy, angle ),
      y: yThrust( enemy, angle ),
    }
  )
}