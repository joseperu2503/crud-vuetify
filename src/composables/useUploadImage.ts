
import { imagesApi } from '@/api/imagesApi';
import { ImageUploadResponse } from '@/interfaces/image.interface';

export function useUploadImage() {
  let folderName = process.env.VUE_IMAGES_FOLDER_NAME ?? 'crud_vuetify'

  const uploadImage = async (image: File): Promise<ImageUploadResponse> => {
    try {
      let formData = new FormData();
      formData.append("image", image);
      formData.append("folder_name", folderName);
      let response = await imagesApi.post<ImageUploadResponse>(`/upload_image`, formData)
      return response.data;
    } catch (error) {
      throw new Error("An error occurred while uploading the photo.");
    }
  }

  return {
    uploadImage,
  }
}
