import { types } from 'mobx-state-tree'
import { getRandomInt, Text } from '../utils'

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

interface Model {
  score: number
  best: number
  list: {
    value: number
    x: number
    y: number
  }[]
}

const Store = types
  .model({
    score: 0,
    best: 0,
    list: types.array(Item)
  })
  .actions((self: Model) => {
    const setScore = (score: number) => {
      self.score = score
      if (score > self.best) {
        self.best = score
      }
    }
    const getItemByXY = (x: number, y: number) => {
      return self.list.find(l => l.x === x && l.y === y) || { x: 0, y: 0, value: 0 }
    }
    const setValueByXY = (x: number, y: number, value: number) => {
      getItemByXY(x, y)!.value = value
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
          ) || false
        })
        if (!isDone) {
          alert(Text.failTip)
          return true
        }
      }
      return false
    }
    const createRandomNum = () => {
      const getRandom = () => ({
        x: getRandomInt(0, 3),
        y: getRandomInt(0, 3),
        value: getRandomInt(1, 2) * 2
      })
      let { x, y, value } = getRandom()
      let item = getItemByXY(x, y)

      let result = isGameOver()
      if (result) {
        return
      }
      while (item.value > 0) {
        let obj = getRandom()
        item = getItemByXY(obj.x, obj.y)
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
    const getXArr = (isUpOrDown: boolean, isAscending: boolean, index: number) => {
        let xArr = self.list.filter(
          l => (isUpOrDown ? l.x === index : l.y === index)
        )
        xArr = xArr.sort((a, b) => {
          if (isAscending) {
            return isUpOrDown ? b.y - a.y : b.x - a.x
          } else {
            return isUpOrDown ? a.y - b.y : a.x - b.x
          }
        })
        return xArr
    }
    const move = (type: MoveType) => {
      if (!MoveType[type]) {
        return
      }
      const isUpOrDown = type === MoveType.up || type === MoveType.down
      const isAscending = type === MoveType.up || type === MoveType.right
      // isUpdate => createRandomNum
      let isUpdate = false
      for (let index = 0; index < 4; index++) {
        let xArr = getXArr(isUpOrDown, isAscending, index)
        // avoid 0422 right 0008
        let mergeCount = 0
        xArr.forEach((item, index) => {
          let current = item
          for (let i = index; i > 0; i--) {
            let prev = xArr[i - 1]
            let prevValue = prev.value
            let currentValue = current.value
            if (currentValue) {
              if (!prevValue) {
                // move continue
                prev.value = currentValue
                // clear
                current.value = 0
                // exchange
                current = prev
                isUpdate = true
                continue
              } else {
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
                  // if (prev.value === 2048) {
                  //   setTimeout(() => {
                  //     alert('success')
                  //   }, 2000)
                  // }
                }
              }
            }
            break
          }
        })
      }
      if (isUpdate) {
        createRandomNum()
      } else {
        isGameOver()
      }
    }
    return {
      getItemByXY,
      setValueByXY,
      createRandomNum,
      isGameOver,
      init,
      move
    }
  })

export default Store
