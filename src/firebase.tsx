import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider,signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAj5qa0aKWoQf6xo6_N_8Dy96v9yTE3D8s",
  authDomain: "zealio--yt-setup.firebaseapp.com",
  projectId: "zealio--yt-setup",
  storageBucket: "zealio--yt-setup.appspot.com",
  messagingSenderId: "852750162421",
  appId: "1:852750162421:web:103b4f2454b52d23df28bc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();