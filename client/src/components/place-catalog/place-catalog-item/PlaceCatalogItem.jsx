import { Link } from 'react-router';

export default function PlaceCatalogItem({
    _id,
    title,
    category,
    imageUrl,
    address,
    showActions = false,
    onDelete
}) {
    return (
        <div className="place-wrapper">
            {/* Цялата карта е линк към детайлите */}
            <Link
                to={`/places/${_id}/details`}
                className="place-card-link"
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <div className="place-card">
                    <div className="place-content">
                        <img
                            src={imageUrl || "/images/placeholder.jpg"}
                            alt={title}
                            className="place-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/images/placeholder.jpg";
                            }}
                        />
                        <h2>{title}</h2>
                        <p className="category">{category}</p>
                        <p className="address">{address}</p>
                    </div>
                </div>
            </Link>

            {/* Бутоните извън линка */}
            {showActions && (
                <div className="place-actions">
                    <Link to={`/places/${_id}/edit`} className="btn edit">Edit</Link>
                    <button onClick={() => onDelete(_id)} className="btn delete">Delete</button>
                </div>
            )}
        </div>
    );
}
