"use client";

import React, { useState } from "react";
import TaskList from "@/app/components/TaskList";
import AddTaskForm from "@/app/components/AddTaskForm";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div>
      <h1>Gestión de Tareas</h1>
      <AddTaskForm onTaskAdded={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Home;
