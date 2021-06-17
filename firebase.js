import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAW466gLqffGqAU-NHP3nlh4dXtb8Jke-o',
  authDomain: 'networkagain-next.firebaseapp.com',
  projectId: 'networkagain-next',
  storageBucket: 'networkagain-next.appspot.com',
  messagingSenderId: '693134660136',
  appId: '1:693134660136:web:efe85c405f509a3c93db1d',
  measurementId: 'G-927JN2WJ7T'
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()
const storage = firebase.storage()

export { db, storage }
