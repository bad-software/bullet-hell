import m from 'mithril'
import { hooks } from './hooks'
import style from './intro.scss'


export function Intro() {

  const state = {
    message: {}
  }

  return {
    ...hooks,
    ...state,

    view() {
      return (
        <div class={ style.body }>
          { this.message }
        </div>
      )
    }
  }
}