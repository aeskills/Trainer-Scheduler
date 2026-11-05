#!/usr/bin/env node
/**
 * One-time helper: obtain a Google Drive OAuth refresh token for the sender/owner
 * Gmail account (aeskills2026@gmail.com) so Cloud Functions can upload into its Drive.
 *
 * Usage:
 *   GOOGLE_OAUTH_CLIENT_ID=xxx GOOGLE_OAUTH_CLIENT_SECRET=yyy npm run drive:token
 *
 * The OAuth client must be of type "Desktop app" (loopback redirect allowed).
 * Sign in as aeskills2026@gmail.com when the browser opens.
 */
import http from "node:http";
import { exec } from "node:child_process";
import { auth } from "@googleapis/drive";

const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  console.error("Set GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET env vars first.");
  process.exit(1);
}

const PORT = 53682;
const redirectUri = `http://127.0.0.1:${PORT}/oauth2callback`;
const client = new auth.OAuth2(clientId, clientSecret, redirectUri);
const url = client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  login_hint: "aeskills2026@gmail.com",
  scope: ["https://www.googleapis.com/auth/drive"],
});

const server = http.createServer(async (req, res) => {
  if (!req.url?.startsWith("/oauth2callback")) return res.end();
  const code = new URL(req.url, redirectUri).searchParams.get("code");
  try {
    const { tokens } = await client.getToken(code);
    res.end("<h2>Done! You can close this tab and return to the terminal.</h2>");
    console.log("\n✅ Refresh token (store it as a secret):\n");
    console.log(tokens.refresh_token);
    console.log("\nfirebase functions:secrets:set GOOGLE_OAUTH_REFRESH_TOKEN\n");
  } catch (e) {
    res.end("Token exchange failed – see terminal.");
    console.error(e);
  } finally {
    server.close();
  }
});

server.listen(PORT, () => {
  console.log("Opening browser for Google sign-in… If it doesn't open, visit:\n\n" + url + "\n");
  const opener = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  exec(`${opener} "${url}"`);
});
