import request from "../utils/request";

const baseUrl = 'http://localhost:3030/jsonstore/comments';

export default {
    async getAll(placeId) {
        const comments = await request.get(baseUrl);

        const placeComments = Object.values(comments).filter(comment => comment.placeId === placeId);

        return Object.values(comments).filter(comment => comment.placeId === placeId);
    },
    create(email, placeId, ownerId, comment) {
        return request.post(baseUrl, { email, placeId, ownerId, comment });
    },
    getAllByOwner(ownerId) {
        return request.get(baseUrl)
            .then(comments =>
                Object.values(comments).filter(comment => comment.ownerId === ownerId)
            );
    },
    reply(commentId, replyText, originalComment) {
        return request.put(`${baseUrl}/${commentId}`, {
            ...originalComment,
            reply: replyText
        });
    }
    
};
