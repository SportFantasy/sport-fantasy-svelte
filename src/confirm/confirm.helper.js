export const getUnconfirmedGamesByUserId = (games, userId) => {
  let foundGames = {}

  for (let key in games) {
    const game = games[key]
    if (
      ( (game.player1Id === userId) && (!game.isConfirmedPlayer1)) ||
      ( (game.player2Id === userId) && (!game.isConfirmedPlayer2))
    ) {
      foundGames[key] = game
    }
  }

  return foundGames
}
