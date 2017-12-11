import m from 'mithril'
import { roundToNth } from 'Lib/utility'
import { Entities } from 'Models/Entities'
import { Game } from 'Models/Game'
import { hooks } from './hooks'
import style from './hud.scss'

export function HUD() {

  const state = {
    // Initialize at 60 FPS
    averageDelta: 1000 / 60,
    boostRatio: 1,
    boostRatioLowThreshold: 0.5, // Threshold at which boost meter becomes red
    boostRatioHighThreshold: 0.75
  }

  return {
    ...hooks,
    ...state,

    view( vnode ) {
      return (
        <div class={ style.body }>
          <div>
            <div class={ style.topLeft }>
              {/* Score */}
              { // Don't show if the game is over
                !Game.over ?
                  <div class={ style.score }>
                    {/*Score:&nbsp;*/}
                    {
                      Game.score > 1000 ?
                        `${ Math.floor( Game.score / 1000 )}000`
                          .padStart( 7, '0' )
                        : '0000000'
                    }
                  </div>
                  : Math.round( Game.score ).toString().padStart( 7, '0' )
              }
            </div>

            <div class={ style.topRight }>


              {/* Boost meter */}
              {
                this.boostRatio === 1 ?
                  (
                    <div class={ style.boostMeter_wrapper }>
                      <div
                        class={`${style.boostMeter} ${style.boostMeter__max}`}
                        style={`width: ${
                          this.boostRatio * style.boostMeterWidth
                        }px;`}
                      />
                    </div>
                  )
                  : this.boostRatio >= this.boostRatioHighThreshold ?
                    (
                      // High color
                      <div class={ style.boostMeter_wrapper }>
                        <div
                          class={ style.boostMeter }
                          style={`width: ${
                            this.boostRatio * style.boostMeterWidth
                          }px;`}
                        />
                      </div>
                    )
                    : this.boostRatio > this.boostRatioLowThreshold ?
                      (
                        // Med color
                        <div class={
                          `${style.boostMeter_wrapper} `
                          + style.boostMeter_wrapper__med
                        }>
                          <div
                            class={
                              `${style.boostMeter} `
                              + style.boostMeter__med
                            }
                            style={`width: ${
                              this.boostRatio * style.boostMeterWidth
                            }px;`}
                          />
                        </div>
                      )
                      : (
                        // Low color
                        <div class={
                          `${style.boostMeter_wrapper} `
                          + style.boostMeter_wrapper__low
                        }>
                          <div
                            class={
                              `${style.boostMeter} `
                              + style.boostMeter__low
                            }
                            style={`width: ${
                              this.boostRatio * style.boostMeterWidth
                            }px;`}/>
                        </div>
                      )
              }
            </div>

            <div class={ style.bottomRight }>
              {/* Speed */}
              {/*<div class={ style.debug }>
                Speed:
                { Entities.player.speed.toFixed( 1 ).toString() }
                <br/>
              </div>*/}

              {/* FPS */}
              <div class={ style.debug }>
                FPS:&nbsp;
                { function() {
                  // Poor man's moving average
                  vnode.state.averageDelta +=
                    ( Game.lastDelta - vnode.state.averageDelta ) * 0.02

                  // Return 1s / delta to get FPS,
                  return ( 1000 / vnode.state.averageDelta )
                    .toFixed( 2 )
                    .toString()
                }()}
                <br/>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
