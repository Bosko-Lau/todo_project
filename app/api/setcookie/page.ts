import { cookies } from "next/headers";

interface ReqBody {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  const body: ReqBody = await req.json();

  cookies().set({
    name: "username",
    value: body.username,
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  cookies().set({
    name: "password",
    value: body.password,
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}
