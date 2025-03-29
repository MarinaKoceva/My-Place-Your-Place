import { useNavigate } from 'react-router';
import { useUserPlaces, useDeletePlace } from "../../api/placeApi";
import PlaceCatalogItem from "../place-catalog/place-catalog-item/PlaceCatalogItem";
import { useEffect, useState } from "react";
import { useComments } from "../../api/commentApi";
import commentService from "../../services/commentService";
import useAuth from '../../hooks/useAuth';

export default function Profile({
    _id,
    onLogout,
    fullName,
    profilePicUrl,
    gender,
    bio,
    notificationsEnabled,
    preferredLanguage,
    birthdate
}) {
    const navigate = useNavigate();
    const { email: currentEmail } = useAuth();
    const { places, refetch } = useUserPlaces(_id);
    const { deletePlace } = useDeletePlace();
    const [commentsByPlace, setCommentsByPlace] = useState({});
    const [myComments, setMyComments] = useState([]);

    const handleDelete = async (placeId) => {
        await deletePlace(placeId);
        refetch();
    };

    const fetchAllComments = async () => {
        const allComments = {};
        for (let place of places) {
            const comments = await commentService.getAll(place._id);
            allComments[place._id] = comments;
        }
        setCommentsByPlace(allComments);
    };

    useEffect(() => {
        if (places.length > 0) {
            fetchAllComments();
        }
    }, [places]);

    useEffect(() => {
        if (currentEmail) {
            commentService.getAllByEmail(currentEmail).then(setMyComments);
        }
    }, [currentEmail]);

    const handleReplySubmit = async (e, commentId, originalComment) => {
        e.preventDefault();
        const reply = e.target.reply.value.trim();
        if (!reply) return;

        await commentService.reply(commentId, reply, originalComment);
        e.target.reset();
        fetchAllComments();
    };

    const handleDeleteComment = async (commentId) => {
        const confirmed = confirm("Are you sure you want to delete this comment?");
        if (!confirmed) return;

        await commentService.delete(commentId);
        fetchAllComments();
        setMyComments(myComments.filter(c => c._id !== commentId));
    };

    return (
        <div className="profile-container">
            <section className="profile-card">
                <div className="profile-header">
                    <img
                        src={profilePicUrl || "/images/profil-pic1.gif"}
                        alt="Profile"
                        className="profile-image"
                        onError={(e) => (e.target.src = "/images/default-avatar.png")}
                    />

                    <div className="profile-info-card">
                        <h2>{fullName || "User"}</h2>
                        {birthdate?.day && (
                            <p>🎂 <strong>{birthdate.day} {birthdate.month} {birthdate.year}</strong></p>
                        )}
                        {gender && <p>🧍 Gender: <strong>{gender}</strong></p>}
                        {preferredLanguage && <p>🌐 Language: <strong>{preferredLanguage}</strong></p>}
                        {notificationsEnabled && <p>🔔 Notifications: <strong>Enabled</strong></p>}
                        {bio && <p className="profile-bio">“{bio}”</p>}
                    </div>

                    <button onClick={() => navigate("/profile/edit")} className="edit-btn">Edit Card</button>
                </div>

                {/* Коментари върху моите обяви */}
                <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Comments on My Places:</h3>
                {places.map((place) => (
                    <div key={place._id} className="profile-place-comments">
                        <h4>{place.title}</h4>
                        {commentsByPlace[place._id]?.length > 0 ? commentsByPlace[place._id].map(comment => (
                            <div key={comment._id} className="comment-owner">
                                <p><strong>{comment.email}:</strong> {comment.comment}</p>

                                {comment.reply ? (
                                    <p className="reply">Reply: <em>{comment.reply}</em></p>
                                ) : (
                                    <form onSubmit={(e) => handleReplySubmit(e, comment._id, comment)}>
                                        <input type="text" name="reply" placeholder="Write reply..." />
                                        <button type="submit">Reply</button>
                                    </form>
                                )}

                                {comment.email === currentEmail && (
                                    <button
                                        className="btn delete-btn"
                                        onClick={() => handleDeleteComment(comment._id)}
                                    >
                                        ❌
                                    </button>
                                )}
                            </div>
                        )) : <p>No comments yet for this place.</p>}
                    </div>
                ))}

                {/* Моите коментари */}
                <h3 style={{ textAlign: "center", marginTop: "3rem" }}>My Comments & Replies:</h3>
                {myComments.length > 0 ? (
                    myComments.map(comment => (
                        <div key={comment._id} className="comment-owner">
                            <p><strong>{comment.email}:</strong> {comment.comment}</p>
                            {comment.reply && (
                                <p className="reply">Owner reply: <em>{comment.reply}</em></p>
                            )}
                            <button
                                className="btn delete-btn"
                                onClick={() => handleDeleteComment(comment._id)}
                            >
                                ❌
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center" }}>You haven’t posted any comments yet.</p>
                )}

                {/* Обявите */}
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

                <div className="profile-buttons">
                    <button
                        onClick={() => {
                            onLogout();
                            navigate("/");
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
