import db from './db.js'


const _processRaw = (raw) => {
  let result = {}

  raw.forEach((doc) => {
      const data = doc.data()
      result[doc.id] = {
        ...data,
        gameTypeId: data.gametype.id,
        player1Id: data.player1.id,
        player2Id: data.player2.id,
      }
  });

  return result
}

export const getAllGames = () => {
  return db.collection('games')
    .get()
    .then(_processRaw);
}
