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

export const getConfirmedGamesArrByUserId = (userId) => {
    const currentGames = get(gamesStore).games
    const confirmedGamesObject = getConfirmedGamesByUserId(currentGames, userId)
    return Object.values(confirmedGamesObject)
}

export const getUnconfirmedGamesArrByUserId = (userId) => {
    const currentGames = get(gamesStore).games
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
