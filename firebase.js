import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBBY5FU6wJQrffIceYuAkhXInju2dnySaY',
  authDomain: 'whatsapp-clone-ea253.firebaseapp.com',
  projectId: 'whatsapp-clone-ea253',
  storageBucket: 'whatsapp-clone-ea253.appspot.com',
  messagingSenderId: '59173028800',
  appId: '1:59173028800:web:bd58ccdec5587cab7e3e25'
}
console.log(firebase)
const app = !firebase.apps?.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

export const db = app.firestore()
export const auth = app.auth()
export const provider = new firebase.auth.GoogleAuthProvider()
