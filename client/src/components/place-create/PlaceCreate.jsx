import { useNavigate } from "react-router";
import { useState } from "react";
import { useCreatePlace } from '../../api/placeApi';

export default function PlaceCreate() {
    const navigate = useNavigate();
    const { create: createPlace } = useCreatePlace();

    const [formData, setFormData] = useState({
        imageUrl: "",
        title: "",
        category: "",
        address: "",
        surround: "",
        tourists: "",
        size: "",
        rooms: "",
        availability: "",
        amenities: ""
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "number" ? Number(value) : value.trim(),
        }));
    };

    const submitAction = async (formData) => {
        const placeData = Object.fromEntries(formData);

        await createPlace(placeData);

        navigate('/places');
    };

    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={submitAction}>
                <div className="container">
                    <h1>Describe your home</h1>

                    {error && <p className="error">{error}</p>}

                    <label htmlFor="imageUrl">Image URL:</label>
                    <input 
                        type="text" 
                        id="imageUrl" 
                        name="imageUrl" 
                        placeholder="Enter image URL..." 
                        value={formData.imageUrl} 
                        onChange={handleChange} 
                    />

                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        placeholder="Enter title..." 
                        value={formData.title} 
                        onChange={handleChange} 
                        required
                    />

                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select category</option>
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                    </select>

                    <label htmlFor="address">Address:</label>
                    <input 
                        type="text" 
                        id="address" 
                        name="address" 
                        placeholder="Enter address..." 
                        value={formData.address} 
                        onChange={handleChange} 
                        required
                    />

                    <label htmlFor="surround">Surroundings:</label>
                    <input 
                        type="text" 
                        id="surround" 
                        name="surround" 
                        placeholder="What is around?" 
                        value={formData.surround} 
                        onChange={handleChange} 
                    />

                    <label htmlFor="tourists">Tourist sites:</label>
                    <input 
                        type="text" 
                        id="tourists" 
                        name="tourists" 
                        placeholder="Distance from tourist sites" 
                        value={formData.tourists} 
                        onChange={handleChange} 
                    />

                    <label htmlFor="size">Size (m²):</label>
                    <input 
                        type="number" 
                        id="size" 
                        name="size" 
                        min="1"
                        value={formData.size} 
                        onChange={handleChange} 
                    />

                    <label htmlFor="rooms">Rooms:</label>
                    <input 
                        type="number" 
                        id="rooms" 
                        name="rooms" 
                        min="1"
                        value={formData.rooms} 
                        onChange={handleChange} 
                    />

                    <label htmlFor="availability">Availability:</label>
                    <input 
                        type="date" 
                        id="availability" 
                        name="availability" 
                        value={formData.availability} 
                        onChange={handleChange} 
                    />

                    <label htmlFor="amenities">Amenities:</label>
                    <textarea 
                        id="amenities" 
                        name="amenities" 
                        placeholder="List amenities..." 
                        value={formData.amenities} 
                        onChange={handleChange} 
                    ></textarea>

                    <input className="btn submit" type="submit" value="Create Place" />
                </div>
            </form>
        </section>
    );
}
