import Store, {MoveType} from './store'
import { applySnapshot, onSnapshot } from 'mobx-state-tree'
const local = window.localStorage ? window.localStorage.getItem('store') : ''
const initData = local ? JSON.parse(local) : { list: [] }
const store = Store.create(initData)
if (!local) {
  store.init()
}

// Time travel
var states: any[] = []
var currentFrame = -1

onSnapshot(store, snapshot => {
  if (currentFrame === states.length - 1) {
    currentFrame++
    states.push(snapshot)
    if (window.localStorage) {
      window.localStorage.setItem('store', JSON.stringify(snapshot))
    }
  }
})

const previousState = () => {
  if (currentFrame <= 0) return
  currentFrame--
  applySnapshot(store, states[currentFrame])
  states.splice(currentFrame, 1)
}

export {
  previousState, store, MoveType
}