# Omar Hammouda - UI/UX Designer Portfolio

A modern portfolio website built with Tailwind CSS v4, featuring responsive navigation, beautiful hero section, and performance-optimized assets.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (for npm scripts)
- Git
- [FFmpeg](https://ffmpeg.org/) (for image/video compression)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GoranUI/omar.git
   cd omar
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Build CSS**
   ```bash
   npm run build:css
   ```
4. **Open in browser**
   ```bash
   open public/index.html
   ```

---

## 🖼️ How to Add Optimized Images & Videos

### 1. **Compress Images Before Uploading**
- **Recommended format:** WebP (best for web), PNG (fallback), AVIF (optional)
- **Resize images** to the maximum size needed (see below for typical sizes)
- **Use responsive variants** for hero/project images:
  - 800px wide (mobile)
  - 1200px wide (tablet)
  - 1600px wide (desktop)
  - Display size (exact size used in layout)

#### **Example: Compress and Create Responsive WebP Images**
```bash
# Requires ffmpeg installed
# Replace input.png with your source image

# 1. Create WebP variants
ffmpeg -i input.png -vf "scale=800:-1" -c:v libwebp -quality 80 output-800.webp
ffmpeg -i input.png -vf "scale=1200:-1" -c:v libwebp -quality 80 output-1200.webp
ffmpeg -i input.png -vf "scale=1600:-1" -c:v libwebp -quality 80 output-1600.webp

# 2. Create display-size variant (e.g., 923x467)
ffmpeg -i input.png -vf "scale=923:467" -c:v libwebp -quality 85 output-display.webp
```
- **Place images** in the appropriate `public/assets/images/` subfolder.
- **Update HTML**: Use the `<picture>` element with `srcset` for responsive loading (see existing code for examples).

### 2. **Compress Videos Before Uploading**
- **Recommended format:** MP4 (H.264, AAC audio)
- **Target size:** Under 5MB if possible
- **Recommended resolution:** 1280x720 or 1920x1080 (avoid 4K for web)

#### **Example: Compress MP4 Video for Web**
```bash
# Replace input.mp4 with your source video
ffmpeg -i input.mp4 -c:v libx264 -preset medium -crf 23 -maxrate 2M -bufsize 4M -movflags +faststart -pix_fmt yuv420p -y output-compressed.mp4
```
- **Place videos** in the appropriate `public/assets/images/[project]/` folder.
- **Update HTML**: Use the `<video>` tag with `autoplay loop muted playsinline` and a poster image.

### 3. **Test Your Assets**
- Open the site locally and check image/video quality and load speed.
- Use browser dev tools (Network tab) to verify file sizes and responsive loading.

---

## 📁 Project Structure

```
omar/
├── src/
│   └── input.css          # Source CSS with Tailwind imports
├── public/
│   ├── index.html         # Main HTML file
│   └── output.css         # Generated CSS (build output)
│   └── assets/
│       └── images/        # All images and videos (organized by project)
├── tailwind.config.js     # Tailwind configuration
├── package.json           # Project dependencies
└── .gitignore             # Git ignore rules
```

---

## 🛠️ Development

- **Build CSS (one-time):**
  ```bash
  npm run build:css
  ```
- **Watch for changes (dev):**
  ```bash
  npm run watch:css
  ```

