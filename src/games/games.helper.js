import FOOTBALL_IMAGE from '../assets/football-icon.png'
import TENNIS_IMAGE from '../assets/tennis-racket.png'
import CHESS_IMAGE from '../assets/chess.png'
import TROPHY_IMAGE from '../assets/trophy.png'

export const GAME_TYPE_ID_TO_IMAGE_MAP = {
    'HvfeS37yzwUIepzv5Y3Y': FOOTBALL_IMAGE,
    'MGLleSxLA0qxrK2s09Z8': TENNIS_IMAGE,
    'aRhqYfdoEbJ2SCUHaq7f': CHESS_IMAGE,
}
export const DEFAULT_IMAGE = TROPHY_IMAGE


export const getGameImageUrlFromGameTypeId = (gameTypeId) => {
    let foundImageUrl = GAME_TYPE_ID_TO_IMAGE_MAP[gameTypeId]
    if (typeof foundImageUrl === 'undefined') {
        foundImageUrl = DEFAULT_IMAGE
    }
    return foundImageUrl
};
