import { useEffect, useState } from "react"; 
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/jsonstore/comments';

export const useComments = (placeId) => {
    const { request } = useAuth();
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        request.get(baseUrl)
            .then(result => {
                const all = Object.values(result || {});
                const filtered = all.filter(c => c.placeId === placeId);
                setComments(filtered);
            });
    }, [placeId]);

    return {
        comments,
    };
}

