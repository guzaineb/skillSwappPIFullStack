import { create } from "zustand";
import axios from "axios";

const API_URL = "/api/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

	
    

	forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forget-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({ isLoading: false, error: error.response?.data?.message || "Error sending reset password email" });
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({ isLoading: false, error: error.response?.data?.message || "Error resetting password" });
			throw error;
		}
	},
}));
export default useAuthStore ;