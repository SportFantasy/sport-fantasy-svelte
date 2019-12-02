import db from './db.js'


const _processRawUsers = (rawUsers) => {
  let users = {}
  rawUsers.forEach((doc) => {
      const data = doc.data()
      users[doc.id] = {
        ...data,
        id: doc.id,
      }
  });

  return users
}

export const getAllUsers = () => {
  return db.collection('users')
    .get()
    .then(_processRawUsers);
}

export const getUserById = (id) => {
  return db.collection('users').doc(id).get()
    .then( (userDocument) => {
      if (userDocument.exists) {
        return userDocument.data()
      }
      throw Error('No user')
    })
}

export const createUserById = ({id, displayName, email}) => {
  return db.collection('users').doc(id).set({
    displayName,
    email,
    createdAt: Date.now(),
    lastLoginAt: Date.now(),
  })
}

export const updateUsersLastLoginTimeById = (id) => {
  return db.collection('users').doc(id).set({
    lastLoginAt: Date.now(),
  }, { merge: true })
}
