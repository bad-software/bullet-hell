import m from 'mithril'
import style from './layout.scss'

// Not used directly, uses higher order component below
function Layout() {
  return {
    view: ( vnode ) => (
      <div class={ style.default }>
        { vnode.children }
      </div>
    )
  }
}

// HOC that returns a view
export function l( Component ) {
  return {
    view: () =>
      Component ? m( Layout, m( Component ))
        : ( m( Layout ))
  }
}