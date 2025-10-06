import { useMutation } from "@tanstack/react-query";

import axios from "axios";

export const useUploadFileMutation = () => {
  return useMutation({
    mutationFn: async (data: any): Promise<any> => {
      return await axios.create({
        baseURL: `${process.env.EXPO_PUBLIC_API_UPLOAD_FILE_URL}`,
      }).post(data);
    },
  });
};

