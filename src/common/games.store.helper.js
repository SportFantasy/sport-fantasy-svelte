import _filter from 'lodash/filter'


export const addUsersToGames = (games, users) => {
  let enhancedGames = {}

  for (let gameId in games) {
    let game = games[gameId]
    let player1
    let player2
    let winner

    for (let key in game) {
      if (key === 'player1Id') {
        let player1Id = game[key]
        player1 = users[player1Id]
        player1['id'] = player1Id
      }

      if (key === 'player2Id') {
        let player2Id = game[key]
        player2 = users[player2Id]
        player2['id'] = player2Id
      }

      if (key === 'winnerId') {
        let winnerId = game[key]
        winner = users[winnerId]
        winner['id'] = winnerId
      }
    }

    const enhancedGame = {
      ...game,
      player1,
      player2,
      winner,
    }

    delete enhancedGame.player1Id
    delete enhancedGame.player2Id
    delete enhancedGame.winnerId

    enhancedGames = {
      ...enhancedGames,
      [gameId]: enhancedGame,
    }
  }

  return enhancedGames
}

export const addGameTypesToGames = (games, gameTypes) => {
  let enhancedGames = {}

  for (let gameId in games) {
    let game = games[gameId]
    let gameType

    for (let key in game) {
      if (key === 'gameTypeId') {
        let gameTypeId = game[key]
        gameType = gameTypes[gameTypeId]
      }
    }

    const enhancedGame = {
      ...game,
      gameType,
    }

    delete enhancedGame.gametype

    enhancedGames = {
      ...enhancedGames,
      [gameId]: enhancedGame,
    }
  }

  return enhancedGames
}

export const getGamesByGameTypeId = (games, gameTypeId) => {

  if (!gameTypeId) {
    return games
  }

  let filteredGames = {}

  const foundGames = _filter(games, {gameTypeId})
  if (foundGames && foundGames.length) {
    foundGames.forEach(foundGame => {
      filteredGames[foundGame.id] = foundGame
    })
  }

  return filteredGames
}
