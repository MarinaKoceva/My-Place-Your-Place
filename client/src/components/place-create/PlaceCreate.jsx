import { useNavigate } from 'react-router-dom';
import placeService from "../../services/placeService";

export default function PlaceCreate() {
    const navigate = useNavigate();

    const submitAction = async (formData) => {
        const placeData = Object.fromEntries(formData);
        await placeService.create(placeData);
        navigate('/place');
    };

    return (
        <section id="create-page" className="form-container">
            <form id="create" onSubmit={(e) => { e.preventDefault(); submitAction(new FormData(e.target)); }}>
                <div className="form-content">

                    <h1>Describe your home</h1>
                    <p>Describe your home and surroundings in just a few steps to receive exchange requests that are tailored to your needs.</p>
                    
                    <label htmlFor="imageUrl">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />
                    
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter the title..." required />

                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" required>
                        <option value="">-- Select a category --</option>
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Other">Other</option>
                    </select>

                    <label htmlFor="address">What's the address?</label>
                    <input type="text" id="address" name="address" placeholder="Enter the address" required />

                    <label htmlFor="surround">What's surrounding your home?</label>
                    <select id="surround" name="surround" required>
                    <option value="">-- Select an option --</option>
                        <option value="Countryside">Countryside</option>
                        <option value="Mountain">Mountain</option>
                        <option value="Coastal">Coastal</option>
                        <option value="Lake">Lake</option>
                        <option value="City">City</option>
                        <option value="Village">Village</option>
                        <option value="Isolated">Isolated</option>
                        <option value="Island">Island</option>
                        <option value="River">River</option>
                    </select>

                    <label htmlFor="tourists">Distance from tourist sites:</label>
                    <select id="tourists" name="tourists" required>
                        <option value="">-- Select an option --</option>
                        <option value="At the heart of a world-famous area">At the heart of a world-famous area</option>
                        <option value="Less than 30-minutes from a world-famous area">Less than 30-minutes from a world-famous area</option>
                        <option value="Less than 30-minutes from a lesser-known tourist site">Less than 30-minutes from a lesser-known tourist site</option>
                        <option value="Less than 30-minutes from sites that only the locals know about">Less than 30-minutes from sites that only the locals know about</option>
                        <option value="More than 30 minutes away from all tourist sites">More than 30 minutes away from all tourist sites</option>
                    </select>

                    <label htmlFor="size">What size is your home? (m²)</label>
                    <input type="number" id="size" name="size" min="10" required />

                    <label htmlFor="rooms">How many rooms does your home have?</label>
                    <input type="number" id="rooms" name="rooms" min="1" required />

                    <label htmlFor="availability">When is your home available?</label>
                    <input type="date" id="availability" name="availability" />

                    <label htmlFor="amenities">Which amenities can you offer?</label>
                    <textarea id="amenities" name="amenities" placeholder="Tell us about practical, multimedia, outdoor areas, etc."></textarea>
                    
                    <input className="btn submit" type="submit" value="Create Place" />
                </div>
            </form>
        </section>
    );
}
