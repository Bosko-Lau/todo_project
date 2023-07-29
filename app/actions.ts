"use server";

interface CreateuserFormData {
  username: string;
  password: string;
}

export async function createuser(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");
}
