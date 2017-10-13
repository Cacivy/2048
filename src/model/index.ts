import { types } from 'mobx-state-tree'
import { getRandomInt } from '../utils'

const Item = types.model({
  value: types.optional(types.number, 0),
  x: types.number,
  y: types.number
})

export enum MoveType {
  'left' = 37,
  'right' = 39,
  'up' = 38,
  'down' = 40
}

const Store = types
  .model({
    score: 0,
    best: 0,
    list: types.array(Item)
  })
  .actions(self => {
    const setScore = (score: number) => {
      self.score = score
      if (score > self.best) {
        self.best = score
      }
    }
    const getItemByXY = (x: number, y: number) => {
      return self.list.find(l => l.x === x && l.y === y)
    }
    const isGameOver = (): boolean => {
      if (!self.list.some(l => l.value === 0)) {
        let isDone = self.list.some(l => {
          let right = getItemByXY(l.x + 1, l.y)
          let left = getItemByXY(l.x - 1, l.y)
          let up = getItemByXY(l.x, l.y + 1)
          let down = getItemByXY(l.x, l.y - 1)
          return (
            (right && right.value === l.value) ||
            (left && left.value === l.value) ||
            (up && up.value === l.value) ||
            (down && down.value === l.value)
          )
        })
        if (!isDone) {
          alert('fail')
          return true
        }
      }
      return false
    }
    const createRandomNum = () => {
      let x = getRandomInt(0, 3)
      let y = getRandomInt(0, 3)
      let value = getRandomInt(1, 2) * 2
      let item = getItemByXY(x, y)

      let result = isGameOver()
      if (result) {
        return
      }
      while (item.value > 0) {
        x = getRandomInt(0, 3)
        y = getRandomInt(0, 3)
        item = getItemByXY(x, y)
      }
      item.value = value
    }
    const init = () => {
      setScore(0)
      self.list.clear()
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
          let obj = {
            x,
            y,
            value: 0
          }
          self.list.push(obj)
        }
      }
      for (let i = 0; i < 2; i++) {
        createRandomNum()
      }
    }
    const move = (type: MoveType) => {
      if (!MoveType[type]) {
        return
      }
      const isUpOrDown = type === MoveType.up || type === MoveType.down
      const isAscending = type === MoveType.up || type === MoveType.right
      const arr = [0, 1, 2, 3]
      // isUpdate => createRandomNum
      let isUpdate = false
      arr.forEach(index => {
        let xArr = self.list.filter(
          l => (isUpOrDown ? l.x === index : l.y === index)
        )
        if (!isAscending) {
          xArr = xArr.sort((a, b) => (isUpOrDown ? a.y - b.y : a.x - b.x))
        } else {
          xArr = xArr.sort((a, b) => (isUpOrDown ? b.y - a.y : b.x - a.x))
        }
        // avoid 0422 right 0008
        let mergeCount = 0
        xArr.forEach((item, index) => {
          let current = item
          for (let i = index; i > 0; i--) {
            let prev = xArr[i - 1]
            let prevValue = prev.value
            let currentValue = current.value
            if (currentValue) {
              if (prevValue) {
                if (prevValue === currentValue && !mergeCount) {
                  // merge break
                  prev.value += prevValue
                  // scoring
                  setScore(self.score + prev.value)
                  // clear
                  current.value = 0
                  // computed mergeCount
                  mergeCount++
                  isUpdate = true
                  // success
                  if (prev.value === 2048) {
                    alert('success')
                  }
                  break
                } else {
                  break
                }
              } else {
                // move continue
                prev.value = currentValue
                // clear
                current.value = 0
                // exchange
                current = prev
                isUpdate = true
              }
            } else {
              break
            }
          }
        })
      })
      if (isUpdate) {
        createRandomNum()
      } else {
        isGameOver()
      }
    }
    return { getItemByXY, createRandomNum, isGameOver, init, move }
  })

export default Store
