
import axiosInstance from "../services/axios"

export interface AuthData {
    username: string,
    password: string,
}

const login = async( username: string, password: string) => {

try {
       
        const data = { username, password}
        const res = await axiosInstance.post<any>('/user/login', data)
        if(res.status === 200 || res.status ===201)
            return {status: true,  message: res.data.message}

        return {
            status: false,
            message: res.data.message
        }
} catch (error: any) {
 

        return {
            status: false,
            message: error.response.data.message || 'An error occurred',
        };

}

    
}

const signup = async( username: string, password: string) => {

    
try {
        const data = { username, password}
        const res = await axiosInstance.post<any>('/user/register', data)
        if(res.status === 200 || res.status ===201)
            return {status: true,  message: res.data.message}

    

        return {
            status: false,
            message: res.data.message
        }
} catch (error) {
    return {
        status: false,
        message: error
    }
}

}

const logout = async () => {
    try {
        await axiosInstance.get('/user/logout')

        return true
    } catch (error) {
        return false
    }
}

const deleteUser = async () => {
    try {
        await axiosInstance.delete('/user/delete')
        return true
    } catch (error) {
        return false
    }
}

export {
    login,
    signup,
    logout,
    deleteUser
}