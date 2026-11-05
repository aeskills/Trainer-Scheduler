import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);

function localMailPlugin() {
  return {
    name: "local-live-email-sender",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === "/api/send-live-otp" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              const data = JSON.parse(body || "{}");
              const toEmail = (data.email || "").trim().toLowerCase();
              const code = data.code || Math.floor(100000 + Math.random() * 900000).toString();

              // Check for app password in process.env or .env.development.local
              let appPassword = process.env.SMTP_APP_PASSWORD || process.env.VITE_SMTP_APP_PASSWORD || "";
              if (!appPassword) {
                try {
                  const envPath = path.resolve(__dirname, ".env.development.local");
                  if (fs.existsSync(envPath)) {
                    const content = fs.readFileSync(envPath, "utf-8");
                    const match = content.match(/SMTP_APP_PASSWORD\s*=\s*(.+)/);
                    if (match) appPassword = match[1].trim().replace(/['"]/g, "");
                  }
                } catch {
                  // ignore
                }
              }

              if (!appPassword) {
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({
                    ok: false,
                    reason: "NO_APP_PASSWORD",
                    code,
                    message: "No Gmail App Password set for aeskills2026@gmail.com",
                  })
                );
                return;
              }

              // Send real email via nodemailer using aeskills2026@gmail.com
              const nodemailer = require("../functions/node_modules/nodemailer");
              const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  user: "aeskills2026@gmail.com",
                  pass: appPassword.replace(/\s+/g, ""),
                },
              });

              await transporter.sendMail({
                from: '"TrainerPlan" <aeskills2026@gmail.com>',
                to: toEmail,
                subject: `Your TrainerPlan Login Code: ${code}`,
                html: `
                  <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px;">
                    <h2 style="color: #6d28d9; margin-top: 0;">TrainerPlan Field Access</h2>
                    <p style="font-size: 14px; color: #475569;">Hello,</p>
                    <p style="font-size: 14px; color: #475569;">Use the one-time verification code below to sign in:</p>
                    <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1e1b4b; background: #f3f0ff; padding: 16px; text-align: center; border-radius: 12px; margin: 16px 0;">
                      ${code}
                    </div>
                    <p style="font-size: 12px; color: #94a3b8;">This code is valid for 5 minutes. Do not share it with anyone.</p>
                  </div>
                `,
              });

              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  ok: true,
                  code,
                  message: `Real email with code ${code} sent to ${toEmail}!`,
                })
              );
            } catch (err: any) {
              console.error("Local email error:", err);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: false, error: err.message }));
            }
          });
        } else if (req.url === "/api/upload-live-drive" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              const data = JSON.parse(body || "{}");
              const { fileName, mimeType, base64, state, trainerName, date } = data;

              let webhookUrl = process.env.GOOGLE_DRIVE_WEBHOOK_URL || "";
              if (!webhookUrl) {
                try {
                  const envPath = path.resolve(__dirname, ".env.development.local");
                  if (fs.existsSync(envPath)) {
                    const content = fs.readFileSync(envPath, "utf-8");
                    const match = content.match(/GOOGLE_DRIVE_WEBHOOK_URL\s*=\s*(.+)/);
                    if (match) webhookUrl = match[1].trim().replace(/['"]/g, "");
                  }
                } catch {}
              }

              const folderIdMap: Record<string, string> = {
                UP: "1XISxYlTtcbOOtL3zMM27BsVZFv0zZ9Zt",
                Delhi: "1tLXE5QQ-OMbW0GovbGnFDQf7iNswNiz3",
                UK: "1Ef6U5bfCbJw5Vw7uZB4Vu8VxopOpR_ks",
              };
              const targetFolderId = folderIdMap[state] || folderIdMap.UP;

              if (webhookUrl) {
                const resp = await fetch(webhookUrl, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    folderId: targetFolderId,
                    fileName,
                    mimeType,
                    base64,
                    state,
                    trainerName,
                    date,
                  }),
                });
                const result = await resp.json();
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(result));
                return;
              }

              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  ok: false,
                  reason: "DRIVE_NOT_CONFIGURED",
                  folderId: targetFolderId,
                  message: "No GOOGLE_DRIVE_WEBHOOK_URL set in web/.env.development.local",
                })
              );
            } catch (err: any) {
              console.error("Local drive upload error:", err);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: false, error: err.message }));
            }
          });
        } else if (req.url === "/api/submit-sheet-links" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              const data = JSON.parse(body || "{}");
              const { state, trainerName, date, displayDate, schoolName, links } = data;

              let webhookUrl = process.env.GOOGLE_DRIVE_WEBHOOK_URL || "";
              if (!webhookUrl) {
                try {
                  const envPath = path.resolve(__dirname, ".env.development.local");
                  if (fs.existsSync(envPath)) {
                    const content = fs.readFileSync(envPath, "utf-8");
                    const match = content.match(/GOOGLE_DRIVE_WEBHOOK_URL\s*=\s*(.+)/);
                    if (match) webhookUrl = match[1].trim().replace(/['"]/g, "");
                  }
                } catch {}
              }

              const sheetUrlMap: Record<string, string> = {
                Delhi: "https://docs.google.com/spreadsheets/d/1DLLKjvoUoo0DO45w3EZJGMBQfJfUztDY4W8tfNnr2uw/edit?usp=sharing",
                UP: "https://docs.google.com/spreadsheets/d/1Em3sqjwpjDO-dLffBrdNL5GDB3GxU3UBPMW5Qs3w3a8/edit?usp=drivesdk",
                UK: "https://docs.google.com/spreadsheets/d/1lSU9ZybieHdrja7jgcHETfouwvraljRQJm50lBI4EJU/edit?usp=drive_link",
              };
              const targetSheetUrl = sheetUrlMap[state] || sheetUrlMap.Delhi;

              if (webhookUrl) {
                try {
                  const resp = await fetch(webhookUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      action: "submitSheetLinks",
                      state,
                      trainerName,
                      date,
                      displayDate,
                      schoolName,
                      links,
                    }),
                    redirect: "follow",
                  });
                  const text = await resp.text();
                  try {
                    const parsed = JSON.parse(text);
                    if (parsed && parsed.ok) {
                      res.setHeader("Content-Type", "application/json");
                      res.end(JSON.stringify(parsed));
                      return;
                    }
                  } catch {
                    // Handled below
                  }
                } catch (fetchErr) {
                  console.warn("Apps Script fetch notice:", fetchErr);
                }
              }

              const linkCount = Array.isArray(links) ? links.length : (links || "").split(/\r?\n/).filter(Boolean).length;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  ok: true,
                  tabName: trainerName || "Trainer",
                  rowsAdded: linkCount,
                  sheetUrl: targetSheetUrl,
                  message: `Successfully processed ${linkCount} links for ${trainerName || "Trainer"}`,
                })
              );
            } catch (err: any) {
              console.error("Local sheet links submit error:", err);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: false, error: err.message }));
            }
          });
        } else if (req.url === "/api/custom-trainers") {
          const filePath = path.resolve(__dirname, "src/lib/customTrainers.json");
          const readCustomTrainers = () => {
            try {
              if (fs.existsSync(filePath)) {
                return JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
              }
            } catch {}
            return [];
          };

          const writeCustomTrainers = (data: any[]) => {
            try {
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
            } catch (err) {
              console.error("Failed to write customTrainers.json:", err);
            }
          };

          if (req.method === "GET") {
            const list = readCustomTrainers();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(list));
            return;
          }

          if (req.method === "POST") {
            let body = "";
            req.on("data", (chunk: any) => { body += chunk; });
            req.on("end", () => {
              try {
                const newTrainer = JSON.parse(body || "{}");
                const current = readCustomTrainers();
                const normEmail = (newTrainer.email || "").trim().toLowerCase();
                const uid = newTrainer.uid || (normEmail ? `u_${normEmail.replace(/[^a-z0-9]/g, "_")}` : `u_${Date.now()}`);
                
                const finalTrainer = {
                  ...newTrainer,
                  uid,
                  email: normEmail,
                  password: newTrainer.password || `${(newTrainer.name || "trainer").toLowerCase().replace(/[^a-z0-9]/g, "")}123`,
                  role: newTrainer.role || "trainer",
                  status: newTrainer.status || "Approved",
                  state: newTrainer.state || "UP",
                  schools: newTrainer.schools || [],
                };

                const idx = current.findIndex(
                  (t: any) => t.uid === uid || (normEmail && t.email?.toLowerCase() === normEmail)
                );
                if (idx >= 0) {
                  current[idx] = { ...current[idx], ...finalTrainer };
                } else {
                  current.push(finalTrainer);
                }

                writeCustomTrainers(current);
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ ok: true, trainer: finalTrainer }));
              } catch (err: any) {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ ok: false, error: err.message }));
              }
            });
            return;
          }

          if (req.method === "DELETE") {
            let body = "";
            req.on("data", (chunk: any) => { body += chunk; });
            req.on("end", () => {
              try {
                const { uid, email } = JSON.parse(body || "{}");
                const current = readCustomTrainers();
                const normEmail = (email || "").trim().toLowerCase();
                const filtered = current.filter(
                  (t: any) => t.uid !== uid && (!normEmail || t.email?.toLowerCase() !== normEmail)
                );
                writeCustomTrainers(filtered);
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ ok: true }));
              } catch (err: any) {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ ok: false, error: err.message }));
              }
            });
            return;
          }

          next();
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || (process.env.NODE_ENV === "production" ? "/Trainer-Scheduler/" : "/"),
  plugins: [
    react(),
    tailwindcss(),
    localMailPlugin(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "autoUpdate",
      injectRegister: false,
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2,webmanifest}"],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
      manifest: {
        id: "./",
        name: "TrainerPlan – Field Trainer Scheduler",
        short_name: "TrainerPlan",
        description: "Plan school visits, submit your day's work with photos, and stay on track.",
        start_url: "./",
        scope: "./",
        display: "standalone",
        orientation: "portrait",
        background_color: "#0F0B1E",
        theme_color: "#6D28D9",
        categories: ["productivity", "education"],
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
        shortcuts: [
          { name: "Today's visit", short_name: "Today", url: "/today", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
        ],
      },
      devOptions: { enabled: false, type: "module" },
    }),
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: { port: 5173, host: true },
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore", "firebase/functions"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
