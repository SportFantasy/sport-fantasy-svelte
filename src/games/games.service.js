import { gamesStore } from "./games.store";
import {
    addUsersToGames,
    addGameTypesToGames,
    addResultAndWinnerToGames,
} from "./games.store.helper";
import { usersStore } from "../common/stores/users.store";
import { getAllUsers } from "../common/db/users.js";
import { getAllGames } from "../common/db/games.js";
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
