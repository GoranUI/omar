# Omar Hammouda - UI/UX Designer Portfolio

A modern portfolio website built with Tailwind CSS v4, featuring responsive navigation and a beautiful hero section.

## 🚀 Quick Start

### Prerequisites
- Node.js (for npm scripts)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GoranUI/omar.git
   cd omar
   ```

2. **Download Tailwind CSS binary**
   ```bash
   # For macOS ARM64 (Apple Silicon)
   curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64
   chmod +x tailwindcss-macos-arm64
   mv tailwindcss-macos-arm64 tailwindcss
   
   # For macOS Intel
   curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-x64
   chmod +x tailwindcss-macos-x64
   mv tailwindcss-macos-x64 tailwindcss
   
   # For Linux
   curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
   chmod +x tailwindcss-linux-x64
   mv tailwindcss-linux-x64 tailwindcss
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Build CSS**
   ```bash
   npm run build:css
   ```

5. **Open in browser**
   ```bash
   open public/index.html
   ```

## 📁 Project Structure

```
omar/
├── src/
│   └── input.css          # Source CSS with Tailwind imports
├── public/
│   ├── index.html         # Main HTML file
│   └── output.css         # Generated CSS (build output)
├── tailwindcss            # CLI binary (download separately)
├── tailwind.config.js     # Tailwind configuration
├── package.json           # Project dependencies
└── .gitignore            # Git ignore rules
```

## 🛠️ Development

### Build CSS (one-time)
```bash
npm run build:css
```

### Watch for changes (development)
```bash
npm run watch:css
```

### Manual build
```bash
./tailwindcss -i src/input.css -o public/output.css
```

## 🎨 Features

- **Responsive Navigation** - Works on desktop and mobile
- **Modern Hero Section** - With testimonials and project showcase
- **Tailwind CSS v4** - Latest version with standalone CLI
- **Clean Architecture** - Separated source and public files
- **Performance Optimized** - Only includes used CSS classes

## 📱 Responsive Design

- **Desktop**: Full navigation with all links visible
- **Mobile**: Compact design with horizontal scrolling
- **Tablet**: Adaptive layout between desktop and mobile

## 🎯 Key Components

### Navigation
- Backdrop blur effects
- Gradient buttons with shadows
- Smooth hover transitions
- Mobile-friendly horizontal scrolling

### Hero Section
- Large typography with proper font weights
- Role badge with icon
- CTA buttons with gradient effects
- Testimonials with subtle rotations
- Project grid with hover animations

## 🔧 Customization

### Adding Custom Styles
Edit `src/input.css`:
```css
@config "../tailwind.config.js";
@import "tailwindcss";

/* Your custom styles here */
.custom-class {
  @apply bg-blue-500 text-white;
}
```

### Configuration
Edit `tailwind.config.js` to customize:
- Content paths
- Theme colors
- Custom utilities
- Plugins

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

- **Portfolio**: [omar-hammouda.com](https://omar-hammouda.com)
- **Email**: [contact@omar-hammouda.com](mailto:contact@omar-hammouda.com)
- **LinkedIn**: [linkedin.com/in/omar-hammouda](https://linkedin.com/in/omar-hammouda) 