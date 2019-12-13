export const GAME_TYPE_ID_TO_IMAGE_URL_MAP = {
    'HvfeS37yzwUIepzv5Y3Y': 'images/football-icon.png',
    'MGLleSxLA0qxrK2s09Z8': 'images/tennis-racket.png',
    'aRhqYfdoEbJ2SCUHaq7f': 'images/chess.png',
}
export const DEFAULT_IMAGE_URL = 'images/trophy.png'


export const getGameImageUrlFromGameTypeId = (gameTypeId) => {
    let foundImageUrl = GAME_TYPE_ID_TO_IMAGE_URL_MAP[gameTypeId]
    if (typeof foundImageUrl === 'undefined') {
        foundImageUrl = DEFAULT_IMAGE_URL
    }
    return foundImageUrl
};
