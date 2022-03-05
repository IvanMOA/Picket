import {ref} from "vue";
import { ConfirmationResult } from "firebase/auth"
export const confirmationResultSharedState = ref<ConfirmationResult | null>(null)