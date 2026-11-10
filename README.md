# Konduri Pranathi | Portfolio

Static portfolio built with HTML, CSS and JavaScript. No build step.

## Run in VS Code
1. Open this folder in VS Code (File > Open Folder).
2. Install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.
   (Double-clicking `index.html` also works.)

## Edit your content
- `index.html`: name, about text, education, internship, contact details.
- `js/script.js`: skills, projects (add a `github` and `live` link per project).
- `css/styles.css`: colours are the variables at the top.
- `assets/`: replace `photo.jpg` and `Konduri_Pranathi_Resume.pdf` (keep the same file names).

## Push to GitHub
Create an empty repository named `portfolio` on github.com, then run in the VS Code terminal:

```bash
git init
git add .
git commit -m "Add portfolio website"
git branch -M main
git remote add origin https://github.com/pranathikonduri/portfolio.git
git push -u origin main
```

## Publish free with GitHub Pages
Repository **Settings > Pages > Build and deployment**: Source "Deploy from a branch", Branch `main`, folder `/ (root)`, then Save.
After about a minute the site is live at `https://pranathikonduri.github.io/portfolio/`.
