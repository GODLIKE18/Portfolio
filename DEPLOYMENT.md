# Deployment Guide

## Quick Start - Local Development

### Option 1: Using the Batch File (Windows)
```bash
# Double-click or run in command prompt
start-server.bat
```

### Option 2: Using Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Option 3: Using Node.js
```bash
# Install serve globally
npm install -g serve

# Start server
serve . -p 8000
```

### Option 4: VS Code Live Server
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

---

## Production Deployment

### 1. GitHub Pages (Free)
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to repository Settings → Pages
4. Select source: Deploy from branch → main
5. Your site will be available at: `https://yourusername.github.io/repository-name`

### 2. Netlify (Free)
1. Create account at netlify.com
2. Drag and drop the portfolio folder to Netlify
3. Or connect your GitHub repository
4. Site will be deployed automatically
5. Optional: Configure custom domain

### 3. Vercel (Free)
1. Create account at vercel.com
2. Import your GitHub repository
3. Deploy with zero configuration
4. Optional: Configure custom domain

### 4. Firebase Hosting (Free tier)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init hosting

# Deploy
firebase deploy
```

---

## Custom Domain Setup

### For GitHub Pages:
1. Add CNAME file with your domain
2. Configure DNS A records:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

### For Netlify/Vercel:
1. Add custom domain in dashboard
2. Update DNS to point to their servers
3. SSL certificate will be automatically provided

---

## Performance Optimization

### Before Deployment:
1. Optimize images (use tools like TinyPNG)
2. Minify CSS and JavaScript
3. Enable gzip compression
4. Test with Lighthouse

### Image Optimization Commands:
```bash
# Using ImageMagick
convert input.jpg -quality 85 -resize 1200x800 output.jpg

# Using online tools
# - TinyPNG.com
# - Squoosh.app
# - ImageOptim (Mac)
```

---

## SEO Checklist

- [x] Meta tags included
- [x] Semantic HTML structure
- [x] Alt text for images
- [x] Fast loading times
- [x] Mobile responsive
- [x] robots.txt file
- [ ] Sitemap.xml (create if needed)
- [ ] Google Analytics (add your tracking ID)
- [ ] Open Graph images

---

## Environment Variables

Create `.env` file for sensitive data:
```
CONTACT_EMAIL=your-email@example.com
ANALYTICS_ID=your-analytics-id
```

---

## Browser Testing

Test your portfolio on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Maintenance

### Regular Updates:
1. Update project screenshots
2. Add new projects
3. Update skills and experience
4. Check for broken links
5. Monitor performance with Lighthouse

### Security:
1. Keep dependencies updated
2. Use HTTPS always
3. Regular security audits

---

## Troubleshooting

### Common Issues:

**Images not loading:**
- Check file paths are correct
- Ensure images are in assets/images/
- Use relative paths (./assets/images/...)

**Fonts not loading:**
- Check internet connection for Google Fonts
- Consider self-hosting fonts for better performance

**Animations not working:**
- Check if JavaScript is enabled
- Verify AOS library is loaded
- Test on different browsers

**Mobile issues:**
- Test on actual devices
- Use browser developer tools
- Check touch events work properly

### Getting Help:
1. Check browser console for errors
2. Validate HTML and CSS
3. Test on different devices
4. Ask for feedback from others

---

Made with ❤️ by Praveen