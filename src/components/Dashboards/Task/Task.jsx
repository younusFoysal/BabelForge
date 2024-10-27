"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";

export default function Task({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  console.log(task);

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-lg shadow hover:bg-gray-50 cursor-pointer dark:bg-gray-900"
    >
      <span className="mr-2">
        {
          task?.process === "todo" ? "📝" : task?.process === "done" ? "✅" : "⏰"
        }
      </span>

      <Link href={`/dashboard/tasks/${task.id}`} target={"_blank"}> {task.name}</Link>


      <br/>
      <span className="text-sm text-gray-600">
        Assigned to: {task.assignTo}
      </span>


    </li>
  );
}
