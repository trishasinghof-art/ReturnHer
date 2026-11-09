# ReturnHer

ReturnHer is a bilingual prototype that helps women across India explore government-supported ways to continue studying, get skills certified, and earn. It shapes a personal path from a woman's education, skills, goal, and district. It is a guide to official sources, not a job portal or a government website.

## Run it

Open `index.html` in a modern browser. There is no build step, package installation, sign-up service, or backend. The app uses hash routes and keeps demo profile, saved items, and progress in the browser's local storage.

## 60-second demo

1. Tap Sunita in the home illustration.
2. Look through her personalized path.
3. Open an opportunity and choose **Am I eligible?**
4. Open the application guide and try its checklist or progress steps.
5. Ask Sakhi a question.
6. Switch to Hindi with the language button.

The **Demo guide** button in the notice bar also shows these steps.

## Illustrations

The app draws its illustrations in SVG and can replace supported scenes with artwork in `assets/illustrations/`. To add an illustration, provide an SVG with the same filename as its slot, for example `scene-doorway.svg`, `scene-tailor.svg`, `scene-scholar.svg`, `scene-learner.svg`, `scene-teacher.svg`, `scene-entrepreneur.svg`, `scene-homeEarner.svg`, `hero-crowd.svg`, `cta-panel.svg`, or `sakhi.svg`. Keep the artwork flat, accessible, and consistent with the palette and dignity guidance in [BRIEF.md](./BRIEF.md). A missing or invalid override leaves the built-in illustration in place.

## Prototype limitations

- Sign-in is demo-only; a name and answers are stored on this device.
- Opportunity listings, requirements, and details are sample entries. Confirm current information with the linked official source.
- There is no backend, account system, application submission, or server-side storage.
- Matching and Sakhi answers use local, rule-based logic. They are not personalized professional advice and do not determine eligibility.
- Sakhi does not use an external API. The official authority makes final eligibility decisions.
