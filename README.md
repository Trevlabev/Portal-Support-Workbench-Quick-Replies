# Portal Support Workbench v2.9 — Simplified + Customizable

This GitHub Pages package restores troubleshooting, simplifies the Work Ticket, adds a fully customizable Response Builder, renames Manager Procedures to Job Instructions, and adds a user-initiated Florida Bar verification tool.

## Work Ticket

One scrolling workflow with four numbered sections:

1. Ticket details
2. System findings
3. Job checklist
4. Response, notes, and closeout

There is no stage maze. All applicable checklist steps remain visible and filterable. Drafts are editable and are never automatically overwritten after the analyst edits them.

## Response Builder

- Add, edit, delete, and reorder blocks
- Rename block labels
- Insert current ticket facts
- Insert team-note Quick Reply templates
- Build from the current ticket or start blank
- Edit the final response freely
- Send the finished response back to the active ticket

## Troubleshooting

- 27 focused troubleshooting cards
- 32-item complete checklist
- Workflow suggestions
- Editable troubleshooting plan
- Add selected or checked troubleshooting directly to the current work note

## Florida Bar Search

The tool performs no scraping or API calls. Version 2.9 uses a same-tab direct link constructed exactly as `https://www.floridabar.org/directories/find-mbr/profile/?num=` plus the numeric Bar number. It also displays and copies that exact URL, avoiding popup, new-tab, and form-submission behavior. The analyst records the relevant verification result and can apply it to the current ticket.

## Source terminology

“Manager Procedures” is renamed **Job Instructions**. It means the searchable operational instructions extracted from the materials the manager supplied. Those job instructions remain primary; public documentation is supplemental.


## v2.9 Current Ticket redesign

- Renamed Work Ticket to Current Ticket
- Moved Work / Training mode selector above the left navigation
- Reduced the ticket page to facts, what to check, connected tools, and finished documentation
- Added local rule-based extraction from pasted Ivanti/email text
- Split essential fields from optional details
- Added Checklist / System Findings switch
- Added unsaved-work confirmation before clearing or changing issue type
- Preserved Troubleshooting, Response Builder, Quick Replies, Florida Bar Search, Known Issues, and all training/reference content
