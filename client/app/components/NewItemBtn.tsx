import { Icon } from "@iconify/react";
import { FormEvent, useState } from "react";

interface NewItemBtnProps {
    onAdd: (title: string) => void;
}


export default function NewItemBtn({onAdd}: NewItemBtnProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (title.trim()) {
            onAdd(title.trim());
            setTitle('');
            setOpen(false);
        }
    }

    if (open) {
        return (
            <form onSubmit={handleSubmit} className="inputForm">
                <div></div>
                <input type="text" className="inputForm__inputField" value={title} 
                onChange={(event) => setTitle(event.target.value)}/>
                <button type="submit" className="inputForm__btn">add</button>
            </form>
        )
    }

    return (
        <div onClick={() => setOpen(true)} className="liAdder">
            <Icon icon="ph:plus" className="liAdder__icon"></Icon>
        </div>
    );
}