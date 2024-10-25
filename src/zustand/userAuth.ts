import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Socket } from "socket.io-client";
const url = process.env.NEXT_PUBLIC_API_URL;

interface userDetails {
  id: string;
}

interface AuthState {
  accessToken: string | null;
  socket: Socket | null;
  isAuthenticated: boolean;
  user: userDetails | null;
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
  setSocket: (socket: Socket | null) => void;
}

export const userDetailsStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      isAuthenticated: false,
      user: null,
      socket: null,
      login: async (accessToken) => {
        try {
          set({ accessToken, isAuthenticated: true });
          const response = await axios.get<userDetails>(
            `${url}/auth/userDetails`,
            { withCredentials: true }
          );
          const userData = response.data;

          set({
            user: {
              id: userData.id,
            },
          });
        } catch (error) {
          console.log("Failed to fetch user data:", error);
          set({
            accessToken: null,
            isAuthenticated: false,
            user: null,
          });
        }
      },
      logout: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
          user: null,
        });
      },
      setSocket: (socket: Socket | null) => {
        set({ socket });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
