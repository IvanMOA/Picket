import {ref} from "vue";
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth"
import {auth} from "@/services/firebase/firebase";

export const useAskForVerificationCode = () => {
    const isAskingForVerificationCode = ref(false)
    const askForVerificationCode = async (phoneNumber: string) => {
        try {
            const appVerifier = new RecaptchaVerifier("recaptcha_verifier", {size: 'invisible'}, auth)
            return await signInWithPhoneNumber(auth, `+52${phoneNumber}`, appVerifier)
        }catch (e) {
            console.log(e)
        }
    }
    return {
        askForVerificationCode,
        isAskingForVerificationCode
    }
}