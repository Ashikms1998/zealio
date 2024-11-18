import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { io, Socket } from "socket.io-client";
import { useSocketStore } from "./socketStore";
// const url = process.env.NEXT_PUBLIC_API_URL;
const url = "https://api.zealio.live"

interface userDetails {
  id: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  accessToken: string | null;
  socket: Socket | null;
  isAuthenticated: boolean;
  user: userDetails | null;
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
  setSocket: (socket: Socket | null) => void;
  connectSocket: (userId: string) => void;
}

export const userDetailsStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      isAuthenticated: false,
      user: null,
      socket: null,

      // setSocket: (socket: Socket | null) => {
      //   set({ socket });
      // },
      connectSocket: (userId: string) => {
        console.log("before socket initialization")
        const existingSocket = get().socket;
        console.log("before socket initialization 2")
        if (existingSocket) {
          console.log("Socket already exists");
          return;
        }
        console.log("before socket initialization 3")
        // const newSocket = io(process.env.NEXT_PUBLIC_API_URL, {
        //   query: { userId },
        // });
        const newSocket = io("https://api.zealio.live", {
          query: { userId },
        });

        console.log("before socket initialization 4",newSocket)


        newSocket.on("connect", () => {
          set({ socket: newSocket });
          console.log("Socket connected successfully", newSocket);
        });

        newSocket.on("error", (err) => {
          console.error("Socket connection error:", err);
          set({ socket: null });
        });

        newSocket.on("disconnect", () => {
          console.log("Socket disconnected");
          set({ socket: null });
        });
      },

      //

      login: async (accessToken) => {
        try {
          set({ accessToken, isAuthenticated: true });
          console.log(url,"login in auth store")
          const response = await axios.get<userDetails>(
            `${url}/auth/userDetails`,
            { withCredentials: true }
          );
          console.log("👨‍🎓👨‍🎓👨‍🎓👨‍🎓👨‍🎓👷👷👷👷login response",response)
          const userData = response.data;
          set({
            user: {
              id: userData.id,
              firstName: userData.firstName,
              lastName: userData.lastName,
            },
          });

          // const existingSocket = useSocketStore.getState().socket;
          // if (!existingSocket) {
          //   get().connectSocket(userData.id);
          // }

          get().connectSocket(userData.id);
        } catch (error) {
          console.log("Failed to fetch user data:", error);
          set({
            accessToken: null,
            isAuthenticated: false,
            user: null,
            socket: null,
          });
        }
      },
      logout: () => {
        const { disconnectSocket } = useSocketStore.getState();
        disconnectSocket();
        const socket = get().socket;
        if (socket) {
          socket.disconnect();
          console.log("Socket disconnected during logout");
        }
        set({
          accessToken: null,
          isAuthenticated: false,
          user: null,
          socket: null,
        });
        localStorage.removeItem("zustand-persist");
      },
      setSocket: (socket: Socket | null) => {
        console.log(socket, "This is socket from user");
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
