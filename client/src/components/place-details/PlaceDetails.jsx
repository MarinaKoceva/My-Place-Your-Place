import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import placeService from "../../services/placeService";
import CommentsShow from "../comments-show/CommentsShow";
import CommentsCreate from "../comments-create/CommentsCreate";
import commentService from "../../services/commentService";

export default function PlaceDetails({
    email,
}) {
    const navigate = useNavigate();
    const [place, setPlace] = useState({});
    const [comments, setComments] = useState([]);
    const { placeId } = useParams();

    useEffect(() => {
        placeService.getOne(placeId)
            .then(setPlace);

        commentService.getAll(placeId)
            .then(setComments)
    }, [placeId]);

    const placeDeleteClickHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete ${place.title} place?`);

        if (!hasConfirm) {
            return;
        }

        await placeService.delete(placeId);

        navigate('/places');
    };

    const commentCreateHandler = (newComment) => {
        setComments(state => [...state, newComment]);
    };

    return (
        <section id="place-details">
            <h1>Place Details</h1>
            <div className="info-section">

                <div className="place-header">
                    <img className="place-img" src={place.imageUrl} />
                    <h1>{place.title}</h1>
                    <span className="levels">MaxLevel: {place.maxLevel}</span>
                    <p className="type">{place.category}</p>
                </div>

                <p className="text">{place.summary}</p>

                <CommentsShow comments={comments} />

                {/* <!-- Edit/Delete buttons ( Only for creator of this place )  --> */}
                <div className="buttons">
                    <Link to={`/places/${placeId}/edit`} className="button">Edit</Link>
                    <button
                        onClick={placeDeleteClickHandler}
                        className="button"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <CommentsCreate
                email={email}
                placeId={placeId}
                onCreate={commentCreateHandler}
            />
        </section>
    );
}
