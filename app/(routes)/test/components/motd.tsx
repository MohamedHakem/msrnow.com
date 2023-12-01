"use client"

import { useState } from "react"

export default function Motd({ data }: { data: string }) {
  const [task, setTask] = useState(data);
  const [isEditing, setEditing] = useState(data === "");

  const handleSubmit = (newTask: string) => {
    setTask(newTask);
    setEditing(false);
  };

  return (
    <div dir="ltr" className="h-full m-10 border p-10 flex flex-col justify-center items-center">
      {!isEditing ? (
        <h2 className="text-7xl font-bold m-0 border-b border-spacing-y-10" onDoubleClick={() => setEditing(true)}>
          {task || "What is your main focus for today?"}
        </h2>
      ) : (
        <input
          autoFocus
          className="w-full text-center text-7xl font-bold m-0 border-b"
          type="text"
          defaultValue={task}
          onBlur={(e) => handleSubmit(e.target.value)} />
      )}
    </div>
  );
}