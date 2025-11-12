import { getToken } from "@/utils/auth/secureStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthIndex() {
  const router = useRouter();

  const checkIfUserHasAValidToken = async () => {
    const token = await getToken(process.env.EXPO_PUBLIC_TOKEN_KEY!);

    if (token) router.push("/welcome-back");
    else router.push("/login");
  };

  useEffect(() => {
    checkIfUserHasAValidToken();
  }, []);
}

