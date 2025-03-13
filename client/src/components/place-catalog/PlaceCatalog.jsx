import { useEffect, useState } from "react";
import placeService from "../../services/placeService";
import PlaceCatalogItem from "./place-catalog-item/PlaceCatalogItem";

export default function PlaceCatalog() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        placeService.getAll()
            .then(setPlaces)
    }, []);

    return (
        <section id="catalog-page">
            <h1>All Places</h1>
            
            {places.length > 0
                ? places.map(place => <PlaceCatalogItem key={place._id} {...place} />)
                : <h3 className="no-articles">No articles yet</h3>
            }
        </section>
    );
}
