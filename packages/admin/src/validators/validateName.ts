export const validateName = (value?: string) => {
    if (!value || value.length === 0) return 'Por favor introduce tu nombre'
    if (value.length < 10) return 'Tu nombre debe contener al menos 10 caractéres'
    if (value.length > 100) return 'Tu nombre no debe contener más de 100 caractéres'
    return true
}