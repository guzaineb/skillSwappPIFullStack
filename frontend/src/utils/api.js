// Create a utility function for API calls with error handling
export const fetchWithFallback = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.warn(`Failed to fetch from ${url}:`, error);
    return null; // Return null instead of throwing to prevent app crashes
  }
};