import PlaceCatalogItem from "./place-catalog-item/PlaceCatalogItem";
import { usePlaces } from "../../api/placeApi";

export default function PlaceCatalog() {
    const { places } = usePlaces();


    return (
        <section id="catalog-page">
            <div className="catalog-header">
                <h1>There is a home for all your desires</h1>
                <p>A selection of houses based on your favorite criteria, to live an unforgettable experience.</p>
            </div>

            <div className="catalog-grid">
                {places.length > 0
                    ? places.map(place => <PlaceCatalogItem key={place._id} {...place} />)
                    : <h3 className="no-articles">No places available</h3>
                }
            </div>
        </section>
    );
}
