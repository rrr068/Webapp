import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserProfile } from "../types/UserProfile"

type UserContextType = UserProfile | null

const UserContext = createContext<UserContextType>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/get_user`, {
          headers: {
            "access-token": localStorage.getItem("access-token") || "",
            client: localStorage.getItem("client") || "",
            uid: localStorage.getItem("uid") || "",
          },
        })
        setUser(res.data)
      } catch (err) {
        console.error("ユーザー取得失敗", err)
      }
    }

    fetchUser()
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const user = useContext(UserContext)
  return { user }
}