"use server";

import { getServerClient } from "@/lib/wix";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction() {
  const client = await getServerClient();
  const data = client.auth.generateOAuthData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/login-callback`,
    process.env.NEXT_PUBLIC_BASE_URL
  );
  (await cookies()).set("oauth", JSON.stringify(data));
  const { authUrl } = await client.auth.getAuthUrl(data);
  redirect(authUrl);
}
