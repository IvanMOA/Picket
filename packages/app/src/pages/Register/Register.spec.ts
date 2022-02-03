import Register from "./Register.vue"
import {render, screen} from "@testing-library/vue";
import userEvent from "@testing-library/user-event"
import {graphqlClient} from "../../clients/graphqlClient";
jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: jest.fn()
    })
}))
const graphqlClientPostSpy = jest.spyOn(graphqlClient, 'post')
describe("Register", () => {
    let nameInput: HTMLElement, phoneNumberInput: HTMLElement, submitBtn: HTMLElement
    beforeEach(() => {
        const {unmount} = render(Register)
        nameInput = screen.getByTestId('name-input')
        phoneNumberInput = screen.getByTestId('phone-number-input')
        submitBtn = screen.getByRole('button', {name: /registrarse/i})
    })
    // Phone number | Is valid
    const phoneNumberValidationTable: [string, 'is valid' | 'is not valid'][] = [
        ['', 'is not valid'],
        ['123456789', 'is not valid'],
        ['12345678901', 'is not valid'],
        ['8124337743', 'is valid']
    ]
    it.each(phoneNumberValidationTable)("In the form, when entering the phone number '%s' it %s", async (phoneNumber, result) => {
        graphqlClientPostSpy.mockResolvedValue({})
        if (phoneNumber)
            await userEvent.type(phoneNumberInput, phoneNumber)
        await userEvent.type(nameInput, 'Axel Ivan Morales Ortega')
        await userEvent.click(submitBtn)
        if (result === 'is not valid')
            expect(screen.getByRole('alert')).toBeDefined()
    });
    // Name | Is valid
    const nameValidationTable: [string, 'is valid' | 'is not valid'][] = [
        ['', 'is not valid'],
        ['Axel', 'is not valid'],
        ['Axel Ivan Morales', 'is valid'],
        ['very large name'.repeat(10), 'is not valid']
    ]
    it.each(nameValidationTable)("In the form, when entering the name '%s' it %s", async (name, result) => {
        graphqlClientPostSpy.mockResolvedValue({})
        if (name)
            await userEvent.type(nameInput, name)
        await userEvent.type(phoneNumberInput, '8124337743')
        await userEvent.click(submitBtn)
        if (result === 'is not valid')
            expect(screen.getByRole('alert')).toBeDefined()
    });
    it("Shows an error sent by the api", async () => {
        await userEvent.type(nameInput, 'Axel Ivan Morales Ortega')
        await userEvent.type(phoneNumberInput, '8124337743')
        const error = 'Este número de celular ya está registrado';
        graphqlClientPostSpy.mockResolvedValue({data: {errors: {phoneNumber: [error]}}})
        await userEvent.click(submitBtn)
        expect(screen.getByRole('alert')).toHaveTextContent(error)
    })
});
