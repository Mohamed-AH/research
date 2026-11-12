# Design brief

## Owner's direction (verbatim intent)

Avoid the generic "AI slop" look. Make it distinctive and designed for this context.

- **Typography:** beautiful, unusual fonts. Not Inter, Roboto, Arial, system fonts or Space Grotesk.
- **Colour and theme:** one committed palette held in CSS variables. Dominant colours with sharp accents, not timid even palettes. No purple gradients on white. Inspiration can come from IDE themes and cultural aesthetics.
- **Motion:** CSS-first. One well-orchestrated page load with staggered reveals (`animation-delay`) instead of scattered micro-interactions.
- **Backgrounds:** atmosphere and depth. Layer gradients, use geometric patterns and effects that fit the context, not flat solid colours.
- **Layout:** no predictable, cookie-cutter component patterns.

## Proposed direction (to confirm in step 3)

Working concept: **"The lab notebook meets the Hejaz."**

- The episode is about research moving from the lab into the market, told by a founder from Makkah. The site borrows from two worlds: a researcher's notebook (graph-paper grid, margin notes, figure numbers, citation marks) and Hejazi architecture (roshan lattice screens, coral-stone tones).
- **Palette idea:** coral-stone sand as the base, deep ink-teal for text and figures, and one sharp accent in signal orange, used only for timestamps and "jump to the video" moments. Dark mode becomes an "ink" notebook: teal-black paper with chalk-coloured lines.
- **Type idea:** a characterful serif for headings (for example *Fraunces* or *Instrument Serif*), a monospace for figure labels and timestamps (for example *JetBrains Mono* or *IBM Plex Mono*), and an Arabic pairing with real character (for example *Amiri* or *Reem Kufi* for headings, *IBM Plex Sans Arabic* for body text).
- **Motif:** a roshan lattice pattern built from CSS gradients, very faint behind the page and sharper on chapter covers.
- **Signature motion:** on load, the chapter's "figure" draws itself in, as if pencilled into the notebook, followed by staggered margin notes.
- **Interactive pieces:** as listed per chapter in `content/en/*.md` (the "Interactive" section of each file).
