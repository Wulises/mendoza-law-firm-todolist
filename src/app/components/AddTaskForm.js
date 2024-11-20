import React, { useState } from "react";
import axios from "axios";

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pendiente");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { title, description, status };
      const response = await axios.post("/api/tasks", newTask);
      onTaskAdded(response.data);  // Notificar a la lista de tareas
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Nueva Tarea</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En Progreso</option>
        <option value="completada">Completada</option>
      </select>
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default AddTaskForm;
