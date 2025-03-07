import { items } from "@wix/data";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { members, authorization } from "@wix/members";
import { cookies } from "next/headers";

export const client = createClient({
  modules: { items },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID as string,
  }),
});

export async function getServerClient() {
  const session = (await cookies()).get("session")?.value || "null";
  return createClient({
    modules: { items, members, authorization },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: JSON.parse(session),
    }),
  });
}

export async function getMember() {
  const client = await getServerClient();

  if (!client.auth.loggedIn()) {
    return undefined;
  }

  const { member } = await client.members.getCurrentMember();

  return member
    ? {
        id: member._id,
        loginEmail: member.loginEmail,
        nickname: member.profile?.nickname,
        slug: member.profile?.slug,
      }
    : undefined;
}
