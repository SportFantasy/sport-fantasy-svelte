import db from './db.js'


const _processRawCollection = (rawCollection) => {
  let result = {}

  rawCollection.forEach((doc) => {
      result[doc.id] = _processRawSingle(doc)
  });

  return result
}

const _processRawSingle = (rawDoc) => {
  const data = rawDoc.data()
  return {
    ...data,
    id: rawDoc.id,
  }
}

export const getAllGames = () => {
  return db.collection('games')
    .get()
    .then(_processRawCollection);
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

export const confirmSinglePlayerGame = (gameId, playerNo) => {
  let gamePropToUpdate
  if (playerNo === 1) {
    gamePropToUpdate = 'isConfirmedPlayer1'
  } else if (playerNo === 2) {
    gamePropToUpdate = 'isConfirmedPlayer2'
  } else {
    return Promise.reject(`Invalid playerNo - ${playerNo}`)
  }

  return db.collection('games').doc(gameId).set({
    [gamePropToUpdate]: true,
  }, { merge: true })
}

export const getGameById = (gameId) => {
  return db.collection('games').doc(gameId)
    .get()
    .then(_processRawSingle);
}
