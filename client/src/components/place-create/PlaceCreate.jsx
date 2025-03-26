import { useNavigate } from "react-router";
import { useState } from "react";
import { useCreatePlace } from "../../api/placeApi";

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
        amenities: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Простa валидация
        if (!formData.title || !formData.category || !formData.address) {
            setError("Please fill in Title, Category and Address.");
            return;
        }

        if (formData.title.length < 3) {
            setError("Title must be at least 3 characters.");
            return;
        }

        try {
            await createPlace(formData);
            navigate("/places");
        } catch (err) {
            setError("Failed to create place.");
        }
    };

    return (
        <section className="form-container">
            <form className="form-content" onSubmit={handleSubmit}>
                <h2>Describe your home</h2>

                {error && <p className="form-error">{error}</p>}

                {[
                    { label: "Image URL:", name: "imageUrl", type: "text", placeholder: "Enter image URL..." },
                    { label: "Title:", name: "title", type: "text", placeholder: "Enter title...", required: true },
                    {
                        label: "Category:",
                        name: "category",
                        type: "select",
                        options: ["House", "Apartment", "Villa"],
                        required: true,
                    },
                    { label: "Address:", name: "address", type: "text", placeholder: "Enter address...", required: true },
                    {
                        label: "Surroundings:",
                        name: "surround",
                        type: "select",
                        options: ["Countryside", "Mountain", "Coastal", "Lake", "City", "Village", "Isolated", "Island", "River"]
                    },
                    {
                        label: "Tourist sites:",
                        name: "tourists",
                        type: "select",
                        options: [
                            "In the heart of a world-famous area",
                            "Less than 30-minutes from a world-famous area",
                            "Less than 30-minutes from a lesser-known tourist site",
                            "Less than 30-minutes from sites that only the locals know about",
                            "Remote: more than 30-minutes from any tourist sites"
                        ]
                    },
                    { label: "Size (m²):", name: "size", type: "number", min: 1 },
                    { label: "Rooms:", name: "rooms", type: "number", min: 1 },
                    { label: "Availability:", name: "availability", type: "date" },
                    { label: "Amenities:", name: "amenities", type: "textarea", placeholder: "List amenities..." },
                ].map((field, index) => (
                    <div className="form-row" key={index}>
                        <label htmlFor={field.name}>{field.label}</label>

                        {field.type === "select" ? (
                            <select
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required={field.required}
                            >
                                <option value="">Select category</option>
                                {field.options.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        ) : field.type === "textarea" ? (
                            <textarea
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name]}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                value={formData[field.name]}
                                onChange={handleChange}
                                min={field.min}
                                required={field.required}
                            />
                        )}
                    </div>
                ))}

                <input className="submit" type="submit" value="Create Place" />
            </form>
        </section>
    );
}
