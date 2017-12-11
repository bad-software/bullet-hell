import m from 'mithril'
import style from './message.scss'


export function Message() {
  return {
    view( vnode ) {
      return (
        <div class={ style.body }>
          { vnode.children }
        </div>
      )
    }
  }
}
