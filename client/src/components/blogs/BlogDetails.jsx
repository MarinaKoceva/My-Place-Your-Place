import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import * as blogService from "../../services/blogService";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authData = useContext(UserContext);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    blogService.getOne(id)
      .then(setBlog)
      .catch(err => console.error("Error loading blog post:", err));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await blogService.remove(id, authData.accessToken);
        navigate("/blog");
      } catch (err) {
        console.error("Error deleting blog post:", err);
      }
    }
  };

  if (!blog) return <p>Loading...</p>;

  const isOwner = String(blog.authorId) === String(authData._id);

  return (
    <section className="blog-details">
      <h2>{blog.title}</h2>
      <p><strong>by:</strong> {blog.authorEmail || "Unknown"}</p>

      <div dangerouslySetInnerHTML={{ __html: blog.content }} />

      {isOwner && (
        <div className="owner-actions">
          <Link to={`/blog/edit/${blog._id}`} className="btn-edit">Edit</Link>
          <button onClick={handleDelete} className="btn-delete">Delete</button>
        </div>
      )}
    </section>
  );
}
