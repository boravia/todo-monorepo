import { Icon } from "@iconify/react";
import { MouseEvent } from "react";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface ListItemProps {
    item: Todo;
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
}

function ListItem({item, onRemove, onToggle}: ListItemProps) {
    const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onRemove(item.id);
    }
    return (
        <li onClick={() => onToggle(item.id)}
        className={`gorup flex items-center gap-3 p-3 my-2 mx-2 rounded-xl cursor-pointer transition-all duration-200 ${
            item.completed ? "bg-gray-400 line-through" : "bg-gray-500 hover:shadow:md"}`}
        >
            <div className="rounded-2xl w-1 h-1 bg-red-500"></div>
            <span>{item.title}</span>
            <button onClick={handleRemove}><Icon icon="ph:trash"/></button>
        </li>
    )
}

interface ListProps {
    items: Todo[];
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
}

export default function List({ items, onToggle, onRemove }: ListProps) {
    return (
        <ul className="flex flex-col">
            {items.map((item) => (
                <ListItem key={item.id} item={item} onRemove={onRemove} onToggle={onToggle}></ListItem>
            ))}
        </ul>
    );
}