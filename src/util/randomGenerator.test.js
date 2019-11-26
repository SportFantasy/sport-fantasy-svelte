import {
  getRandomNumber,
  getRandomTitle,
} from './randomGenerator'


describe('randomGenerator', () => {

  describe('getRandomNumber', () => {
    it('should return number between 0 and 100', () => {
      expect(getRandomNumber()).toBeGreaterThanOrEqual(0)
      expect(getRandomNumber()).toBeLessThanOrEqual(100)
    })
  })

  describe('getRandomTitle', () => {
    it('should return randomized title with default prefix "Title"', () => {
      const defaultPrefix = 'Title'
      const title1 = getRandomTitle()
      expect(title1).toContain(defaultPrefix)
    })

    it('should return randomized title with defined prefix', () => {
      const defaultPrefix = 'Title'
      const myPrefix = 'Article'
      const title1 = getRandomTitle(myPrefix)
      expect(title1).toContain(myPrefix)
      expect(title1).not.toContain(defaultPrefix)
    })

    it('should return always different title with default prefix "Title"', () => {
      const title1 = getRandomTitle()
      const title2 = getRandomTitle()
      expect(title1).not.toBe(title2)
    })

    it('should return always different title with defined prefix', () => {
      const prefix = 'My Title'
      const title1 = getRandomTitle(prefix)
      const title2 = getRandomTitle(prefix)
      expect(title1).not.toBe(title2)
    })
  })

})
