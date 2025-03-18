import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import placeService from "../../services/placeService";

export default function PlaceEdit() {
    const navigate = useNavigate();
    const { placeId } = useParams();
    const [place, setPlace] = useState({});

    useEffect(() => {
        placeService.getOne(placeId)
            .then(setPlace);
    }, [placeId]);

    const formAction = async (formData) => {
        const placeData = Object.fromEntries(formData);

        await placeService.edit(placeId, placeData);

        navigate(`/place/${placeId}/details`);
    };

    return (
        <section id="edit-page" className="edit-container">
            <form id="edit" action={formAction} className="edit-form">
                <h1>Edit Your Place</h1>
                
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" defaultValue={place.title} />

                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" defaultValue={place.category} />

                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" defaultValue={place.address} />

                <label htmlFor="imageUrl">Image URL:</label>
                <input type="text" id="imageUrl" name="imageUrl" defaultValue={place.imageUrl} />

                <label htmlFor="size">Size (m²):</label>
                <input type="number" id="size" name="size" defaultValue={place.size} />

                <label htmlFor="rooms">Rooms:</label>
                <input type="number" id="rooms" name="rooms" defaultValue={place.rooms} />

                <label htmlFor="availability">Availability:</label>
                <input type="text" id="availability" name="availability" defaultValue={place.availability} />

                <label htmlFor="amenities">Amenities:</label>
                <textarea name="amenities" id="amenities" defaultValue={place.amenities}></textarea>

                <button type="submit" className="save-btn">Save Changes</button>
            </form>
        </section>
    );
}
