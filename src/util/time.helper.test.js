import {
  getUnixTimeStampFromDate,
} from './time.helper'


describe('time.helper', () => {

  describe('getUnixTimeStampFromDate', () => {
    it('should return number 1287525600 unix timestamp for date 2010/10/20', () => {
      const date = new Date('10/20/2010')
      const expectedNumber = 1287525600000

      expect(getUnixTimeStampFromDate(date)).toBe(expectedNumber)
    })

    it('should return undefined for empty input', () => {
      expect(getUnixTimeStampFromDate()).toBe(undefined)
    })
  })
})
