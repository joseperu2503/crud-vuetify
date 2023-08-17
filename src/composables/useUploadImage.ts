
import { imagesApi } from '@/http/imagesApi';
import { ImageUploadResponse } from '@/interfaces/image.interface';

export function useUploadImage() {
  const uploadImage = async (image: File): Promise<ImageUploadResponse> => {
    let formData = new FormData();
    formData.append("image", image);
    let response = await imagesApi.post<ImageUploadResponse>(`/upload_image`, formData)
    return response.data;
  }

  return {
    uploadImage,
  }
}
