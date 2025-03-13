import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import placeService from "../../services/placeService";


export default function PlaceEdit() {
    const navigate = useNavigate()
    const { placeId } = useParams();
    const [place, setPlace] = useState({});

    useEffect(() => {
        placeService.getOne(placeId)
            .then(setPlace);
    }, [placeId]);

    const formAction = async (formData) => {
        const placeData = Object.fromEntries(formData);

        await placeService.edit(placeId, placeData);

        navigate(`/places/${placeId}/details`);
    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" action={formAction}>
                <div className="container">

                    <h1>Edit Place</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" defaultValue={place.title} />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" defaultValue={place.category} />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" defaultValue={place.maxLevel} />

                    <label htmlFor="place-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={place.imageUrl} />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" defaultValue={place.summary}></textarea>
                    <input className="btn submit" type="submit" defaultValue="Edit Place" />

                </div>
            </form>
        </section>
    );
}
