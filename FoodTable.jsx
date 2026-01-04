import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/foods";

function FoodTable() {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    price: ""
  });

  // Fetch food data
  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get(API_URL);
      setFoods(res.data);
    } catch (err) {
      console.error("Error fetching foods", err);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add food
  const addFood = async () => {
    if (!form.id || !form.name || !form.category || !form.price) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(API_URL, {
        id: Number(form.id),
        name: form.name,
        category: form.category,
        price: Number(form.price)
      });

      setForm({ id: "", name: "", category: "", price: "" });
      fetchFoods();
    } catch (err) {
      console.error("Error adding food", err);
    }
  };

  // Delete food
  const deleteFood = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFoods();
    } catch (err) {
      console.error("Error deleting food", err);
    }
  };

  return (
    <>
      <h2>Add Food</h2>

      <input
        name="id"
        placeholder="ID"
        value={form.id}
        onChange={handleChange}
      />
      <input
        name="name"
        placeholder="Food Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />
      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />
      <button onClick={addFood}>Add</button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Food Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id}>
              <td>{food.id}</td>
              <td>{food.name}</td>
              <td>{food.category}</td>
              <td>{food.price}</td>
              <td>
                <button onClick={() => deleteFood(food.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default FoodTable;
