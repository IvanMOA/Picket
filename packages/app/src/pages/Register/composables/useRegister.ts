import {ref} from "vue";
import axios from "axios";

export const useRegister = () => {
    const isRegistering = ref(false)
    const register = async (name: string, phoneNumber: string) => {
        isRegistering.value = true
        try {
            const query = `
                mutation {
                    registerVisitor(name: "${name}", phoneNumber: "${phoneNumber}"){
                      id
                      name
                      phoneNumber
                    }
                }`
            await axios.post('/graphql', {
                query
            })
        }catch (e) {
            console.log(e)
        }
        isRegistering.value = false
    }
    return {
        isRegistering,
        register
    }
}