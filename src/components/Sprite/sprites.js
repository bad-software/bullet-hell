const enemy = {
  fighter: require( './enemy/fighter' ),
  saucer: require( './enemy/saucer' ),
}

const player = {
  default: require( './player/default' ),
}


export const sprites = {
  enemy,
  player
}