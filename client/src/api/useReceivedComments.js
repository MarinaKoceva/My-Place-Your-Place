import { useEffect, useState } from "react";
import commentService from "../services/commentService";

export const useReceivedComments = (ownerId) => {
    const [receivedComments, setReceivedComments] = useState([]);

    useEffect(() => {
        if (!ownerId) return;

        commentService.getAllByOwner(ownerId).then(setReceivedComments);
    }, [ownerId]);

    return {
        receivedComments
    };
};
