import request from "../utils/request";

const baseUrl = 'http://localhost:3030/jsonstore/places';

export default {
    async getAll() {
        const result = await request.get(baseUrl);

        const places = Object.values(result);

        return places;
    },
    getOne(placeId) {
        return request.get(`${baseUrl}/${placeId}`);
    },
    create(placeData) {
        return request.post(baseUrl, placeData);
    },
    edit(placeId, placeData) {
        return request.put(`${baseUrl}/${placeId}`, { ...placeData, _id: placeId });
    },
    delete(placeId) {
        return request.delete(`${baseUrl}/${placeId}`);
    },
};
