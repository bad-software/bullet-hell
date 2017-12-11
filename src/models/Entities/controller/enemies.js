import { explodeBody } from 'Lib/utility/matter'

function destroy( enemy ) {
  if ( enemy.isAlive ) {
    enemy.parent.isAlive = false
    explodeBody( enemy )
  }
}

export const enemies = {
  destroy
}