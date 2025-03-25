import { useNavigate, useParams } from "react-router";
import { useEditPlace, usePlace } from "../../api/placeApi";


export default function PlaceEdit() {
    const navigate = useNavigate()
    const { placeId } = useParams();
    const { place } = usePlace(placeId)
    const { edit } = useEditPlace();

    const formAction = async (formData) => {
        const placeData = Object.fromEntries(formData);

        await edit(placeId, placeData);

        navigate(`/profile`);
    }
    
    return (
<section className="form-container">
  <form className="form-content" onSubmit={(e) => {
      e.preventDefault();
      formAction(new FormData(e.target));
  }}>
    <h2>Edit Your Place</h2>

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

    <input type="submit" value="Save Changes" className="submit" />
  </form>
</section>

    );
}
