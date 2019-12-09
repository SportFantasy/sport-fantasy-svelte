const DEFAULT_ERROR_MESSAGE = 'Error'

export const extractFriendlyErrorMessage = (error) => {
    if (!error) {
        return DEFAULT_ERROR_MESSAGE
    }

    if (
      typeof error === 'string'
    ) {
        return error
    }

    if (
        error &&
        error.message &&
        typeof error.message === 'string'
    ) {
        return error.message
    }

    return DEFAULT_ERROR_MESSAGE
}
