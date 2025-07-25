import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import sharp from "sharp";
import crypto from "crypto";

// Define color palettes for OG images
const PALETTES = [
  { name: "ocean", gradient: ["#007AFF", "#5AC8FA"], text: "#FFFFFF" },
  { name: "sunset", gradient: ["#FF2D55", "#FF9500"], text: "#FFFFFF" },
  { name: "forest", gradient: ["#34C759", "#30D158"], text: "#FFFFFF" },
  { name: "purple", gradient: ["#5856D6", "#AF52DE"], text: "#FFFFFF" },
  { name: "midnight", gradient: ["#191919", "#2C2C2E"], text: "#FFFFFF" },
  { name: "gold", gradient: ["#FF9500", "#FFCC00"], text: "#000000" },
  { name: "rose", gradient: ["#FF375F", "#FF6482"], text: "#FFFFFF" },
  { name: "teal", gradient: ["#30D0C6", "#64D2FF"], text: "#000000" }
];

// Hash function to deterministically select palette
function hashString(str: string): number {
  const hash = crypto.createHash('sha256').update(str).digest();
  return hash.readUInt32BE(0);
}

// Calculate days remaining to match frontend logic
function calculateDaysRemaining(): number {
  const targetDate = new Date("2025-12-25T23:59:59");
  // Set to end of day to match frontend calculation (23:59:59.999)
  targetDate.setHours(23, 59, 59, 999);
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate social media preview card with dynamic palette
  app.get("/api/social-preview", async (req, res) => {
    try {
      const days = calculateDaysRemaining();
      
      // Get countdownId (using target date as ID) and paletteId from query
      const countdownId = req.query.countdownId as string || targetDate.toISOString();
      const providedPaletteId = req.query.paletteId ? parseInt(req.query.paletteId as string) : null;
      
      // Determine palette index
      let paletteIdx: number;
      if (providedPaletteId !== null && providedPaletteId >= 0 && providedPaletteId < PALETTES.length) {
        paletteIdx = providedPaletteId;
      } else {
        // Deterministically select palette based on countdownId
        const hashValue = hashString(countdownId);
        paletteIdx = hashValue % PALETTES.length;
      }
      
      const palette = PALETTES[paletteIdx];
      
      // Create square preview card with selected palette
      const svgCard = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${palette.gradient[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${palette.gradient[1]};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background gradient -->
  <rect width="512" height="512" fill="url(#gradient)"/>
  
  <!-- Big number -->
  <text x="256" y="280" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="180" font-weight="bold" text-anchor="middle" fill="${palette.text}">${days}</text>
  
  <!-- Subtitle -->
  <text x="256" y="350" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="36" font-weight="500" text-anchor="middle" fill="${palette.text}" opacity="0.9">DAYS</text>
</svg>`;
      
      const pngBuffer = await sharp(Buffer.from(svgCard))
        .png()
        .toBuffer();
      
      res.setHeader('Content-Type', 'image/png');
      // Cache based on palette ID for CDN efficiency
      res.setHeader('Cache-Control', `public, max-age=3600, s-maxage=86400`);
      res.setHeader('ETag', `"${countdownId}-${paletteIdx}-${days}"`);
      res.send(pngBuffer);
    } catch (error) {
      console.error('Error generating social preview:', error);
      res.status(500).send('Error generating preview');
    }
  });

  // Alternative endpoint structure: /og/countdown/{id}.png
  app.get("/og/countdown/:id", async (req, res) => {
    try {
      // Remove .png extension if present
      const countdownId = req.params.id.replace(/\.png$/, '');
      const days = calculateDaysRemaining();
      
      // Get paletteId from query
      const providedPaletteId = req.query.palette ? parseInt(req.query.palette as string) : null;
      
      // Determine palette index
      let paletteIdx: number;
      if (providedPaletteId !== null && providedPaletteId >= 0 && providedPaletteId < PALETTES.length) {
        paletteIdx = providedPaletteId;
      } else {
        // Deterministically select palette based on countdownId
        const hashValue = hashString(countdownId);
        paletteIdx = hashValue % PALETTES.length;
      }
      
      const palette = PALETTES[paletteIdx];
      
      // Create square preview card with selected palette
      const svgCard = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${palette.gradient[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${palette.gradient[1]};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background gradient -->
  <rect width="512" height="512" fill="url(#gradient)"/>
  
  <!-- Big number -->
  <text x="256" y="280" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="180" font-weight="bold" text-anchor="middle" fill="${palette.text}">${days}</text>
  
  <!-- Subtitle -->
  <text x="256" y="350" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="36" font-weight="500" text-anchor="middle" fill="${palette.text}" opacity="0.9">DAYS</text>
</svg>`;
      
      const pngBuffer = await sharp(Buffer.from(svgCard))
        .png()
        .toBuffer();
      
      res.setHeader('Content-Type', 'image/png');
      // Cache based on palette ID for CDN efficiency
      res.setHeader('Cache-Control', `public, max-age=3600, s-maxage=86400`);
      res.setHeader('ETag', `"${countdownId}-${paletteIdx}-${days}"`);
      res.send(pngBuffer);
    } catch (error) {
      console.error('Error generating countdown preview:', error);
      res.status(500).send('Error generating preview');
    }
  });

  // Generate dynamic icon with countdown number
  app.get("/api/dynamic-icon", async (req, res) => {
    try {
      const days = calculateDaysRemaining();
      
      // Create SVG icon with the day count
      const svgIcon = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#007AFF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0051D5;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="90" ry="90" fill="url(#bg)"/>
  <text x="256" y="300" font-family="system-ui, -apple-system, sans-serif" font-size="${days > 99 ? '120' : '140'}" font-weight="bold" text-anchor="middle" fill="white">${days}</text>
  <text x="256" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="40" font-weight="500" text-anchor="middle" fill="rgba(255,255,255,0.8)">DAYS</text>
</svg>`;
      
      // Convert SVG to PNG using Sharp
      const pngBuffer = await sharp(Buffer.from(svgIcon))
        .png()
        .resize(512, 512)
        .toBuffer();
      
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.send(pngBuffer);
    } catch (error) {
      console.error('Error generating dynamic icon:', error);
      res.status(500).send('Error generating icon');
    }
  });

  // API endpoint for countdown data
  app.get("/api/countdown-data", (req, res) => {
    const targetDate = new Date("2025-12-25T23:59:59");
    // Set to end of day to match frontend calculation (23:59:59.999)
    targetDate.setHours(23, 59, 59, 999);
    const now = new Date();
    const diffMs = targetDate.getTime() - now.getTime();
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    const countdownText = `${days} days, ${hours} hours, ${minutes} minutes remaining`;
    
    res.json({
      days,
      hours,
      minutes,
      seconds,
      countdownText,
      ogTitle: `Forever Countdown - ${days} Days Left`,
      ogDescription: `Hey jaani, ${countdownText} until forever with you :)`,
      pageTitle: `Countdown Widget - ${days} Days Remaining`
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
