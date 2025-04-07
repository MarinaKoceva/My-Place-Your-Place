const baseUrl = 'http://localhost:3030/data/blogs';

export async function getAll() {
    const res = await fetch('http://localhost:3030/data/blogs');
    const result = await res.json();
  
    // гарантираме, че е масив
    if (!Array.isArray(result)) {
      return []; // или throw new Error("Blog fetch failed")
    }
  
    return result;
  }

export async function getOne(id) {
  const res = await fetch(`${baseUrl}/${id}`);
  return res.json();
}

export async function create(blogData, token) {
    const response = await fetch('http://localhost:3030/data/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify(blogData),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create blog post');
    }
  
    return response.json();
  }

export async function remove(id, token) {
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'X-Authorization': token,
    },
  });
}

export async function update(id, data, token) {
    const res = await fetch(`http://localhost:3030/data/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  }
