# Portal Support Workbench v2.5 — Guided GitHub Pages Edition

## Purpose

A manager-governed, role-specific ticket workflow engine for Portal Support. It guides the analyst through Intake, Verify, Act, Communicate, and Close/Escalate while keeping customer, work-note, resolution, and escalation outputs synchronized.

## Source hierarchy

1. Manager-provided notes and procedures
2. Uploaded Quick Troubleshooting and Quick Replies
3. Other internal role-specific training
4. Public documentation only as supplemental context

## Major features

- Persistent next-required-action guidance
- Stage-specific completion gates
- Canonical ticket facts entered once
- Structured system-evidence cards
- Conditional manager-approved actions
- Responsibility/ownership indicator
- Evidence-aware response generation
- Synchronized work note, resolution note, and escalation package
- Known Issues workspace
- Intent-first Quick Replies
- Troubleshooting kits
- Scenario and registration training
- Manager-procedure source library
- Keyboard navigation and accessible focus states

## GitHub Pages deployment

1. Create an empty repository.
2. Upload every file and folder in this package, including `.github`.
3. Commit to `main`.
4. Open **Settings → Pages** and choose **GitHub Actions**.
5. Wait for the included workflow to deploy.

## Security warning

A static Pages site is downloadable by anyone who can access it. Obtain authorization before publishing. Raw source files, internal screenshots, staff-specific emails, payment test data, account/routing numbers, and shared temporary-password wording are excluded or redacted.

The application makes no AI, API, analytics, telemetry, or application network calls. Ticket facts are not persisted.


## Version 2.5 corrections and usability improvements

- Corrected the missing Ticket workflow selector that could prevent a fresh deployment from initializing.
- Restored a persistent full-ticket checklist covering Intake, Verify, Act, Communicate, and Close/Escalate.
- Prevented analysts from skipping unresolved earlier stages without being redirected to the first requirement.
- Added direct next-action navigation, relevant troubleshooting, suggested replies, and known-issue shortcuts inside Work Ticket.
- Made conditional checklist steps visible on demand with the reason they are currently inapplicable.
- Redesigned Quick Replies into Customer Reply and Internal Ivanti Note modes.
- Replaced technical filter-first navigation with plain-language intent buttons and current-ticket suggestions.
- Added direct “Use in current ticket/work note” actions and separate draft kits so internal notes cannot be mixed into customer responses.

- Added an explicit response-review requirement so generated text is not treated as complete merely because a default draft exists.
- Curated workflow-specific Quick Reply suggestions to prevent irrelevant docket or DIY templates from appearing for registration tickets.
- Collapsed non-current checklist stages by default while keeping their counts visible.
