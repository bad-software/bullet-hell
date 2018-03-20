import path from 'path'
import { paths } from './paths'


export function alias() {
  return {
    Components: path.resolve( paths.src, 'components' ),
    Controllers: path.resolve( paths.src, 'controllers' ),
    Data: path.resolve( paths.src, 'data' ),
    Layouts: path.resolve( paths.src, 'components/_Layouts' ),
    Lib: path.resolve( paths.src, 'lib' ),
    Models: path.resolve( paths.src, 'models' ),
  }
}