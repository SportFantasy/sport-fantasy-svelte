import FIREBASE_CONFIG from './firebaseConfig'


const initDb = () => {
  firebase.initializeApp(FIREBASE_CONFIG);
  firebase.analytics();

  return firebase.firestore()
}

const db = initDb()

export default db
