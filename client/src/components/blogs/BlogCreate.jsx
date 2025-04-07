import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import * as blogService from "../../services/blogService";

export default function BlogCreate() {
  const navigate = useNavigate();
  const authData = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required.");
      return;
    }

    const newBlogPost = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      authorId: authData._id,
      authorEmail: authData.email, // 👈 използваме имейл
    };

    try {
      await blogService.create(newBlogPost, authData.accessToken);
      navigate("/blog");
    } catch (err) {
      console.error("Error creating blog post:", err);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <section className="blog-create">
      <h2>Create New Blog Post</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          id="content"
          rows="10"
          value={formData.content}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="btn-create">Publish</button>
      </form>
    </section>
  );
}
