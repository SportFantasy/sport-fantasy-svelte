import {
  getShortDisplayDate,
  getShortDisplayDateTime,
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

  describe('getShortDisplayDateTime', () => {
    it('should return formatted string "Dec 4, 2019, 1:34 PM" for 1575462844799 unix timestamp (2019/12/4)', () => {
      const timestamp = 1575462844799
      const expected = 'Dec 4, 2019, 1:34 PM'

      expect(getShortDisplayDateTime(timestamp)).toBe(expected)
    })
  })
})
