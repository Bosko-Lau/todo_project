import { cookies } from "next/headers";
import dynamic from "next/dynamic";

const TodoSkeleton = dynamic(() => import("@/components/TodoSkeleton"));

const Todo = async () => {
  const username = cookies().get("username") || "";
  const password = cookies().get("password") || "";
  return (
    <>
      <TodoSkeleton username={username} password={password} />
    </>
  );
};

export default Todo;
