const API_URL = process.env.REACT_APP_API_URL || 'https://blog-backend-xhf5.onrender.com';

console.log('API_URL:', API_URL);

export const getAllBlogs = async () => {
  const response = await fetch(`${API_URL}/blogs`);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return await response.json();
};

export const getBlogById = async (id) => {
  const response = await fetch(`${API_URL}/blogs/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  return await response.json();
};

// New function to increment blog views
export const incrementBlogView = async (id) => {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to increment view');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error incrementing view:', error);
    // Don't throw error here - view counting is not critical functionality
    return null;
  }
};

export const createBlog = async (title, content) => {
  const token = localStorage.getItem('token');
  
  // Debug logging
  console.log('=== CREATE BLOG DEBUG ===');
  console.log('API_URL:', API_URL);
  console.log('Title:', title);
  console.log('Content:', content);
  console.log('Token:', token);
  console.log('Request URL:', `${API_URL}/blogs`);
  
  // Check token expiration
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token expires at:', new Date(payload.exp * 1000));
      console.log('Current time:', new Date());
      console.log('Token expired:', new Date(payload.exp * 1000) < new Date());
    } catch (e) {
      console.error('Error parsing token:', e);
    }
  }
  
  const requestBody = { title, content };
  console.log('Request body:', JSON.stringify(requestBody));
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  console.log('Request headers:', headers);
  
  const response = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody),
  });

  console.log('Response status:', response.status);
  console.log('Response ok:', response.ok);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error(`Failed to create blog: ${response.status} ${errorText}`);
  }

  return await response.json();
};

export const likeBlog = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/blogs/${id}/like`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to like blog');
  }

  return await response.json();
};

export const createReview = async (blogId, content) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/blogs/${blogId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error('Failed to create review');
  }

  return await response.json();
};