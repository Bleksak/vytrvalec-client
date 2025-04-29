import axios from "axios";
    
export const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    return (await axios.post("/image", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })).data;
}