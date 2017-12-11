import m from 'mithril'
import { hooks } from './hooks'
import style from './intro.scss'


export function Intro() {

  const state = {
    message: {},
    screen: 0,
  }

  return {
    ...hooks,
    ...state,

    view( vnode ) {
      return (
        <div class={ style.body }>
          { function () {
            switch ( vnode.state.screen ) {
              case 0:
                return ( // Credits
                  <div
                    class={`${style.message} ${style.credits}`}
                    key={1}
                  >
                    <div class={ style.creditsA }>
                      A VIDEO GAME <div class={ style.creditsA_B }>BY</div>
                    </div>

                    <div class={ style.creditsB }>
                      <div class={ style.creditsB_A }>BAD</div> SOFTWARE
                    </div>
                  </div>
                )

              case 1:
                return ( // Title
                  <div
                    class={`${style.message} ${style.title}`}
                    key={2}
                  >
                    <span class={ style.white }>BULLET</span>&nbsp;HELL
                  </div>
                )

              case 2:
                return ( // Ready?
                  <div
                    class={`${style.message} ${style.ready}`}
                    key={3}
                  >
                    Ready?
                  </div>
                )

              case 3:
                return ( // Go
                  <div
                    class={`${style.message} ${style.go}`}
                    style="font-weight: bold;"
                    key={4}
                  >
                    GO
                  </div>
                )
            }
          }()}
        </div>
      )
    }
  }
}