# Portal Support Workbench — GitHub Pages Edition v2.1

This folder is ready to place at the root of a GitHub repository and deploy as a static GitHub Pages site.

## Important publication warning

This application contains operational support guidance. **Do not publish it in a public repository or public Pages site without organizational authorization.** A client-side warning, `robots.txt`, or `noindex` tag is not access control.

The hosted build intentionally excludes:

- the raw DOCX and PDF source files;
- embedded screenshots from internal systems;
- staff-specific `@flclerks.com` email addresses; and
- shared temporary-password language.

The remaining content may still be internal or sensitive.

## Deploy with the included GitHub Actions workflow

1. Create an empty GitHub repository.
2. Upload or push every file in this folder, including `.github`, to the repository's `main` branch.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Open the **Actions** tab and allow the `Deploy Portal Support Workbench to GitHub Pages` workflow to finish.
6. Return to **Settings → Pages** and use the displayed site address.

## Alternative: deploy from the branch

You may remove `.github/workflows/deploy-pages.yml` and configure Pages to deploy from the root of the `main` branch. The required `index.html` entry file is already at the repository root.

## Data behavior

- No OpenAI, ChatGPT, Ollama, or AI model.
- No application API calls.
- No analytics or telemetry code.
- No ticket-content submission code.
- Ticket fields remain in browser memory for the current tab.
- Local storage is used only for pins and recent template identifiers.

Do not enter passwords, Social Security numbers, full payment-card numbers, full bank-account numbers, credentials, access tokens, or unnecessary customer information.

## Files

- `index.html` — website entry point
- `styles.css` — interface styling
- `data.js` — sanitized workflow and source data
- `app.js` — deterministic application logic
- `.github/workflows/deploy-pages.yml` — automatic Pages deployment
- `.nojekyll` — serves the static files without Jekyll processing
- `404.html` — fallback page
- `robots.txt` — asks crawlers not to index the site; this is not security
- `SECURITY_AND_PUBLICATION_WARNING.md` — publication limitations
