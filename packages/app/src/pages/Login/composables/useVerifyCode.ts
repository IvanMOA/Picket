import {ref} from "vue";
import firebase from "firebase/compat";
import {confirmationResultSharedState} from "@/pages/Login/confirmationResult";
export const useVerifyCode = () => {
    const isVerifyingCode = ref(false)
    const verifyCode = async (code: string) => {
        isVerifyingCode.value = true
        try {
            await confirmationResultSharedState.value!.confirm(code)
        } catch (e) {
            console.log(e)
        }
        isVerifyingCode.value = false
    }
    return {
        isVerifyingCode,
        verifyCode
    }
}