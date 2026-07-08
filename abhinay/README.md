# Project Kavya ❤️

A cinematic, romantic, and elegant birthday website built for **Kavya** by **Abhinay**. Designed with a premium, minimalist Apple-event aesthetic, utilizing smooth typography, micro-interactions, canvas-rendered falling petals, and smooth scroll animations.

---

## 📂 Folder Structure

```plain text
Birthday-Kavya/
│
├── index.html          # Core layout & structure (CDNs included)
├── style.css           # Cinematic styling & responsive layout
├── script.js           # Particle animations, scroll-triggers, and interaction logic
│
├── photos/             # Place Kavya's photos here
│   ├── photo1.jpg      # Hero section blurred background
│   ├── photo2.jpg      # Memory Slide 1 (smile quote)
│   ├── photo3.jpg      # Memory Slide 2 (ordinary days quote)
│   ├── photo4.jpg      # Memory Slide 3 (beautiful forever quote)
│   ├── photo5.jpg      # Polaroid Card 1
│   ├── photo6.jpg      # Polaroid Card 2
│   ├── photo7.jpg      # Polaroid Card 3
│   ├── photo8.jpg      # Polaroid Card 4
│   └── photo9.jpg      # Final birthday slide background
│
└── assets/
    └── music/
        └── (optional: put local bg-music.mp3 here)
```

---

## 🛠️ Customization Guide

### 1. Replacing Photos
To make it personal, simply crop and save Kavya's real photos into the `photos/` folder, replacing the current placeholders with the exact names:
*   **`photo1.jpg`**: Hero blurred backdrop.
*   **`photo2.jpg` to `photo4.jpg`**: Scroll-driven memory stories.
*   **`photo5.jpg` to `photo8.jpg`**: Polaroid scattered gallery (displays in grid/collage).
*   **`photo9.jpg`**: The final fullscreen birthday greeting photo.

### 2. Customizing Background Music
A beautiful online piano instrumental is linked by default. To use your own romantic track:
1.  Place your audio file (e.g. `song.mp3`) inside `assets/music/` and rename it to `bg-music.mp3`.
2.  Open [index.html](file:///c:/Users/Nikhil%20s/Desktop/abhinay/index.html) and modify the `<audio>` tag around line 27:
    ```html
    <audio id="bg-audio" loop src="assets/music/bg-music.mp3"></audio>
    ```

### 3. Editing the Handwritten Letter
Open [index.html](file:///c:/Users/Nikhil%20s/Desktop/abhinay/index.html), search for the `<div class="letter-paper">` element (around line 189), and modify the text paragraphs inside to change what your letter says.

### 4. Changing the Secret Easter Egg
The secret popup appears when Kavya taps the birthday cake at the very bottom **7 times**.
*   To edit the popup text, search for `<div class="secret-popup"` (around line 232) in `index.html` and update the title, body, or quotes.

---

## 🚀 Running Locally

Because the site uses ScrollTrigger and particle effects, browsers block cross-origin requests when opening file links directly (e.g., double-clicking `index.html`). To run it correctly:

### Option A: Python Server (Built-in)
1. Open PowerShell or Terminal in the project directory.
2. Run:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your web browser.

### Option B: Node.js (http-server)
1. Run:
   ```bash
   npx http-server
   ```
2. Open the URL provided in the console.

---

## 🌐 Free Deployment

When you're ready to share this with Kavya at 12:00 AM, you can publish it for free:

### 1. GitHub Pages (Recommended)
1. Create a new repository on GitHub named `birthday-kavya`.
2. Push this project folder to the repository.
3. Go to **Settings** > **Pages** inside the repo.
4. Set Source to `Deploy from a branch` and select `main` (or `master`) branch. Save.
5. GitHub will generate a link: `https://yourusername.github.io/birthday-kavya/`.

### 2. Vercel
1. Install vercel CLI (`npm install -g vercel`) or sign up at [Vercel.com](https://vercel.com).
2. Run the command `vercel` in this directory and follow the prompts.
3. It will instantly give you a deployment URL.

### 3. Netlify
1. Go to [Netlify.com](https://netlify.com) and log in.
2. Drag and drop the `Birthday-Kavya` folder into the Netlify dashboard upload zone.
3. Your site is live instantly with a shareable URL.
