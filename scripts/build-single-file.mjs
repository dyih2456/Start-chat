import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('Building standalone single-file React app...');

// 1. Run vite build with singlefile plugin
execSync('npx vite build --config vite.singlefile.config.ts', {
  stdio: 'inherit',
});

const singleHtmlPath = path.resolve('dist-single', 'index.html');
if (!fs.existsSync(singleHtmlPath)) {
  console.error('Failed to locate dist-single/index.html');
  process.exit(1);
}

let htmlContent = fs.readFileSync(singleHtmlPath, 'utf8');

// 2. Inline favicon SVG if present
const iconSvgPath = path.resolve('public', 'icon.svg');
if (fs.existsSync(iconSvgPath)) {
  const svgData = fs.readFileSync(iconSvgPath, 'utf8');
  const base64Svg = Buffer.from(svgData).toString('base64');
  const dataUri = `data:image/svg+xml;base64,${base64Svg}`;
  htmlContent = htmlContent.replace(/href=["']\.\/icon\.svg["']/g, `href="${dataUri}"`);
  htmlContent = htmlContent.replace(/href=["']\.\/pwa-192x192\.png["']/g, `href="${dataUri}"`);
}

// 3. Remove manifest link so standalone HTML file runs purely self-contained without 404s
htmlContent = htmlContent.replace(/<link rel="manifest"[^>]*>/gi, '');

// 4. Save to public/direct-chat.html and direct-chat.html
fs.writeFileSync(path.resolve('public', 'direct-chat.html'), htmlContent);
fs.writeFileSync(path.resolve('direct-chat.html'), htmlContent);

console.log('✅ Generated identical standalone public/direct-chat.html & direct-chat.html');
console.log('File size:', (htmlContent.length / 1024).toFixed(1), 'KB');
