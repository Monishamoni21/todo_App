// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyC6gXXbJ-EvTnFIITpzpCvqSGOCaTaObzo",
  authDomain: "todo-app-53406.firebaseapp.com",
  projectId: "todo-app-53406",
  storageBucket: "todo-app-53406.firebasestorage.app",
  messagingSenderId: "441038990503",
  appId: "1:441038990503:web:7a2caa6580d9c49dc93f82",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
