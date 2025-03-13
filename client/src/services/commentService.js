import request from "../utils/request";

const baseUrl = 'http://localhost:3030/jsonstore/comments';

export default {
    async getAll(placeId) {
        const comments = await request.get(baseUrl);

        // TODO: filter when migrate to collections
        // Client filtering (dont do this)
        const placeComments = Object.values(comments).filter(comment => comment.placeId === placeId);

        return placeComments;
    },
    create(email, placeId, comment) {
        return request.post(baseUrl, { email, placeId, comment });
    }
};
