import db from './db.js'


const _processRaw = (raw) => {
  let result = {}
  raw.forEach((doc) => {
      const data = doc.data()
      result[doc.id] = {
        ...data,
        id: doc.id,
      }
  });

  return result
}

export const getAllGameTypes = () => {
  return db.collection('gametypes')
    .get()
    .then(_processRaw);
}
