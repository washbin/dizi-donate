import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";

export default function IndexLogin() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href={"/(tabs)/home"} />;
  }

  return <Redirect href={"/login"} />;
}
