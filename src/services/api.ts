import axios from "axios";

import useAuthStore from "@/store/useAuthStore";

export const api = axios.create({
  baseURL: `${process.env.EXPO_API_URL}`,
});

api.defaults.headers.common.Authorization = `Bearer ${useAuthStore.getState().token}`;
