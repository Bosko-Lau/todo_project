import prisma from "@/lib/prisma";

interface reqBody {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  const { username, password }: reqBody = await req.json();
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
  return new Response(JSON.stringify({ redirect: user.password !== password }));
}
