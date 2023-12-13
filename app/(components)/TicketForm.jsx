"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function TicketForm() {
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("Submit");
  };
  const startingTaskData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "Not Started",
    category: "Assignment",
  };

  const [formData, setFormData] = useState(startingTaskData);
  return (
    <div className="flex justify-center ">
      <form
        className="flex flex-col gap-3 w-1/2 "
        method="post"
        onSubmit={handleSubmit}
        action=""
      >
        <h3>Create Task</h3>
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

        {/* <label htmlFor="">Priority</label>
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
        <label htmlFor="">5</label>
      </form>
      <label htmlFor="">Progress</label>
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
      <select
        name="statue"
        id=""
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Not Started">Not Started </option>
        <option value="Started">Started </option>
        <option value="Done">Done </option>
      </select>
      <input type="submit" className="btn" value="Create Task" /> */}
    </div>
  );
}

export default TicketForm;
