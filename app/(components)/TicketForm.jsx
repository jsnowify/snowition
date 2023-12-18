"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import useSWR from "swr";

function TicketForm({ task }) {
  const EDITMODE = task._id === "new" ? false : true;
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    // Convert to numbers if the property is "priority" or "progress"
    const processedValue =
      name === "priority" || name === "progress" ? parseInt(value, 10) : value;

    setFormData((preState) => ({
      ...preState,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (EDITMODE) {
        const res = await fetch(`/api/Task/${task._id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ formData }),
        });

        if (!res.ok) {
          const errorResponse = await res.json();
          console.error("Failed to update task:", errorResponse.message);
          throw new Error("Failed to update task");
        }
      } else {
        const res = await fetch("/api/Task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData }),
        });

        if (!res.ok) {
          const errorResponse = await res.json();
          console.error("Failed to create task:", errorResponse.message);
          throw new Error("Failed to create task");
        }
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("An error occurred:", error.message);
      // Handle the error as needed
    }
  };

  const startingTaskData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "Not Started",
    category: "Assignment",
  };

  if (EDITMODE) {
    startingTaskData["title"] = task.title;
    startingTaskData["description"] = task.description;
    startingTaskData["priority"] = task.priority;
    startingTaskData["progress"] = task.progress;
    startingTaskData["status"] = task.status;
    startingTaskData["category"] = task.category;
  }

  const [formData, setFormData] = useState(startingTaskData);
  const swrKey = task._id ? `/api/Task/${task._id}` : null;

  const { data: updatedTask, error } = useSWR(swrKey, async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  });

  useEffect(() => {
    if (updatedTask) {
      setFormData(updatedTask);
    }
  }, [updatedTask]);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
        action=""
      >
        <h3>{EDITMODE ? "Update your task" : "Create Task"}</h3>
        <label>Title</label>
        <input
          type="text"
          id="text"
          name="title"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />

        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />

        <label>Category</label>
        <select
          name="category"
          id=""
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Assignment">Assignment</option>
          <option value="Capstone Feature">Capstone Feature</option>
          <option value="Project">Project</option>
          <option value="Bug">Bug</option>
          <option value="Dump Idea">Dump Idea</option>
          <option value="Others">Others</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label htmlFor="">1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label htmlFor="">2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label htmlFor="">3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label htmlFor="">4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="NOT STARTED"> NOT STARTED </option>
          <option value="STARTED"> STARTED </option>
          <option value="DONE"> DONE </option>
        </select>

        <input
          type="submit"
          className="btn"
          value={EDITMODE ? "Update task" : "Create Task"}
        />
      </form>
    </div>
  );
}

export default TicketForm;
