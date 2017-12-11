'use strict'
import m from 'mithril'
import { l } from 'Layouts/Default'
import { Game } from 'Components/Game'

// SVGPathSeg polyfill needed for `matter-js`
import './lib/external/pathseg'

// Import styles
import './stylesheets/index.scss'

// Define root
const root = document.querySelector( '#root' )

// Mount
m.mount( root, l( Game ))