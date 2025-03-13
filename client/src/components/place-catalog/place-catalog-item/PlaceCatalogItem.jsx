import { Link } from 'react-router'

export default function PlaceCatalogItem({
    _id,
    title,
    category,
    imageUrl,
}) {
    return (
        <div className="allPlaces">
            <div className="allPlaces-info">
                <img src={imageUrl} />
                <h6>{category}</h6>
                <h2>{title}</h2>
                <Link to={`/place/${_id}/details`} className="details-button">Details</Link>
            </div>
        </div>
    );
}
