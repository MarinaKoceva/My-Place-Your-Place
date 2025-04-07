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

  return (
    <section className="blog-list">
      <h2>Blog</h2>

      {authData._id && (
        <div style={{ marginBottom: '1rem' }}>
          <Link to="/blog/create" className="btn-create">Create New Post</Link>
        </div>
      )}

      {blogs.length === 0 && <p>No posts available.</p>}

      {blogs.map(blog => (
        <div key={blog._id} className="blog-card">
          <h3>{blog.title}</h3>
          <p>by {blog.authorEmail || "Unknown"}</p>
          <Link to={`/blog/${blog._id}`}>Read More</Link>
        </div>
      ))}
    </section>
  );
}
