import m from 'mithril'
//import { hooks }  './hooks'
import style from './pause.scss'

export function Pause() {
  return {
    view() {
      return (
        <div class={ style.body }>
          <div class={ style.icon }>
            |&nbsp;|
          </div>
          &nbsp;&nbsp;Pause
        </div>
      )
    }
  }
}
