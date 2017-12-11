import m from 'mithril'
import { Message } from 'components/UI/Message'
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