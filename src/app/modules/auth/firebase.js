import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAMvv7X-jtXLdxQsSIxDl3XZs8b1zB7eOs',
  authDomain: 'ascapp-9bbf2.firebaseapp.com',
  projectId: 'ascapp-9bbf2',
  storageBucket: 'ascapp-9bbf2.appspot.com',
  messagingSenderId: '883822384494',
  appId: '1:883822384494:web:49eebd8c5020213b381d7f',
  measurementId: 'G-4WEBFGZCTD',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
