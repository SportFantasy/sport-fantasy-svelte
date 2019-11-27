import db from './db.js'


const _getCreatedAtTimestamp = (rawCreatedAt) => {
  try {
    return new Date(rawCreatedAt)
  } catch (error) {
    console.log(error)
    return rawCreatedAt
  }
}
const _processRawUsers = (rawUsers) => {
  let users = {}
  rawUsers.forEach((doc) => {
      const data = doc.data()
      users[doc.id] = {
        ...data,
        createdAt: _getCreatedAtTimestamp(data.createdAt)
      }
  });

  return users
}

export const getAllUsers = () => {
  return db.collection('users')
    .get()
    .then(_processRawUsers);
}

export const createUser = ({username, email}) => {
  return db.collection("users").add({
    username,
    email,
    createdAt: Date.now(),
  })
}
