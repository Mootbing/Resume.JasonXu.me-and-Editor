# Resume.JasonXu.Me

A Next.js resume site that renders the page, the PDF, and the page metadata from a single LaTeX source file (`REPLACE_ME_resume.tex`) at the repo root, plus a single icon (`REPLACE_ME_icon.png`).

## Make it your own

1. Fork this repo.
2. **Replace `REPLACE_ME_resume.tex`** at the repo root with your own LaTeX. The existing file uses [Jake Gutierrez's resume template](https://github.com/jakegut/resume) — a solid starting point.
   - Wrap any company/project titles you want clickable in `\href{url}{\underline{Title}}`.
   - The `\begin{center}…\end{center}` block at the top is parsed for your name and every `\href` becomes a contact link in the rendered Header. Email / LinkedIn / GitHub / Instagram URLs auto-pick the right icon.
   - The `% icon:`, `% title:`, and `% subtitle:` comments at the top of the file drive the hero section: which image is shown, the big heading, and the tagline below it.
3. **Replace `REPLACE_ME_icon.png`** at the repo root with your own 1024×1024 PNG (or any size; 1024² is just the default). If you rename it, update the `% icon: /your-icon.png` line inside the resume tex. The npm `predev` / `prebuild` hooks copy this file from the repo root into `public/` so Next.js serves it.
4. Push to `main` — GitHub Actions compiles your tex → `public/resume.pdf` and commits it back ([`.github/workflows/build-pdf.yml`](.github/workflows/build-pdf.yml)).
5. Deploy (Vercel works out of the box).

That's it — no React code edits required for normal personalization. Page `<title>` and meta description also derive from the parsed name, so updating the tex rebrands the whole site.

## Live editor

Run `npm run dev` and visit `/edit`:

- **Left:** textarea with LaTeX syntax highlighting.
- **Right:** toggle between the rendered website and a paginated, letter-paper PDF-style preview so you can see if your resume fits on one page.
- **Save** downloads your edited `.tex` and opens the GitHub repo so you can drop it in and commit.

## Branding bits that stay hardcoded

The footer nav (`About Me` / `Portfolio` / `LinkedIn`) lives in `app/components/Footer.tsx`. Edit it directly if you want different links.

100% vibe coded in Cursor.
