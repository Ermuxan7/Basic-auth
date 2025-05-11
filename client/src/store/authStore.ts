import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_PROD;
axios.defaults.withCredentials = true;

type FormData = {
  name: string;
  email: string;
  password: string;
};

interface AuthState {
  loading: boolean;
  success: boolean;
  error: string | null;
  register: (formData: FormData) => Promise<boolean>;
  login: (formData: FormData) => Promise<boolean>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  success: false,
  register: async (formData: FormData) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      set({ loading: false, success: true });
      console.log("Registration successful:", response.data);

      return true;
    } catch (error: any) {
      console.error("Error during registration:", error);
      set({
        loading: false,
        success: false,
        error: error.response?.data?.message,
      });
      return false;
    }
  },
  login: async (formData: FormData) => {
    set({ loading: true, error: null, success: false });

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });

      set({ loading: false, success: true });
      console.log("Login successful:", response.data);
      return true;
    } catch (error: any) {
      console.error("Error during login:", error);
      set({
        loading: false,
        success: false,
        error: error.response?.data?.message,
      });
      return false;
    }
  },
  logout: async () => {
    set({ loading: true, success: false, error: null });

    try {
      const response = await axios.post(`${API_URL}/logout`);

      set({ loading: true, success: false });
      console.log("Logout successful:", response.data);
    } catch (error: any) {
      console.error("Error during logout:", error);
      set({
        loading: false,
        success: false,
        error: error.response?.data?.message,
      });
    }
  },
  getUser: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/user`);

      set({ loading: true });
      console.log("User data fetched successfully:", response.data);
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      set({ loading: false, error: error.response?.data?.message });
    }
  },
}));

export default useAuthStore;
