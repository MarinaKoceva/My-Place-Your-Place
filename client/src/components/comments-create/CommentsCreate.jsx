import commentService from "../../services/commentService";

export default function CommentsCreate({ email, placeId, onCreate }) {
    const commentAction = async (formData) => {
        const comment = formData.get('comment');
        if (!comment.trim()) return; // Предотвратява празни коментари

        const createdComment = await commentService.create(email, placeId, comment);
        onCreate(createdComment);
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
