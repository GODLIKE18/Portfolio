# Praveen's Portfolio Website

A modern, responsive, and interactive personal portfolio website built with cutting-edge web technologies.

## 🌟 Features

### ✨ Modern Design
- Clean, professional layout with smooth animations
- Dark/Light theme toggle with system preference detection
- Glassmorphism effects and gradient backgrounds
- Responsive design that works perfectly on all devices

### 🚀 Performance
- Optimized loading with preloader animation
- Lazy loading for images and content
- Smooth scrolling and buttery animations
- Performance monitoring and optimization

### 💫 Interactive Elements
- Custom cursor effects
- Particle system with constellation effect
- Typing animation for dynamic text
- Hover effects and micro-interactions
- Smooth page transitions

### 📱 Mobile First
- Touch-friendly navigation
- Gesture support for mobile devices
- Responsive typography and spacing
- Optimized for all screen sizes

### 🔧 Advanced Features
- Contact form with validation
- Project filtering system
- Skill progress bars with animations
- Timeline for experience section
- SEO optimized structure
- PWA ready (Service Worker included)

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with custom properties, Grid, and Flexbox
- **JavaScript (ES6+)**: Modular architecture with classes
- **AOS Library**: Animate On Scroll effects

### Design & UX
- **Google Fonts**: Inter and JetBrains Mono
- **Font Awesome**: Icon library for consistent iconography
- **Custom Animations**: CSS keyframes and JavaScript animations
- **Responsive Design**: Mobile-first approach

### Performance
- **Intersection Observer**: Efficient scroll-based animations
- **RequestAnimationFrame**: Smooth 60fps animations
- **Debounced Events**: Optimized scroll and resize handlers
- **Lazy Loading**: Improved page load times

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main stylesheet
│   ├── animations.css     # Animation definitions
│   └── responsive.css     # Responsive design rules
├── js/
│   ├── main.js           # Core functionality
│   ├── animations.js     # Animation controller
│   └── particles.js      # Particle effects system
├── assets/
│   ├── images/           # Image assets
│   └── icons/            # Icon assets
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Serve the files**
   
   Using Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   Using Node.js:
   ```bash
   npx serve .
   ```
   
   Using VS Code Live Server extension:
   - Install Live Server extension
   - Right-click on index.html
   - Select "Open with Live Server"

3. **Open in browser**
   Navigate to `http://localhost:8000` (or your chosen port)

## 🎨 Customization

### Colors and Theme
Edit CSS custom properties in `css/style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* Add your custom colors */
}
```

### Content
Update the HTML content in `index.html`:
- Personal information in the hero section
- Skills and technologies
- Project details
- Work experience
- Contact information

### Images
Replace placeholder images in `assets/images/`:
- `profile.jpg` - Your profile picture
- `about-img.jpg` - About section image
- `project1.jpg`, `project2.jpg`, etc. - Project screenshots

### Animations
Customize animations in `css/animations.css` and `js/animations.js`:
- Modify existing animations
- Add new animation effects
- Adjust timing and easing functions

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile, Samsung Internet)

## ⚡ Performance Tips

### Optimization Checklist
- [ ] Compress and optimize images
- [ ] Minify CSS and JavaScript
- [ ] Enable gzip compression
- [ ] Set up proper caching headers
- [ ] Use a Content Delivery Network (CDN)

### Image Optimization
```bash
# Using ImageMagick
convert input.jpg -quality 85 -resize 800x600 output.jpg

# Using web formats
convert input.jpg -quality 85 output.webp
```

## 🔧 Development

### Code Structure
- **Modular JavaScript**: Each feature in its own module
- **CSS Architecture**: Organized with custom properties and utilities
- **Component-based**: Reusable UI components
- **Performance First**: Optimized for speed and efficiency

### Adding New Features
1. Create feature-specific CSS in appropriate file
2. Add JavaScript functionality in separate module
3. Update HTML structure as needed
4. Test across different devices and browsers

## 📈 SEO & Analytics

### SEO Features Included
- Semantic HTML structure
- Meta tags for social sharing
- Proper heading hierarchy
- Alt text for images
- Fast loading times

### Analytics Setup
Add your tracking code before the closing `</body>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🌐 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to repository Settings
3. Enable GitHub Pages
4. Select source branch (usually `main`)

### Netlify
1. Connect GitHub repository to Netlify
2. Set build command (if needed): `npm run build`
3. Set publish directory: `.` (root)
4. Deploy automatically on git push

### Vercel
1. Import GitHub repository to Vercel
2. Configure deployment settings
3. Deploy with zero configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Praveen**
- Portfolio: [Your Portfolio URL]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn Profile]
- Email: your.email@example.com

## 🙏 Acknowledgments

- [AOS Library](https://michalsnik.github.io/aos/) for scroll animations
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- [Unsplash](https://unsplash.com/) for placeholder images

## 📊 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| ✅ Responsive Design | Complete | Works on all devices |
| ✅ Dark/Light Theme | Complete | Auto + manual toggle |
| ✅ Animations | Complete | Smooth, performant |
| ✅ Contact Form | Complete | Validation included |
| ✅ Project Filter | Complete | Category-based |
| ✅ SEO Optimized | Complete | Meta tags, structure |
| ✅ Accessibility | Complete | WCAG compliant |
| ✅ Performance | Complete | Lighthouse optimized |

---

Made with ❤️ and lots of ☕ by Praveen