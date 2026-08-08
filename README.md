# Your personal page

A small, dependency-free HTML/CSS/JS template that reproduces the "sidenote
essay" format: footnotes sit in the right margin next to the paragraph that
cites them, a `two_images` block lays two figures side by side, and an
appendix section gets its own table styling.

## Files

- `index.html` — the homepage, and the site root. Bio, work, photos, and
  an appendix of exhibitions/talks/workshops/jury/curating. Links to
  `essay.html`.
- `essay.html` — the essay page. Also serves as a working demo of every
  format feature, with instructions in place of real content — replace
  as you go. Links back to `index.html`.
- `style.css` — base article typography (fonts, headings, width, epigraph).
  Shared by both pages.
- `sidenotes.css` — the sidenote/footnote mechanism, two-image figures, and
  appendix/table styling. Shared by both pages — the homepage has no
  stylesheet of its own; every part of it is built from components
  `essay.html` already uses (see below).
- `sidenotes.js` — ~50 lines of vanilla JS that positions the footnotes.
  No jQuery, no build step. Shared by both pages.
- `LICENSE` — the GNU General Public License v3, copied verbatim from
  `/usr/share/common-licenses/GPL-3` on this machine.

## The homepage (`index.html`)

The homepage is a CV-style landing page: bio, work, photos, and a longer
appendix of exhibitions and other engagements. Rather than invent a new
stylesheet for it, every section reuses a component `essay.html` already
defines in `style.css`/`sidenotes.css`:

- **header** — `h1` for your name, `p.epigraph` for an optional one-line
  tagline, the same as the essay page's title block.
- **nav link to the essay page** — a plain paragraph right under the
  header.
- **bio** — ordinary paragraphs under an `h2`, with two footnotes
  attached (`div.footnotes`, positioned by `sidenotes.js` exactly as on
  the essay page) so asides about an affiliation or a title don't have
  to clutter the bio text itself.
- **contact** — `p.ack`, the same small-print class the essay page uses
  for acknowledgements.
- **work** — one `p` per category (`author:`, `co-author:`, `wrote:`,
  `books:`, `blogs:`), each with a bold inline label rather than another
  `h2`, so the section doesn't get heading-heavy.
- **photos** — `div.two_images`, the same side-by-side figure block the
  essay page uses for image comparisons, repurposed here for two
  portraits with dated captions.
- **exhibitions, workshops, jury, curating** — one `#appendix` block,
  each history as its own `table.data-table` (Appendix A–D). A
  year-by-year list is genuinely tabular data, so it gets the same
  table styling the essay page's own appendix demonstrates, with the
  Year column bolded via `data-table`.
- **closing image** — a plain `<img>` at the very end, sized with a
  `width` attribute the same way the two-image figures are.

All of it is placeholder text — like `essay.html`, treat it as a working
demo to delete and replace section by section rather than a finished
page.

## Why it's built this way

You asked for this in a way the FSF would sign off on, so a few choices
were deliberate:

- **No borrowed, unlicensed code.** The original files this is based on
  (a jQuery plugin scraped from someone else's page) didn't carry a
  license, so I rewrote the footnote-positioning logic from scratch
  instead of reusing it as-is.
- **No jQuery.** The uploaded copy was jQuery 1.8.0 from 2012, minified —
  the opposite of the "preferred form for modification" that free
  software is supposed to give you. The whole behavior fits in plain JS,
  so there's no dependency to audit, update, or serve at all.
- **Every source file is licensed, machine-readably.** `sidenotes.js`
  opens with:
  ```
  // @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-3.0-or-later
  ```
  and closes with `// @license-end`. That's the exact format
  [GNU LibreJS](https://www.gnu.org/software/librejs/) checks for — if
  someone visits your page with LibreJS installed, it will recognize the
  script as free and let it run, instead of blocking it as an unlabeled
  third-party script. This is *the* concrete, checkable meaning of
  "FSF-approved JavaScript" (see the FSF's
  [*The JavaScript Trap*](https://www.gnu.org/philosophy/javascript-trap.html)
  for why this matters).
- **Free fonts before proprietary ones.** `style.css` lists Linux
  Libertine and Liberation Serif ahead of Times New Roman, so visitors
  without Microsoft's font get an equivalent look from a freely licensed
  one, rather than silently falling back to a generic serif.
- **GPL-3.0-or-later**, the FSF's own flagship license, rather than
  something more permissive. If you'd rather use something simpler
  (MIT/Expat, or public-domain-equivalent CC0), see "Changing the
  license" below — it's a five-minute change.

One thing I *didn't* carry over: the original page had a one-off hack
that pinned a single footnote on top of one specific full-width image,
via a hardcoded CSS selector (`#fnref-justauser`) tied to that image's
exact pixel position. That's a page-specific trick, not part of the
general format, so it isn't in the template. If you want that effect for
a particular figure of yours, it's a few lines — ask and I'll add it.

## Previewing it locally

No build step, no server dependencies. From this directory:

```
python3 -m http.server 8000
```

then open `http://localhost:8000` in a browser. (`python3` ships with
Ubuntu by default — nothing extra to install.)

## Getting the free fonts

`style.css` already prefers them; you just need them installed so your
own browser renders with them (visitors will get whichever of these,
if any, *their* system has — that's normal web-font fallback behavior,
not something you can force without hosting webfont files):

```
sudo apt install fonts-linuxlibertine fonts-liberation2
```

Both packages are in Ubuntu's `main`/`universe` archive under free
licenses (OFL/Apache-derived), so no non-free repositories needed.

## Editing the page

Any plain-text editor works. If you want one that's itself fully free
software (not just freely licensed but, e.g., bundling a proprietary
extension marketplace), reasonable choices already in Ubuntu's repos:

```
sudo apt install vim      # or: neovim, emacs, kate, gnome-text-editor
```

(VS Code's *code* is MIT-licensed, but Microsoft's official build adds a
proprietary marketplace/telemetry layer; **VSCodium** is the same editor
built from the free parts only, if you want that editing experience
specifically.)

## Publishing it

For a machine you control, install a web server, both free software and
in Ubuntu's default repos:

```
sudo apt install nginx      # or: apache2
sudo cp -r . /var/www/html/your-page/
```

Or push the directory to any static host you like (your own server,
a friend's, a co-op host, etc.) — the FSF's concern is with the
*software* you and your visitors run, not with whose disk the static
files sit on.

One honest note: Ubuntu itself isn't on the FSF's
[list of endorsed distributions](https://www.gnu.org/distros/free-distros.html)
— it enables some non-free components by default (proprietary firmware,
optional non-free repos, some snaps). None of that affects this project
(everything above uses only `main`/`universe` packages), but if fully
FSF-endorsed tooling matters to you end-to-end, distros like Trisquel or
PureOS are the ones on that list.

## Changing the license

To switch to MIT/Expat instead of GPL:

1. Replace `LICENSE` with the MIT text.
2. In `sidenotes.js`, replace the `@license` line with:
   ```
   // @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat
   ```
3. Update the copyright comment blocks in each file to match.

## Adding your own footnotes

In the text:

```html
<p>Some claim.<a href="#fn-2" id="fnref-2" class="footnote">2</a></p>
```

In `div.footnotes`:

```html
<li id="fn-2"><p>The footnote text. <a href="#fnref-2" class="reversefootnote">&#8617;</a></p></li>
```

`sidenotes.js` matches them up automatically by id — numbering and
ordering are up to you.
