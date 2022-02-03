import {reactive, ref} from "vue";
import {graphqlClient} from "@/clients/graphqlClient";
export const useRegister = () => {
    const isRegistering = ref(false)
    const serverFormErrors = reactive<{ errors: { name?: string[], phoneNumber?: string[] } }>({errors: {}})
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
            const {data} = await graphqlClient.post('/graphql', {
                query
            })
            if (data?.errors) {
                serverFormErrors.errors = data.errors
            }
        } catch (e) {
            console.log(e)
        }
        isRegistering.value = false
    }
    return {
        isRegistering,
        register,
        serverFormErrors
    }
}