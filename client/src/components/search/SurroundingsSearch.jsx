import { useNavigate } from "react-router";
import { useState } from "react";

export default function SurroundingsSearch() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    if (value) {
      navigate(`/surroundings/${value}`);
    }
  };

  return (
    <section className="surroundings-search">
      <div className="search-box">
        <label htmlFor="surroundings">Surroundings:</label>
        <select id="surroundings" value={selected} onChange={handleChange}>
          <option value="">Select category</option>
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
      </div>
    </section>
  );
}