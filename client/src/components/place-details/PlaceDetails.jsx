import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import placeService from "../../services/placeService";
import CommentsShow from "../comments-show/CommentsShow";
import CommentsCreate from "../comments-create/CommentsCreate";
import commentService from "../../services/commentService";

export default function PlaceDetails({ email }) {
    const navigate = useNavigate();
    const [place, setPlace] = useState({});
    const [comments, setComments] = useState([]);
    const { placeId } = useParams();

    useEffect(() => {
        placeService.getOne(placeId).then(setPlace);
        commentService.getAll(placeId).then(setComments);
    }, [placeId]);

    const placeDeleteClickHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete ${place.title}?`);
        if (!hasConfirm) return;

        await placeService.delete(placeId);
        navigate('/places'); // Връщаме към каталога
    };

    const commentCreateHandler = (newComment) => {
        setComments(state => [...state, newComment]);
    };

    return (
        <section id="place-details">
            <div className="details-container">
                {/* Лявата част със снимка + информация */}
                <div className="details-left">
                    <div className="place-image">
                        <img src={place.imageUrl} alt={place.title} />
                    </div>
                    <div className="place-info">
                        <h1>{place.title}</h1>
                        <p><strong>Category:</strong> {place.category}</p>
                        <p><strong>Address:</strong> {place.address}</p>
                        <p><strong>Surroundings:</strong> {place.surround || "Not specified"}</p>
                        <p><strong>Tourist sites:</strong> {place.tourists}</p>
                        <p><strong>Size:</strong> {place.size} m²</p>
                        <p><strong>Rooms:</strong> {place.rooms}</p>
                        <p><strong>Available:</strong> {place.availability || "No availability set"}</p>
                        <p><strong>Amenities:</strong> {place.amenities}</p>
                    </div>

                    {/* Бутоните центрирани */}
                    <div className="buttons">
                        <Link to={`/places/${placeId}/edit`} className="edit-button">Edit</Link>
                        <button onClick={placeDeleteClickHandler} className="delete-button">Delete</button>
                    </div>
                </div>

                {/* Дясната част с коментарите */}
                <div className="details-right">
                    <div className="comments-section">
                        
                        <CommentsShow comments={comments} />
                    </div>
                    <div className="comment-input-container">
                        <CommentsCreate email={email} placeId={placeId} onCreate={commentCreateHandler} />
                    </div>
                </div>
            </div>
        </section>
    );
}
