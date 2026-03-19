import { type AxiosInstance } from "axios";

export const uploadImage = async (api: AxiosInstance, image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  return (await api.post("/image", formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })).data;
}