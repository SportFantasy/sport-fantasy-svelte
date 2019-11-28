import db from './db.js'


const _processRaw = (raw) => {
  let result = {}

  raw.forEach((doc) => {
      const data = doc.data()
      result[doc.id] = {
        ...data,
        id: doc.id,
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

export const createNewGame = ({
  gameTypeId,
  player1Id,
  player2Id,
  player1Score = null,
  player2Score = null,
  datePlayed = Date.now(),
  isConfirmedPlayer1 = false,
  isConfirmedPlayer2 = false,
}) => {
  return db.collection('games').add({
    gameTypeId,
    player1Id,
    player2Id,
    player1Score,
    player2Score,
    datePlayed,
    isConfirmedPlayer1,
    isConfirmedPlayer2,
  })
}
