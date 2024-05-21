import { ZodLoginResponse } from '@/response'
import { BackEndRoutes, HttpMethods } from '@/constants'

export class User {
    private constructor(
        readonly name: string,
        readonly username: string
    ) {}

    /**
     * A utility function which will return an empty User object.
     */
    public static empty() {
        return new User('', '')
    }

    /**
     * Checks whether the user on which this is invoked is empty or not.
     * @returns true if the user is empty, else returns false.
     */
    public isEmpty() {
        return this.name === '' || this.username === ''
    }

    public static async login(username: string, password: string) {
        const response = await fetch(BackEndRoutes.Login, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: HttpMethods.Post,
            body: JSON.stringify({
                username,
                password
            })
        })
        const data = await response.json()
        const loginResponse = ZodLoginResponse.parse(data)
        const createdUser = new User(loginResponse.user.name, loginResponse.user.username)
        return createdUser
    }

    /**
     * Utility function which sends request to the backend and registers a new user.
     * @param name
     * @param email
     * @param username
     * @param password
     * @returns true is the user is successfully registered, else returns false.
     */
    public static async register(name: string, email: string, username: string, password: string) {
        try {
            const response = await fetch(BackEndRoutes.Register, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: HttpMethods.Post,
                body: JSON.stringify({
                    name,
                    email,
                    username,
                    password
                })
            })
            const data = await response.json()
            console.log(data)
            return Promise.resolve(true)
        } catch (error) {
            return Promise.reject(false)
        }
    }

    public static async logout() {
        const response = await fetch(BackEndRoutes.Logout)
        const data = await response.json()
        console.log(data)
        if (response.status >= 400) {
            throw new Error('could not logout from server')
        }
    }
}
