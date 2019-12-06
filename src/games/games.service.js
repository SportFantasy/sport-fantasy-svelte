import { get } from 'svelte/store';
import { gamesStore } from "./games.store";
import {
    addUsersToGames,
    addGameTypesToGames,
    addResultAndWinnerToGames,
} from "./games.store.helper";
import { usersStore } from "../common/stores/users.store";
import { getAllUsers } from "../common/db/users.js";
import { getAllGames, confirmSinglePlayerGame, getGameById, } from "../common/db/games.js";
import { getAllGameTypes } from "../common/db/gameTypes.js";


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
    let playerNo
    if (gamePlayer1Id === playerId) {
        playerNo = 1
    }
    if (gamePlayer2Id === playerId) {
        playerNo = 2
    }

    return confirmSinglePlayerGame(gameId, playerNo)
        .then(() => getGameById(gameId))
        .then(gamesStore.updateSingleGame)
}


const _getUnconfirmedGamesByUserId = (games, userId) => {
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

export const getUnconfirmedGamesArrByUserId = (userId) => {
    const currentGames = get(gamesStore).games
    const unconfirmedGames = _getUnconfirmedGamesByUserId(currentGames, userId)
    const unconfirmedGamesArr = Object.values(unconfirmedGames)
    return unconfirmedGamesArr
}
