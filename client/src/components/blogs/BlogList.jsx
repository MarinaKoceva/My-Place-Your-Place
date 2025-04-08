import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import * as blogService from "../../services/blogService";
import { UserContext } from "../../contexts/UserContext";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const authData = useContext(UserContext);

  useEffect(() => {
    blogService.getAll()
      .then(result => {
        if (Array.isArray(result)) {
          setBlogs(result);
        } else {
          setBlogs([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch blog posts:', err);
        setBlogs([]);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await blogService.remove(id, authData.accessToken);
        setBlogs(prev => prev.filter(blog => blog._id !== id));
      } catch (err) {
        console.error("Error deleting blog post:", err);
      }
    }
  };

  return (
    <section className="blog-list">
      <h2 className="blog-title">Share Your Story</h2>

      {authData._id && (
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Link to="/blog/create" className="btn-create">Create New Story</Link>
        </div>
      )}

      {blogs.length === 0 && <p>No posts available.</p>}

      {blogs.map(blog => (
        <div key={blog._id} className="blog-card">

          <div className="content">
            <h3>{blog.title}</h3>
            <p>{blog.content?.slice(0, 120)}...</p>
            <p className="author">{blog.authorEmail || "Unknown"}</p>
            <Link to={`/blog/${blog._id}`} className="read-more">Read More</Link>

            {authData._id === blog.authorId && (
              <div className="owner-actions">
                <Link to={`/blog/edit/${blog._id}`} className="btn-edit">Edit</Link>
                <button className="btn-delete" onClick={() => handleDelete(blog._id)}>Delete</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
