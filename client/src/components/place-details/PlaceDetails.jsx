import { Link, useNavigate, useParams } from "react-router";
import CommentsShow from "../comments-show/CommentsShow";
import CommentsCreate from "../comments-create/CommentsCreate";
import { useDeletePlace, usePlace } from "../../api/placeApi";
import useAuth from "../../hooks/useAuth";
import { useComments } from "../../api/commentApi";

export default function PlaceDetails() {
    const navigate = useNavigate();
    const { email, _id: userId } = useAuth()
    const { placeId } = useParams();
    const { place } = usePlace(placeId);
    const { deletePlace } = useDeletePlace();
    const { comments } = useComments(placeId)

    const placeDeleteClickHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete ${place.title} place?`);

        if (!hasConfirm) {
            return;
        }

        await deletePlace(placeId);

        navigate('/places');
    };

    const commentCreateHandler = (newComment) => {
        // setComments(state => [...state, newComment]);
    };

    const isOwner = userId === place._ownerId;

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
