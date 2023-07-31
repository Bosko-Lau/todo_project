import prisma, { Prisma } from "@/lib/prisma";

interface reqBody {
  username: string;
  password: string;
  todos: string;
}

export async function PUT(req: Request) {
  const { username, password, todos }: reqBody = await req.json();
  const _todos = JSON.parse(todos) as Prisma.JsonArray;
  if (!username || !password) {
    return new Response(JSON.stringify({ redirect: true }));
  }
  const user = await prisma.users.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    return new Response(JSON.stringify({ redirect: true }));
  }
  if (user.password !== password) {
    return new Response(JSON.stringify({ redirect: true }));
  }
  await prisma.users.update({
    where: {
      username,
    },
    data: {
      todos: _todos,
    },
  });
  return new Response(JSON.stringify({ redirect: false }));
}
