import { useState, useEffect } from "react";

export default function Todolist() {
    const [todos, setTodos] = useState(() => {
        try {
            const raw = localStorage.getItem("todos_v1");
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    });

    const [input, setInput] = useState("");

    useEffect(() => {
        localStorage.setItem("todos_v1", JSON.stringify(todos));
    }, [todos]);


    function addTodo() {
        const text = input.trim();
        if (!text) return;
        const newList = { id: Date.now().toString(), text, done: false };
        setTodos((st) => [newList, ...st]);
        setInput("");
    }

    return (
        <div className="max-w-xl mx-auto p-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-teal-400 text-lg font-semibold">Daftar To-Do</h2>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Tulis to-do..."
                        className="rounded-md text-teal-50 border border-teal-600 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        value={input}
                        onChange={(ev) => setInput(ev.target.value)}
                        onKeyDown={(ev) => {
                            if (ev.key === "Enter") {
                                addTodo();
                            }
                        }}
                    />
                    <button 
                    onClick={() => addTodo()}
                    className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        <span>Tambah</span>
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
                        </svg>
                    </button>
                </div>

            </div>

            {/* List */}
            <ul className="space-y-2">
                {todos.map((todo) => (
                    <li key={todo.id} className="flex items-center justify-between rounded-lg border border-teal-100 bg-teal-100 hover:bg-teal-50 p-3 shadow-sm">
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-teal-300 text-teal-950 focus:ring-teal-600"
                            />
                            <span className="text-sm text-teal-950">{todo.text}</span>
                        </label>

                        <div className="flex items-center gap-2">
                            {/* Edit */}
                            <button
                                type="button"
                                className="inline-flex
                                           items-center
                                           gap-1 
                                           rounded-md 
                                           px-2 py-1 
                                           text-xs 
                                           font-medium 
                                           border 
                                           border-teal-300 
                                           text-teal-900 
                                           bg-teal-200 
                                           hover:bg-yellow-300"
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L6 11.172V14h2.828l8.586-8.586a2 2 0 000-2.828z" />
                                    <path d="M4 16h12v2H4a2 2 0 01-2-2V4h2v12z" />
                                </svg>
                                <span>Edit</span>
                            </button>

                            {/* Delete */}
                            <button
                                type="button"
                                className="inline-flex 
                                           items-center 
                                           gap-1 
                                           rounded-md 
                                           px-2 py-1 
                                           text-xs 
                                           font-medium 
                                           border 
                                           border-teal-300 
                                           text-teal-900 
                                           bg-teal-200 
                                           hover:bg-red-300"
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M6 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" />
                                    <path d="M4 6h12v2H4V6zm3-2h6a1 1 0 011 1v1H6V5a1 1 0 011-1zm-1 4h10v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" />
                                </svg>
                                <span>Hapus</span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );



}