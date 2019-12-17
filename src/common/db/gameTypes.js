import db from './db.js'


const GAME_TYPE_COLLECTION_NAME = 'gametypes'


const _processRaw = (raw) => {
    let result = {}
    raw.forEach((doc) => {
        const data = doc.data()
        result[doc.id] = {
            ...data,
            id: doc.id,
        }
    })

    return result
}

export const getAllGameTypes = () => {
    return db.collection(GAME_TYPE_COLLECTION_NAME)
        .get()
        .then(_processRaw)
}
