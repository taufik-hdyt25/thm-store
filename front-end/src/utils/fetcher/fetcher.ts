import axios, { AxiosError } from 'axios'
import nookies from 'nookies'
import { redirect}from './redirect-windows'
import 'dotenv/config'

interface IProps{
    ctx: any
    uri: string
    params: any
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
}

const callApi = async ({ctx,method,params,uri}:IProps) => {
    const cookies = nookies.get(ctx)
    const token = cookies?.token
    
    if(!token) {
        redirect({ctx})
    }

    let newParam = {}
    if(["GET", "DELETE"].includes(method)){
        newParam = {params : {...params}}
    }else{
        newParam = {data: {...params}}
    }

    const config = {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: { Authorization: `Bearer ${token}` },
        url: uri,
        method: method,
        ...newParam
    }

    axios.interceptors.response.use(
        function (response){
            return response
        },

        function (error: AxiosError){
            const statusCode = error.response?.status
            if(statusCode === 401){
                nookies.destroy(ctx,"token")
                redirect({ctx})
            }
            console.log(error);
            return Promise.reject(error)
        }
    )

    return axios(config)

}

export default callApi