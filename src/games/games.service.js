import { get } from 'svelte/store';
import { gamesStore } from "./games.store";
import {
    addUsersToGames,
    addGameTypesToGames,
    addResultAndWinnerToGames,
} from "./games.store.helper";
import { usersStore } from "../user/users.store";
import { getAllUsers } from "../common/db/users.js";
import { getAllGames, confirmSinglePlayerGame, getGameById, } from "../common/db/games.js";
import { getAllGameTypes } from "../common/db/gameTypes.js";
import {
    getUnconfirmedGamesByUserId,
    getConfirmedGamesByUserId,
    getGamesByGameTypeId,
    filterOutUnconfirmedGames,
} from './games.store.helper'
import _filter from 'lodash/filter';


const _fetchAllGamesAndUsersData = () => {
    return Promise.all([getAllUsers(), getAllGameTypes(), getAllGames()])
}

const _setGamesAndUsersStore = ([users, gameTypes, games]) => {
    const gamesWithUsers = addUsersToGames(games, users);
    const gamesWithTypes = addGameTypesToGames(gamesWithUsers, gameTypes);
    const gamesWithWinners = addResultAndWinnerToGames(gamesWithTypes);

    usersStore.setUsers(users);
    gamesStore.setGameTypes(gameTypes);
    gamesStore.setGames(gamesWithWinners);
};


export const fetchAndInitGamesData = () => {
    return _fetchAllGamesAndUsersData().then(_setGamesAndUsersStore);
}

export const confirmGameByPlayerId = (gameId, gamePlayer1Id, gamePlayer2Id, playerId) => {
  console.log({gameId, gamePlayer1Id, gamePlayer2Id, playerId})
    let playerNo
    if (gamePlayer1Id === playerId) {
        playerNo = 1
    }
    if (gamePlayer2Id === playerId) {
        playerNo = 2
    }

    return confirmSinglePlayerGame(gameId, playerNo)
        .then(() => getGameById(gameId))
        .then((game) => {
          console.log(game)
          return game
        })
        .then(gamesStore.updateSingleGame)
}

export const getConfirmedGamesArrByUserId = (currentGames, userId) => {
    const confirmedGamesObject = getConfirmedGamesByUserId(currentGames, userId)
    return Object.values(confirmedGamesObject)
}

export const getUnconfirmedGamesArrByUserId = (currentGames, userId) => {
    const unconfirmedGamesObject = getUnconfirmedGamesByUserId(currentGames, userId)
    return Object.values(unconfirmedGamesObject)
}

export const getConfirmedGamesByGameTypeId = (selectedGameTypeId) => {
    const currentGames = get(gamesStore).games
    const confirmedGames = filterOutUnconfirmedGames(currentGames)
    const gameTypeId = (selectedGameTypeId !== 'all') ? selectedGameTypeId : undefined
    const filteredGames = getGamesByGameTypeId(
        confirmedGames,
        gameTypeId,
    );
    return Object.values(filteredGames)
}

export const reloadAllDataAndGetConfirmedGamesByGameTypeId = (selectedGameTypeId) => {
    return fetchAndInitGamesData()
      .then( () => getConfirmedGamesByGameTypeId(selectedGameTypeId) )
}



const getGamesByUserId = (games, userId) => {
    let filteredGames = {}

    const foundGames = _filter(games, (game) => {
        return (
            (game.player1Id === userId) ||
            (game.player2Id === userId)
        )
    })
    if (foundGames && foundGames.length) {
        foundGames.forEach(foundGame => {
            filteredGames[foundGame.id] = foundGame
        })
    }

    return filteredGames
}



/* TOP SCORES */
const getSortedGamesByGameTypeId = (gameTypes, games) => {
    let result = {}

    for (let gameTypeId in gameTypes) {
        const foundGames = _filter(games, { gameTypeId })
        result[gameTypeId] = foundGames
    }

    return result
}

const addGamesByTypeToUser = (user, games, gameTypes) => {
    const userId = user.id
    const userGames = getGamesByUserId(games, userId)
    const sortedGames = getSortedGamesByGameTypeId(gameTypes, userGames)

    let sortedGamesWithTotalScore = {}
    for (let gameTypeId in sortedGames) {
        const typeGames = sortedGames[gameTypeId]
        const totalScore = getSumScoreFromGamesByUserId(typeGames, userId)
        sortedGamesWithTotalScore[gameTypeId] = {
            games: typeGames,
            totalScore,
        }
    }

    return {
        ...user,
        sortedGames: sortedGamesWithTotalScore,
    }
}

const getSumScoreFromGamesByUserId = (games = {}, userId) => {
    const gamesArr = Object.values(games)
    const totalScore = gamesArr.reduce( (total, game) => {
        let relevantScore
        if (game.player1Id === userId) {
            relevantScore = game.player1Score
        }
        if (game.player2Id === userId) {
            relevantScore = game.player2Score
        }
        return total + relevantScore
    }, 0 )

    return totalScore
}

const getScoresPerGameTypesFromUsers = (usersWithSortedGames, allGameTypes) => {
    let result = {}

    for (let userId in usersWithSortedGames) {
        const user = usersWithSortedGames[userId]

        for (let gameTypeId in user.sortedGames) {
            const gameType = user.sortedGames[gameTypeId]
            const extendedUser = {
                ...user,
                totalScore: gameType.totalScore,
            }

            result[gameTypeId] = {
                ...allGameTypes[gameTypeId],
                ...result[gameTypeId],
                users: [
                    ...(result[gameTypeId] && result[gameTypeId].users || []),
                    extendedUser
                ],
            }
        }
    }

    return result
}

const getSortedUsersPerScores = (topScores) => {
    let result = {}

    for (let gameTypeId in topScores) {
        const gameType = topScores[gameTypeId]
        const sortedUsers = gameType.users.sort( (a, b) => {
            return (b.totalScore - a.totalScore)
        })
        result[gameTypeId] = {
            ...gameType,
            sortedUsers,
        }
    }

    return result
}

export const getTopScores = () => {
    let result = {}

    const { users } = get(usersStore)
    const { games, gameTypes } = get(gamesStore)
    const confirmedGames = filterOutUnconfirmedGames(games)

    for (let userId in users) {
        const user = users[userId]
        const userWithGames = addGamesByTypeToUser(user, confirmedGames, gameTypes)
        result[userId] = userWithGames
    }

    const topScoresPerGameType = getScoresPerGameTypesFromUsers(result, gameTypes)
    const sortedTopScoresPerGameType = getSortedUsersPerScores(topScoresPerGameType)
    return sortedTopScoresPerGameType
}

/* END TOP SCORES */
