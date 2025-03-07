"use server";

import { getServerClient } from "@/lib/wix";
import { OauthData } from "@wix/sdk";
import { cookies } from "next/headers";

export async function loginCallbackAction(url: string) {
  const client = await getServerClient();
  const returnedOAuthData = client.auth.parseFromUrl(url);

  if (returnedOAuthData.error) {
    throw new Error(returnedOAuthData.errorDescription);
  }

  const oauthDataStr = (await cookies()).get("oauthRedirectData")?.value;
  (await cookies()).delete("oauthRedirectData");

  if (!oauthDataStr) {
    return new Response("No oauth data found", { status: 400 });
  }

  const oauthData = JSON.parse(oauthDataStr) as OauthData;

  const memberTokens = await client.auth.getMemberTokens(
    returnedOAuthData.code,
    returnedOAuthData.state,
    oauthData
  );

  const serializableTokens = {
    accessToken: memberTokens.accessToken,
    refreshToken: memberTokens.refreshToken,
  };

  (await cookies()).set("session", JSON.stringify(serializableTokens));
}
