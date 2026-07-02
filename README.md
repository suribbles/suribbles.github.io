# Suri Manekar | Portfolio

**Live at:** [suribbles.github.io](https://suribbles.github.io)

A professional portfolio showcasing my work as an AI-First Experience Designer & Strategist. 15+ years of expertise in analytics dashboards, AI implementation, and strategic UX design.

---

## 🎯 What's Included

This portfolio features:
- **Landing Page** — Professional hero section with headline and call-to-actions
- **About Section** — Bio and core skills/capabilities
- **Projects Grid** — 6 featured projects with descriptions and links
- **Contact Section** — Links to GitHub, LinkedIn, and email
- **Responsive Design** — Works beautifully on desktop, tablet, and mobile

---

## 📁 File Structure

```
suribbles.github.io/
├── index.html          (Main portfolio page)
├── README.md           (This file)
└── (Optional) css/     (Future: separate stylesheets)
└── (Optional) assets/  (Future: images, logos)
```

---

## 🎨 Customization Guide

### 1. **Update Contact Information**
In `index.html`, find the Contact section and update:
- LinkedIn URL: `https://linkedin.com` → your LinkedIn
- Email: `mailto:your.email@example.com` → your actual email

### 2. **Update Project Links**
Each project card has a GitHub link. Update these URLs:

```html
<a href="https://github.com/suribbles/powerpoint-automation" class="project-link">View Project</a>
```

Replace with actual repo URLs, or link to case studies/Figma files.

### 3. **Add Project Images** (Optional)
To add a thumbnail above each project card:
1. Create an `/assets` folder in your repo
2. Upload project images (PNG or JPG)
3. Add this line before the project title:

```html
<img src="assets/project-thumbnail.png" alt="Project name" style="width:100%; border-radius: 4px; margin-bottom: 1rem;">
```

### 4. **Change Colors**
The portfolio uses ServiceNow brand colors. To customize:
- **Primary Dark:** `#032D42` (Infinite Blue)
- **Accent Green:** `#63DF4E` (Wasabi Green)
- **Secondary:** `#044355` (Dark Teal)

Search/replace in the `<style>` section.

### 5. **Add More Projects**
Copy a project-card block and paste a new one:

```html
<div class="project-card">
    <span class="project-tag ai">Tag</span>
    <h3>Project Title</h3>
    <p>Project description...</p>
    <a href="#" class="project-link">View Project</a>
</div>
```

---

## 🚀 How to Deploy (It's Already Live!)

Since your repo is named `suribbles.github.io`, GitHub Pages automatically serves your `index.html` as your website.

**Your site is live now at:** `https://suribbles.github.io`

No additional setup needed—just push changes and they'll go live within seconds.

---

## 📝 How to Update Your Portfolio

1. **Edit the file locally:**
   - Download `index.html` from your repo
   - Edit in a text editor (VS Code, Notepad, etc.)
   - Save

2. **Upload back to GitHub:**
   - Go to your repo: `github.com/suribbles/suribbles.github.io`
   - Click "Upload files"
   - Drag `index.html` and drop
   - Add commit message: "Update portfolio"
   - Click "Commit changes"

3. **See your changes live:**
   - Wait 10-30 seconds
   - Refresh `suribbles.github.io`
   - Your changes appear

---

## 🎯 Next Steps

1. **Customize contact info** (email, LinkedIn)
2. **Add real project links** (GitHub repos or case study pages)
3. **Optional:** Add project images to `/assets`
4. **Share:** Send `suribbles.github.io` link in your LinkedIn, email signature, portfolio applications

---

## 💡 Ideas for Expansion

- Add a **blog section** for articles on AI design, UX strategy
- Create **case study pages** (separate HTML files) with detailed project walkthroughs
- Add **testimonials** from colleagues or clients
- Include **resume download** link
- Create a **skills/services menu** with detailed breakdowns

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Responsive grid layout
- **GitHub Pages** — Free hosting
- **No JavaScript required** — Pure HTML/CSS

---

**Built with design, strategy, and a little AI magic.** ✨
