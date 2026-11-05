import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const iconsDir = path.join(publicDir, "icons");
fs.mkdirSync(iconsDir, { recursive: true });

// Create clean SVG logo: Purple/Indigo gradient with 'T' and a subtle check/calendar mark
const svgLogo = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#7C3AED" />
      <stop offset="100%" stop-color="#4F46E5" />
    </linearGradient>
    <linearGradient id="glow" x1="256" y1="64" x2="256" y2="448" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#grad)" />
  <rect x="24" y="24" width="464" height="464" rx="104" stroke="url(#glow)" stroke-width="8" />
  <!-- Stylized 'T' with calendar grid notch -->
  <path d="M140 160C140 148.954 148.954 140 160 140H352C363.046 140 372 148.954 372 160V196C372 207.046 363.046 216 352 216H284V352C284 363.046 275.046 372 264 372H248C236.954 372 228 363.046 228 352V216H160C148.954 216 140 207.046 140 196V160Z" fill="#FFFFFF" />
  <!-- Check / sparkle accent -->
  <circle cx="356" cy="340" r="32" fill="#10B981" />
  <path d="M344 340L352 348L368 332" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

fs.writeFileSync(path.join(iconsDir, "logo.svg"), svgLogo.trim());

async function generate() {
  const buf = Buffer.from(svgLogo);

  await sharp(buf).resize(192, 192).png().toFile(path.join(iconsDir, "icon-192.png"));
  await sharp(buf).resize(512, 512).png().toFile(path.join(iconsDir, "icon-512.png"));
  await sharp(buf).resize(512, 512).png().toFile(path.join(iconsDir, "icon-maskable-512.png"));
  await sharp(buf).resize(180, 180).png().toFile(path.join(iconsDir, "apple-touch-icon.png"));
  await sharp(buf).resize(72, 72).png().toFile(path.join(iconsDir, "badge-72.png"));

  console.log("✅ Icons generated successfully in public/icons/");
}

generate().catch(console.error);
