import { useEffect, useState } from "react";
import axios from "axios";

export const useUser = () => {
  const [userId, setUserId] = useState<{ id: number, name: string } | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/get_user_id`, {
          headers: {
            "access-token": localStorage.getItem("access-token") || "",
            client: localStorage.getItem("client") || "",
            uid: localStorage.getItem("uid") || "",
          },
        });

        setUserId(response.data);
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました", error);
      }
    };
    fetchUser();
  }, []);
  return userId
}