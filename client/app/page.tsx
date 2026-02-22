"use client"
import List, { Todo } from "./components/List";
import NavigationBar, { ActiveButton } from "./components/NavigationBar";
import { getTodos, toggleTodo, deleteTodo, createTodo } from "./api";
import { useEffect, useState } from "react";
import NewItemBtn from "./components/NewItemBtn";


export default function Home() {
  const [activeBtn, setActiveBtn] = useState<ActiveButton>('All');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => { getTodos().then(setTodos).catch(console.error) }, []);

  const handleRemove = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error)
    }
  }

  const handleToggle = async (id: number) => {
    const todoToToggle = todos.find((t) => t.id === id);
    if (!todoToToggle) return;

    try {
      const updatedTodo = await toggleTodo(id, !todoToToggle.completed);
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (e) {
      console.error(e)
    }
  }

  const handleAdd = async (title: string) => {
    try {
      const newTodo = await createTodo(title);
      setTodos((prev) => [...prev, newTodo])
    } catch (e) {
      console.error(e)
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (activeBtn === "Todo") return !todo.completed;
    if (activeBtn === "Done") return todo.completed;
    return true;
  })
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="bg-gray-400 min-h-260 min-w-180 rounded-xl absolute top-0.5 left-0.5 -translate-x-0.5 -translate-y-0.5">
          <NavigationBar activeButton={activeBtn} onSetButton={setActiveBtn}></NavigationBar>
          <List items={filteredTodos} onRemove={handleRemove} onToggle={handleToggle}></List>
          <NewItemBtn onAdd={handleAdd}></NewItemBtn>
        </div>
      </main>
    </div>
  );
}
