import { gamesStore } from "./games.store";
import { usersStore } from "./users.store";
import { getAllUsers } from "../db/users.js";
import { getAllGames } from "../db/games.js";
import { getAllGameTypes } from "../db/gameTypes.js";
import {
  addUsersToGames,
  addGameTypesToGames,
  addResultAndWinnerToGames,
} from "./games.store.helper";


const _getGamesData = () => {
  return Promise.all([getAllUsers(), getAllGameTypes(), getAllGames()])
}

const _setGamesStore = ([users, gameTypes, games]) => {
  const gamesWithUsers = addUsersToGames(games, users);
  const gamesWithTypes = addGameTypesToGames(gamesWithUsers, gameTypes);
  const gamesWithWinners = addResultAndWinnerToGames(gamesWithTypes);

  usersStore.setUsers(users);
  gamesStore.setGameTypes(gameTypes);
  gamesStore.setGames(gamesWithWinners);
};


export const getInitialData = () => {
  return _getGamesData().then(_setGamesStore);
}
