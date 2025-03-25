import commentService from "../../services/commentService";

export default function CommentsCreate({ email, placeId, ownerId, onCreate }) {
    const commentAction = async (formData) => {
        const comment = formData.get('comment');

        if (!comment.trim()) return;

        // ✅ допълнителна защита, ако ownerId липсва
        if (!ownerId) {
            console.error("ownerId is missing – cannot create comment");
            return;
        }

        try {
            const createdComment = await commentService.create(email, placeId, ownerId, comment);
            onCreate(createdComment);
        } catch (err) {
            console.error("Failed to create comment:", err);
        }
    };

    return (
        <div className="comment-box">
            <h3>Add new comment:</h3>
            <form className="form" action={commentAction}>
                <textarea name="comment" placeholder="Write your comment here..."></textarea>
                <button className="comment-btn" type="submit">Add Comment</button>
            </form>
        </div>
    );
}
