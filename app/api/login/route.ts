import prisma from "@/lib/prisma";
import crypto from "crypto";

interface reqBody {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  const { username, password }: reqBody = await req.json();
  const user = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ status: false, hash: "" }));
  }
  const salt = process.env.SALT || "testSalt";
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return new Response(
    JSON.stringify({
      status: crypto.timingSafeEqual(
        Buffer.from(hash, "hex"),
        Buffer.from(user.password, "hex")
      ),
      hash,
    })
  );
}
