import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBm2x9-fOHMc6WDKFNYkc8tvVYJ7aG8fGg",
  authDomain: "albummakerweb.web.app",
  projectId: "albummakerweb",
  storageBucket: "albummakerweb.appspot.com",
  messagingSenderId: "496698893199",
  appId: "1:496698893199:web:b06eccb0fe0c8c965fe1fa"
}

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()

export default firebase