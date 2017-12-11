import m from 'mithril'
import { Model } from 'Models/'
import { ctrl } from './controller'


export const Entities = new class C_Entities extends Model {
  constructor() {
    super()

    this.bullets = []
    this.enemies = []
    this.enemyBullets = []
    this.powerups = []
    this.player = null

    this.ctrl = ctrl
  }
}