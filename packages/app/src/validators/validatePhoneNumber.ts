export const validatePhoneNumber = (value?: string) => {
    if (!value || value.length === 0) return 'Por favor introduce tu número de celular'
    if (value.length !== 10) return 'La longitud del número de celular es de 10 dígitos'
    return true
}