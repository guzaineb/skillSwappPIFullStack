const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('/api/auth/login', credentials);
    if (response.data.success) {
      const userData = response.data.user;
      useAuthStore.getState().setUser(userData); // Ceci déclenchera aussi connectSocket
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};