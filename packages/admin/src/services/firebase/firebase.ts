import { initializeApp  } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
export const app = initializeApp({
    apiKey: "AIzaSyA_0uBxIXWWQ15crVdHCZ_P_mJW9VQryCQ",
    authDomain: "prueba-b9777.firebaseapp.com",
    storageBucket: "prueba-b9777.appspot.com",
    messagingSenderId: "951470505272",
    appId: "1:951470505272:web:004591dc0e713e3bdbd5cd",
    measurementId: "G-20SSKY0N3G",
    projectId: 'demo-events'
})
export const auth = getAuth(app)
connectAuthEmulator(auth, 'http://localhost:9099')