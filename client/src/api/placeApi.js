import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/data/places';

export const usePlaces = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then(setPlaces)
    }, []);

    return { places };
};

export const usePlace = (placeId) => {
    const [place, setPlace] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${placeId}`)
            .then(setPlace);
    }, [placeId])

    return {
        place,
    };
};

export const useLatestPlaces = () => {
    const [latestPlaces, setLatestPlaces] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: 3,
            select: '_id,imageUrl,title',
        });

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setLatestPlaces)
    }, []);

    return { latestPlaces };
};

export const useCreatePlace = () => {
    const { request } = useAuth();

    const create = (placeData) =>
        request.post(baseUrl, placeData);

    return {
        create,
    }
};

export const useEditPlace = () => {
    const { request } = useAuth();

    const edit = (placeId, placeData) =>
        request.put(`${baseUrl}/${placeId}`, { ...placeData, _id: placeId });

    return {
        edit,
    }
};

export const useDeletePlace = () => {
    const { request } = useAuth();

    const deletePlace = (placeId) =>
        request.delete(`${baseUrl}/${placeId}`);

    return {
        deletePlace,
    }
};

export const useUserPlaces = (userId) => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        if (!userId) return;

        request.get('http://localhost:3030/data/places') 
            .then(data => {
                const userPlaces = Object.values(data).filter(p => p._ownerId === userId);
                setPlaces(userPlaces);
            });
    }, [userId]);

    return { places };
};