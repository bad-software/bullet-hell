import m from 'mithril'
import { Message } from 'Components/UI/Message'
import { hooks } from './hooks'
import style from './init.scss'

export function Init() {
  return {
    ...hooks,

    view() {
      return (
        <div class={ style.body }>
          {/* Message */}
          <div data-name="message" class={ style.message }>
            <Message>
              Adjust the window size to scale the difficulty.
            </Message>

            <button data-name="btn" onclick={ e => this.close( e )}>
              OK
            </button>
          </div>

          {/* Help */}
          <div class={ style.help }>
            <div class={ style.help_text }>Press Space to continue.</div>

            <div class={ style.help_controls }>
              <span class={ style.help_controls_label }>
                Fire
              </span>
              &nbsp;- Space<br/>

              <span class={ style.help_controls_label }>
                Boost
              </span>
              &nbsp;- Left shift<br/>

              <span class={ style.help_controls_label }>
                Forward / reverse thrust
              </span>
              &nbsp;- W, Up Arrow / S, Down Arrow<br/>

              <span class={ style.help_controls_label }>
                Rotational thrust
              </span>
              &nbsp;- A, Left Arrow / D, Right Arrow<br/>

              <span class={ style.help_controls_label }>
                Lateral thrust
              </span>
              &nbsp;- Q, Left Bracket / E, Right Bracket<br/>

              <span class={ style.help_controls_label }>
                Pause
              </span>
              &nbsp;- Escape<br/>

              <span class={ style.help_controls_label }>
                Resume
              </span>
              &nbsp;- Enter
            </div>

          </div>

          {/* Corners */}
          <div data-name="corners">
            <div class={ `${ style.corner } ${ style.corner__ne }` }/>
            <div class={ `${ style.corner } ${ style.corner__nw }` }/>
            <div class={ `${ style.corner } ${ style.corner__se }` }/>
            <div class={ `${ style.corner } ${ style.corner__sw }` }/>
          </div>
        </div>
      )
    }
  }
}