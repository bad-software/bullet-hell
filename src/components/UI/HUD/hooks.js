import {Entities} from 'Models/Entities'

function onbeforeupdate() {
  this.boostRatio =
    Entities.player.boost.fuel / Entities.player.boost.maxFuel
}

export const hooks = {
  onbeforeupdate,
}