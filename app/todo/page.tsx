"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Todo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const password = searchParams.get("password");
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username || !password) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [username, password]);

  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState("");
  const [keysUsed, setKeysUsed] = useState<string[]>([]);

  useEffect(() => {}, [todos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo === "") {
      alert("Please enter a todo");
      return;
    }
    if (keysUsed.includes(todo)) {
      alert("You already entered this todo");
      return;
    }
    setTodos((prevTodos) => {
      setKeysUsed((prevKeysUsed) => [...prevKeysUsed, todo]);
      const updatedTodos = [...prevTodos, todo];
      localStorage.setItem("App.todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    setTodo("");
  };

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <>
      <ul>
        {todos.map((todo, id) => (
          <div key={todo}>
            <li style={{ whiteSpace: "nowrap" }}>
              {todo}{" "}
              <button
                className="btn btn-danger m-2"
                onClick={() =>
                  // setTodos(todos.filter((_, index) => index !== id))
                  setTodos((prevTodos) => {
                    setKeysUsed((prevKeysUsed) =>
                      prevKeysUsed.filter((_, key) => key !== id)
                    );
                    localStorage.setItem(
                      "App.todos",
                      JSON.stringify(
                        prevTodos.filter((_, index) => index !== id)
                      )
                    );
                    return prevTodos.filter((_, index) => index !== id);
                  })
                }
              >
                remove todo
              </button>
            </li>
          </div>
        ))}
      </ul>
      <form className="m-2" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="m-2">Enter todo:</label>
          <input
            type="text"
            className="form-control m-2"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary m-2">
          submit
        </button>
      </form>
      <a href="#" className="btn btn-danger m-3" onClick={handleLogout}>
        Log out
      </a>
    </>
  );
};

export default Todo;
