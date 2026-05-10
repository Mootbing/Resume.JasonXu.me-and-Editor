# Resume.JasonXu.Me

A Next.js resume site that renders the page, the PDF, and the page metadata from a single LaTeX source file (`resume.tex` at the repo root).

## Make it your own

1. Fork this repo.
2. **Replace `resume.tex`** at the repo root with your own LaTeX. The existing file uses [Jake Gutierrez's resume template](https://github.com/jakegut/resume) — a solid starting point.
   - Wrap any company/project titles you want clickable in `\href{url}{\underline{Title}}`.
   - The `\begin{center}…\end{center}` block at the top is parsed for your name and every `\href` becomes a contact link in the rendered Header. Email/LinkedIn/GitHub/Instagram URLs auto-pick the right icon.
   - Drop your icon (PNG or SVG) into `public/` and point the `% icon: /your-icon.png` comment at it. That single line drives both the Header avatar and the hero section.
   - The `% title:` and `% subtitle:` comments next to `% icon:` set the big hero heading and the tagline below it (defaults: `Résumé` / `Locally sourced, grass fed projects.`).
3. Push to `main` — GitHub Actions compiles `resume.tex` → `public/resume.pdf` and commits it back ([`.github/workflows/build-pdf.yml`](.github/workflows/build-pdf.yml)).
4. Deploy (Vercel works out of the box).

That's it — no React code edits required for normal personalization. Page `<title>` and meta description also derive from the parsed name, so updating `resume.tex` rebrands the whole site.

## Live editor

Run `npm run dev` and visit `/edit`:

- **Left:** textarea with LaTeX syntax highlighting.
- **Right:** toggle between the rendered website and a paginated, letter-paper PDF-style preview so you can see if your resume fits on one page.
- **Save** downloads your edited `.tex` and opens the GitHub repo so you can drop it in and commit.

## Branding bits that stay hardcoded

The footer nav (`About Me` / `Portfolio` / `LinkedIn`) lives in `app/components/Footer.tsx`. Edit it directly if you want different links.

100% vibe coded in Cursor.
