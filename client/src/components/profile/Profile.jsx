import { useNavigate } from 'react-router';
import { useUserPlaces, useDeletePlace } from "../../api/placeApi";
import PlaceCatalogItem from "../place-catalog/place-catalog-item/PlaceCatalogItem";
import { useEffect, useState } from "react";
import { useComments } from "../../api/commentApi";
import commentService from "../../services/commentService"; // за reply()

export default function Profile({ _id, email, birthdate, onLogout }) {
    const navigate = useNavigate();
    const { places, refetch } = useUserPlaces(_id);
    const { deletePlace } = useDeletePlace();
    const [commentsByPlace, setCommentsByPlace] = useState({});

    const handleDelete = async (placeId) => {
        await deletePlace(placeId);
        refetch(); // за да обновим след изтриване
    };

    useEffect(() => {
        const fetchComments = async () => {
            const allComments = {};

            for (let place of places) {
                const comments = await commentService.getAll(place._id);
                allComments[place._id] = comments;
            }

            setCommentsByPlace(allComments);
        };

        if (places.length > 0) {
            fetchComments();
        }
    }, [places]);

    const handleReplySubmit = async (e, commentId, originalComment) => {
        e.preventDefault();
        const reply = e.target.reply.value.trim();
        if (!reply) return;

        await commentService.reply(commentId, reply, originalComment);
        e.target.reset();

        // обнови всички коментари
        const updatedComments = {};
        for (let place of places) {
            const comments = await commentService.getAll(place._id);
            updatedComments[place._id] = comments;
        }
        setCommentsByPlace(updatedComments);
    };

    return (
        <div className="profile-container">
            <section className="profile-card">
                {/* Хедър */}
                <div className="profile-header">
                    <img
                        src="/images/profil-pic1.gif"
                        alt="Profile"
                        className="profile-image"
                        onError={(e) => (e.target.src = "/images/default-avatar.png")}
                    />
                    <div className="profile-info">
                        <h2>{email}</h2>
                        {birthdate?.day && birthdate?.month && birthdate?.year && (
                            <p className="profile-birthday">
                                🎂 {birthdate.day} {birthdate.month} {birthdate.year}
                            </p>
                        )}
                    </div>
                    <button onClick={() => navigate("/profile/edit")} className="edit-btn">✏️</button>
                </div>

                {/* Обявите вътре в profile-card */}
                <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Comments on My Places:</h3>

                {places.map((place) => (
                    <div key={place._id} className="profile-place-comments">
                        <h4>{place.title}</h4>
                        {commentsByPlace[place._id]?.length > 0 ? commentsByPlace[place._id].map(comment => (
                            <div key={comment._id} className="comment-owner">
                                <p><strong>{comment.email}:</strong> {comment.comment}</p>

                                {comment.reply ? (
                                    <p className="reply">Reply: {comment.reply}</p>
                                ) : (
                                    <form onSubmit={(e) => handleReplySubmit(e, comment._id, comment)}>
                                        <input type="text" name="reply" placeholder="Write reply..." />
                                        <button type="submit">Reply</button>
                                    </form>
                                )}
                            </div>
                        )) : <p>No comments yet for this place.</p>}
                    </div>
                ))}

                <div className="catalog-grid" style={{ padding: "1rem" }}>
                    {places.length > 0 ? (
                        places.map((place) => (
                            <PlaceCatalogItem
                                key={place._id}
                                {...place}
                                showActions={false}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p style={{ textAlign: "center" }}>No created places yet.</p>
                    )}
                </div>

                {/* Log Out бутон вътре в profile-card */}
                <div className="profile-buttons">
                    <button
                        onClick={() => {
                            onLogout();         // изчистване на auth
                            navigate("/");      // пренасочване към home
                        }}
                        className="btn logout-btn"
                    >
                        Log Out
                    </button>
                </div>
            </section>
        </div>
    );
}
