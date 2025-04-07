import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import * as blogService from '../../services/blogService';

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authData = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authorEmail: '',
    authorId: ''
  });

  useEffect(() => {
    blogService.getOne(id).then(result => {
      if (String(result.authorId) !== String(authData._id)) {
        navigate('/blog');
        return;
      }

      setFormData({
        title: result.title,
        content: result.content,
        authorEmail: result.authorEmail || authData.email,
        authorId: result.authorId
      });
    });
  }, [id, authData._id, authData.email, navigate]);

  const handleChange = (e) => {
    setFormData(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await blogService.update(id, formData, authData.accessToken);
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error('Error updating blog:', err);
    }
  };

  return (
    <section className="blog-edit">
      <h2>Редактирай блог пост</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Заглавие:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Съдържание:
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="10"
          />
        </label>
        <button type="submit">Запази промените</button>
      </form>
    </section>
  );
}
