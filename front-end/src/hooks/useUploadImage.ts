import { API } from "@/libs/API"
import { useMutation } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"
import { useAuth } from "./useAuth"

interface IProps{
    onSuccess? :  ((data: any, variables: void, context: unknown) => unknown) | undefined
    onError?: ((error: Error, variables: void, context: unknown) => unknown) | undefined
}
export const useUploadImage = ({onSuccess,onError}: IProps)=> {
    const {token} = useAuth()
    // post image
    const [selectedFile,setSelectedFile] = useState<any>("")
    // source link src image
    const [selectedImageFile,setSelectedImageFile] = useState<string>("")

    function handleChangeImage(e:ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){
            setSelectedFile(e.target.files[0])
            const imageUrl = URL.createObjectURL(e.target.files[0])
            setSelectedImageFile(imageUrl)
        }
    }
    

    const formData = new FormData()
    formData.append("image", selectedFile)
    const {mutate: uploadImage, isPending:loadingUploadImage} = useMutation({
        mutationFn: async ()=> {
            const response = await API.post("/upload",formData ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        },
        onSuccess: onSuccess,
        onError: onError
    })   


    return {
        handleChangeImage,
        selectedImageFile,
        uploadImage,

        setSelectedImageFile,
        setSelectedFile,
        selectedFile,
        loadingUploadImage,
    }
}