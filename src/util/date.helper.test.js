import {
  getShortDisplayDate,
} from './date.helper'


describe('date.helper', () => {

  describe('getShortDisplayDate', () => {
    it('should return formatted string "Oct 20, 2010" for 1287525600000 unix timestamp (2010/10/20)', () => {
      const timestamp = 1287525600000 // 10/20/2010
      const expected = 'Oct 20, 2010'

      expect(getShortDisplayDate(timestamp)).toBe(expected)
    })

    it('should return undefined for empty input', () => {
      expect(getShortDisplayDate()).toBe(undefined)
    })

    it('should return null for null input', () => {
      expect(getShortDisplayDate(null)).toBe(null)
    })
  })
})
