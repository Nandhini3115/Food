import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/foods";

function App() {
  const [foods, setFoods] = useState([]);
  const [food, setFood] = useState({ id: "", name: "", type: "", price: "" });
  const [updateId, setUpdateId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    const res = await axios.get(API);
    setFoods(res.data);
  };

  const addFood = async () => {
    await axios.post(API, {
      id: Number(food.id),
      name: food.name,
      type: food.type,
      price: Number(food.price)
    });
    setFood({ id: "", name: "", type: "", price: "" });
    loadFoods();
  };

  const updateFood = async () => {
    await axios.put(`${API}/${updateId}`, {
      name: updateName
    });
    setUpdateId("");
    setUpdateName("");
    loadFoods();
  };

  const deleteFood = async () => {
    await axios.delete(`${API}/${deleteId}`);
    setDeleteId("");
    loadFoods();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🍽 Food Management (React)</h2>

      <h3>Add Food</h3>
      <input placeholder="ID" value={food.id}
        onChange={e => setFood({ ...food, id: e.target.value })} />
      <input placeholder="Name" value={food.name}
        onChange={e => setFood({ ...food, name: e.target.value })} />
      <input placeholder="Type" value={food.type}
        onChange={e => setFood({ ...food, type: e.target.value })} />
      <input placeholder="Price" value={food.price}
        onChange={e => setFood({ ...food, price: e.target.value })} />
      <button onClick={addFood}>Add</button>

      <h3>Update Food Name</h3>
      <input placeholder="ID" value={updateId}
        onChange={e => setUpdateId(e.target.value)} />
      <input placeholder="New Name" value={updateName}
        onChange={e => setUpdateName(e.target.value)} />
      <button onClick={updateFood}>Update</button>

      <h3>Delete Food</h3>
      <input placeholder="ID" value={deleteId}
        onChange={e => setDeleteId(e.target.value)} />
      <button onClick={deleteFood}>Delete</button>

      <h3>Food List</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {foods.map(food => (
            <tr key={food.id}>
              <td>{food.id}</td>
              <td>{food.name}</td>
              <td>{food.type || "-"}</td>
              <td>{food.price || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
