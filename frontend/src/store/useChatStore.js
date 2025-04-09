import axios from 'axios';

const API_URL = 'http://localhost:5000/api/messages'; // 🔁 Remplace PORT par ton port backend

// 1. Get Users for Sidebar
export const getUsersForSidebar = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('❌ Error fetching users:', err.message);
    return [];
  }
};

// 2. Get Messages between me and another user
export const getMessages = async (userToChatId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${userToChatId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('❌ Error fetching messages:', err.message);
    return [];
  }
};

// 3. Send a message (text/image)
export const sendMessage = async (senderId, messageData, token) => {
  try {
    const response = await axios.post(`${API_URL}/send/${senderId}`, messageData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('❌ Error sending message:', err.message);
    return null;
  }
};
