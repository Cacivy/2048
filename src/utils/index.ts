const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max) + 1
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

export { getRandomInt }
export {default as Text} from './i18n'