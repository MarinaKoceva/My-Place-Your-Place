import { useParams } from "react-router";
import { usePlaces } from "../../api/placeApi";
import PlaceCatalogItem from "../place-catalog/place-catalog-item/PlaceCatalogItem";

export default function SurroundingsView() {
    const { type } = useParams();
    const { places } = usePlaces();

    const filtered = places.filter(p =>
        p.surround?.toLowerCase().trim() === type.toLowerCase().trim()
    );

    return (
        <section style={{ padding: "2rem" }}>
            <h2>
                Places in surroundings:{" "}
                <span style={{ color: "white" }}>{type}</span>
            </h2>

            {filtered.length > 0 ? (
                <div className="catalog-list">
                    {filtered.map(place => (
                        <PlaceCatalogItem
                            key={place._id}
                            _id={place._id}
                            title={place.title}
                            category={place.category}
                            imageUrl={place.imageUrl}
                            address={place.address}
                        />
                    ))}
                </div>
            ) : (
                <p>No places found for this category.</p>
            )}
        </section>
    );
}
