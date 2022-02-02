import {createRouter, createWebHistory} from 'vue-router'
import Register from "@/pages/Register/Register.vue"
import Login from "@/pages/Login/Login.vue"
import AskForVerificationCode from "@/pages/Login/AskForVerificationCode.vue"
import VerifyCode from "@/pages/Login/VerifyCode.vue"
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/register',
            component: Register,
            meta: {
                title: 'Register',
            },
        },
        {
            name: 'Login',
            path: '/login',
            component: Login,
            children: [
                {
                    name: 'AskForVerificationCode',
                    path: 'ask-for-verification-code',
                    component: AskForVerificationCode
                },
                {
                    name: 'VerifyCode',
                    path: 'verify-code',
                    component: VerifyCode
                }
            ],
            meta: {
                title: 'Login',
            },
        },
    ],
})

export default router
