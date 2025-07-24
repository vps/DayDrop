import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import sharp from "sharp";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate dynamic icon with countdown number
  app.get("/api/dynamic-icon", async (req, res) => {
    try {
      const targetDate = new Date("2025-12-25T23:59:59");
      const now = new Date();
      const diffMs = targetDate.getTime() - now.getTime();
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
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
