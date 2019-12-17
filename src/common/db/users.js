import db from './db.js'


const USERS_COLLECTION_NAME = 'users'


const _processRawUserDoc = (rawDoc) => {
    const data = rawDoc.data()
    return {
        ...data,
        id: rawDoc.id,
    }
}

const _processRawUsersCollection = (rawUsersCollection) => {
    let users = {}

    rawUsersCollection.forEach((doc) => {
        users[doc.id] = _processRawUserDoc(doc)
    })

    return users
}


export const getAllUsers = () => {
    return db.collection(USERS_COLLECTION_NAME)
        .get()
        .then(_processRawUsersCollection)
}

export const fetchUserById = (id) => {
    return db.collection(USERS_COLLECTION_NAME).doc(id).get()
        .then((userDocument) => {
            if (userDocument.exists) {
                return _processRawUserDoc(userDocument)
            }
            throw Error('No user')
        })
}

export const createUserById = ({id, displayName, email}) => {
    return db.collection(USERS_COLLECTION_NAME).doc(id).set({
        displayName,
        email,
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
    })
}

export const updateUsersLastLoginTimeById = (id) => {
    return db.collection(USERS_COLLECTION_NAME).doc(id).set({
        lastLoginAt: Date.now(),
    }, {merge: true})
}
