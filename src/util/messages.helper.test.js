import {
    extractFriendlyErrorMessage,
} from './messages.helper'


describe('messages.helper', () => {

    describe('extractFriendlyErrorMessage', () => {

        const DEFAULT_EXPECTED_ERROR_MESSAGE = 'Error'

        it('should extract message "error" from thrown Error', () => {
            const error = new Error('error')
            const expected = 'error'

            expect(extractFriendlyErrorMessage(error)).toBe(expected)
        })

        it('should return unchanged string for string input', () => {
            const errorString = 'string error'
            expect(extractFriendlyErrorMessage(errorString)).toBe(errorString)
        })

        it('should return default "Error" for undefined input', () => {
            expect(extractFriendlyErrorMessage()).toBe(DEFAULT_EXPECTED_ERROR_MESSAGE)
        })

        it('should return default "Error" for null input', () => {
            expect(extractFriendlyErrorMessage(null)).toBe(DEFAULT_EXPECTED_ERROR_MESSAGE)
        })

        it('should return default "Error" for empty {} input', () => {
            expect(extractFriendlyErrorMessage({})).toBe(DEFAULT_EXPECTED_ERROR_MESSAGE)
        })

        it('should return default "Error" for empty string input', () => {
            expect(extractFriendlyErrorMessage('')).toBe(DEFAULT_EXPECTED_ERROR_MESSAGE)
        })
    })

})
