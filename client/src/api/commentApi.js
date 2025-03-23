import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/data/comments';

// export default {
//     create(email, gameId, comment) {
//         return request.post(baseUrl, { email, gameId, comment });
//     }
// };

export const useComments = (placeId) => {
    const { request } = useAuth();
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `placeId="${placeId}"`
        });

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setComments)
    }, [placeId]); // TODO Fix this

    return {
        comments,
    }
}
