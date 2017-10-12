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
    const getItemByXY = (x: number, y: number) => {
      return self.list.find(l => l.x === x && l.y === y)
    }
    const createRandomNum = () => {
      let x = getRandomInt(0, 3)
      let y = getRandomInt(0, 3)
      let value = getRandomInt(1, 2) * 2
      let item = getItemByXY(x, y)
      if (!self.list.some(l => l.value === 0)) {
        alert('fail')
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
      const arr = isAscending ? [0, 1, 2, 3] : [3, 2, 1, 0]
      arr.forEach(index => {
        let xArr = self.list.filter(l => isUpOrDown ? l.x === index : l.y === index)
        if (isAscending) {
          xArr = xArr.sort((a, b) => isUpOrDown ? a.y - b.y : a.x - b.x)
        } else {
          xArr = xArr.sort((a, b) => isUpOrDown ? b.y - a.y : b.x - a.x)
        }
        for(let i = 0;  i < 4; i++) {
          xArr.reduce((prev, current) => {
            let prevValue = prev.value
            let currentValue = current.value
            if (prevValue) {
              if (currentValue) {
                if (prevValue === currentValue) {
                  current.value += prevValue
                  self.score += current.value
                  prev.value = 0
                  if (current.value === 2048) {
                    alert('success')
                  }
                }
              } else {
                current.value = prevValue
                prev.value = 0
              }
            }
            return current
          })
        }
        xArr.forEach(item => {
          getItemByXY(item.x, item.y).value = item.value
        })
      })
      createRandomNum()
    }
    return { getItemByXY, createRandomNum, init, move }
  })

export default Store
