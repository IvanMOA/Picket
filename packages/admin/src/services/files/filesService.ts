import { apiClient } from "@/clients/apiClient";
export const filesService = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("sections_svg", file);
    const { data } = await apiClient.post(
      "/v1/places/upload-sections-svg",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data.file.filename;
  },
};
