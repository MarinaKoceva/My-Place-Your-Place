import { Link } from 'react-router-dom';

export default function PlaceCatalogItem({
    _id,
    title,
    category,
    imageUrl,
    address,
}) {
    return (
        <Link to={`/place/${_id}/details`} className="place-card">
            <div className="place-content">
                <img src={imageUrl} alt={title} className="place-image" />
                <h2>{title}</h2>
                <p className="category">{category}</p>
                <p className="address">{address}</p>
            </div>
        </Link>
    );
}
