# Resume.JasonXu.Me

A Next.js resume site that renders both the page and the downloadable PDF from a single LaTeX source file (`resume.tex` at the repo root).

## Make it your own

1. Fork this repo.
2. **Replace `resume.tex`** at the repo root with your own LaTeX. The existing file uses [Jake Gutierrez's resume template](https://github.com/jakegut/resume) — a solid starting point. Wrap any company/project titles you want clickable in `\href{url}{\underline{Title}}` and they'll become links on the rendered page automatically.
3. Edit `app/components/Header.tsx` for your own name, contact icons, and socials.
4. Push to `main` — GitHub Actions compiles `resume.tex` → `public/resume.pdf` and commits it back automatically (see [`.github/workflows/build-pdf.yml`](.github/workflows/build-pdf.yml)).
5. Deploy (Vercel works out of the box).

## Live editor

Run `npm run dev` and visit `/edit` for a side-by-side LaTeX editor:

- Left pane: textarea with syntax highlighting.
- Right pane: toggle between the rendered website and a paginated, letter-paper PDF-style preview so you can see if your resume fits on one page.
- **Save** button downloads your edited `.tex` and opens the GitHub repo so you can drop it in and commit.

## How the PDF stays in sync

There's no `pdflatex` at runtime — instead, a GitHub Actions workflow runs on every push to `main` that touches `resume.tex` and re-compiles `public/resume.pdf` with TeX Live. The download button on the home page just serves that static file.

100% vibe coded in Cursor.
