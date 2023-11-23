import { makeRequest } from "./makeRequest"

export const session = async (refreshToken:string, callback?: Function) => {
    const { data, error } = await makeRequest<{
        user: {
            email: string;
            first_name: string;
            last_name: string;
            user_name: string;
            role: string;
            image: string;
            user_id: string;
        }, accessToken: string, refreshToken: string}>('/api/auth/session', {
        method: 'POST',
        data: {
            refreshToken
        }
    })

    if(error){
        localStorage.removeItem('token')
        localStorage.removeItem('refresher')
        localStorage.removeItem('user')
        if (typeof callback === 'function') {
            callback(data, error);
            return
        }
        return data
    }

    if(data?.user){
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('refresher', data.refreshToken)
        localStorage.setItem('user', JSON.stringify(data.user))
        if (typeof callback === 'function') {
            callback(data, error);
            return
        }
        return data
    }

    if (typeof callback === 'function') {
        callback(data, error)
        return
    }
    return data

}