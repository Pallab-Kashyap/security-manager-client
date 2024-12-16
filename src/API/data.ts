import { Data } from "../constants"
import axiosInstance from "../services/axios";

interface Response {
    data: Data
}

interface Res1{
    data: Data[]
}


const getData = async() => {
    
try {
    
    const res = await axiosInstance.get<Res1>('/data')
        return res.data.data
} catch (error) {
return false
}

}

const createData = async(data: Data) => {

    try {

        data._id = undefined

        const res = await axiosInstance.post<Response>('/data', data)

            return {
                status: true,
                data: res.data.data
            }
    
    } catch (error: any) {
    return {
        status: false,
        message:error.response.data.message
    }
    }

}

const updateData = async(data: Data) => {

    try {
        console.log(data);
        const url = `/data/${data._id}`

        const res = await axiosInstance.put<Response>(url, data)
        return {
            status: true,
            data: res.data.data,
        }
    } catch (error: any) {
        return {
            status: false,
            message:error.response.data.message
        }

}
}

const deleteData = async( id: string) => {
    try{
        const url = `/data/${id}`
        await axiosInstance.delete(url)

        return true
    }
    catch{
        return false
    }
}

export {
    getData,
    createData,
    updateData,
    deleteData
}

// {
//     message: "strimg",
//     data: Array, json   
// }