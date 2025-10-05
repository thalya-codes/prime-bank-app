import useAuthStore from "@/store/useAuthStore";
import * as SecureStore from "expo-secure-store";

export async function saveToken(key: string, token: string) {
  try {
    await SecureStore.setItemAsync(key, token);
    console.log("Token saved successfully!");
    useAuthStore.setState({ token });
  } catch (error) {
    console.error("Error saving token:", error);
  }
}

export async function getToken(key: string) {
  try {
    const token = await SecureStore.getItemAsync(key);
    if (token) {
      console.log("Retrieved token:", token);
      useAuthStore.setState({ token });
      return token;
    } else {
      console.log("No token found.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
}

export async function deleteToken(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log("Token deleted successfully!");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
}
