const API_URL = 'https://blog-backend-xhf5.onrender.com';

export const login = async (username, password) => {
  console.log('Sending login request:', { username, password: '*'.repeat(password.length) });
  
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  console.log('Login response status:', response.status);

  if (!response.ok) {
    let errorMessage = 'Login failed';
    try {
      const errorData = await response.json();
      console.log('Login error response:', errorData);
      // Check for both 'error' and 'message' fields
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      console.log('Could not parse login error response as JSON');
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const register = async (username, email, password) => {
  console.log('Sending registration request:', { username, email, password: '*'.repeat(password.length) });
  
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  console.log('Registration response status:', response.status);

  if (!response.ok) {
    let errorMessage = 'Registration failed';
    try {
      const errorData = await response.json();
      console.log('Registration error response:', errorData);
      // Check for both 'error' and 'message' fields to handle Flask backend
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      console.log('Could not parse registration error response as JSON');
      // If we can't parse as JSON, try to get the raw text
      try {
        const errorText = await response.text();
        console.log('Registration error response (text):', errorText);
        if (errorText) {
          errorMessage = errorText;
        }
      } catch (textError) {
        console.log('Could not get error response as text either');
      }
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};

// Blog-related API calls
export const createBlog = async (title, content, token) => {
  console.log('Creating blog with token:', token ? 'Token present' : 'No token');
  
  const response = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  console.log('Blog creation response status:', response.status);

  if (!response.ok) {
    let errorMessage = `Blog creation failed (${response.status})`;
    try {
      const errorData = await response.json();
      console.log('Blog creation error response:', errorData);
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      console.log('Could not parse blog creation error response as JSON');
      try {
        const errorText = await response.text();
        console.log('Blog creation error response (text):', errorText);
        errorMessage = errorText || errorMessage;
      } catch (textError) {
        console.log('Could not get error response as text either');
      }
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const getBlogs = async () => {
  console.log('Fetching blogs...');
  
  const response = await fetch(`${API_URL}/blogs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log('Get blogs response status:', response.status);

  if (!response.ok) {
    let errorMessage = `Failed to fetch blogs (${response.status})`;
    try {
      const errorData = await response.json();
      console.log('Get blogs error response:', errorData);
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      console.log('Could not parse get blogs error response as JSON');
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const getBlog = async (blogId) => {
  console.log('Fetching blog with ID:', blogId);
  
  const response = await fetch(`${API_URL}/blogs/${blogId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log('Get blog response status:', response.status);

  if (!response.ok) {
    let errorMessage = `Failed to fetch blog (${response.status})`;
    try {
      const errorData = await response.json();
      console.log('Get blog error response:', errorData);
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      console.log('Could not parse get blog error response as JSON');
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const likeBlog = async (blogId, token) => {
  console.log('Liking blog with ID:', blogId);
  
  const response = await fetch(`${API_URL}/blogs/${blogId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  console.log('Like blog response status:', response.status);

  if (!response.ok) {
    let errorMessage = `Failed to like blog (${response.status})`;
    try {
      const errorData = await response.json();
      console.log('Like blog error response:', errorData);
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      console.log('Could not parse like blog error response as JSON');
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const createReview = async (blogId, content, token) => {
  console.log('Creating review for blog ID:', blogId);
  
  const response = await fetch(`${API_URL}/blogs/${blogId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  console.log('Create review response status:', response.status);

  if (!response.ok) {
    let errorMessage = `Failed to create review (${response.status})`;
    try {
      const errorData = await response.json();
      console.log('Create review error response:', errorData);
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      console.log('Could not parse create review error response as JSON');
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};