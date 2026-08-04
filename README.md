# Portal Support Workbench v4.4 — Header Ticket Summary

Version 3.7 completes a full copy-edit of every active Quick Message and Troubleshooting message displayed in the Workbench while preserving the v3.6 training program and all Daily Work tools.

## Message audit

- 42 curated Quick Messages rewritten
- 51 active manager-source Quick Messages given polished display copies
- 25 curated Troubleshooting cards rewritten
- 15 active manager-source Troubleshooting cards given polished display copies
- Original manager wording preserved in Content Audit for source traceability

## Editing standard

The active wording now uses consistent Portal terminology, complete sentences, concise action steps, clear customer/Clerk boundaries, and neutral professional tone. Personal names, sentence fragments, slang, duplicated wording, unsafe credential language, unverified promises, and internal contact details were removed from active message text.

Dynamic, incident-specific, county-specific, financial, technical-limit, and policy-sensitive messages retain review-before-use wording and placeholders where a current fact must be confirmed.

## Privacy and operation

The Workbench remains static and rule based. It does not use AI, call an AI API, or store Current Ticket information.


## v3.8 knowledge hub

Job Procedures, System Reference, Terminology, Reference Library, and County Notes were rebuilt into structured, searchable guidance. See `KNOWLEDGE_HUB_REDESIGN_AUDIT.md`.


## v4.1 notice cleanup

Removed the yellow warning boxes from Troubleshooting, Job Procedures, County Notes, Training Home, Training Sources, Known Issues, and Content Audit. Redundant card-level reminders were deleted. Essential boundary or confirmation guidance remains available as ordinary, neutral text inside the relevant guide instead of as a prominent yellow callout.


## v4.1 interface correction

All yellow/amber callout treatments were removed or changed to neutral styling. Asset filenames are versioned to prevent stale browser caching.


## v4.1 workflow consolidation

- Unified Messages workspace with quick drafting, block drafting, favorites, and rule-based draft checks.
- Persistent Current Ticket drawer across daily work tools.
- Grouped Training navigation.
- Actionable Knowledge Hub cards.
- Local persistence only for training progress and non-sensitive preferences; no ticket facts or drafts are persisted.
- Accurate Florida Bar label: Imported Profile Summary.


## v4.3 split workspace layout

- Messages uses a two-thirds gallery and one-third drafting workspace on desktop.
- Troubleshooting uses the same two-thirds guidance and one-third plan pattern.
- Both sides have independent vertical scrolling, so drafts and plans remain available while browsing cards.
- The minimized Current Ticket drawer is now a compact bottom-right thumbnail instead of a full-width bar.
- Responsive layouts return to a single natural page flow on narrower screens.


## v4.3 corrections

- Restored the No-AI notice on every page load.
- Restored interactive checkboxes for every Job Procedure step.
- Added per-procedure progress counts, clear controls, and checked-step transfer to the Current Ticket.


## v4.4 header ticket summary

- Removed the floating bottom-right Current Ticket drawer and its minimized thumbnail.
- Moved the same ticket status and actions into the sticky header.
- The header summary displays the incident, workflow, and remaining required items without covering the drafting workspace.
- Selecting the header summary opens a compact anchored panel with the ticket snapshot, Open ticket, Add note, and Copy summary actions.
- The panel closes when the user selects Close, clicks outside it, presses Escape, opens Current Ticket, or changes to Training mode.
- On narrow screens, the header control becomes a compact incident button and the panel fits within the viewport.
