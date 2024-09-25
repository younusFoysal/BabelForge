"use client"
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Task({ task }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    console.log(task)

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-4 rounded-lg shadow hover:bg-gray-50 cursor-pointer"
        >
            {task.name} {task.author}
        </li>
    );
}
