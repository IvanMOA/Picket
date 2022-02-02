import * as admin from "firebase-admin"
export const firebaseProjectId = 'demo-events'
const app = admin.initializeApp({
    projectId: firebaseProjectId
})
export const auth = app.auth()
const firebaseActiveEmulators = process.env.FIREBASE_ACTIVE_EMULATORS ?? ''
if(firebaseActiveEmulators.includes('auth')){
    console.log("Using Firebase Auth emulators")
    process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099"
}