# Portal Support Workbench v3.0 — Profile Preview + Clearer Navigation

This GitHub Pages package improves the Florida Bar workflow, reorganizes the left navigation, and separates reply wording from procedures/reference material.

## Florida Bar Verification

The redundant URL field has been removed.

The workflow is now:

1. Enter the numeric Florida Bar number.
2. Open the exact official profile in a normal browser tab.
3. Copy the visible profile text.
4. Import the copied text into the Workbench.
5. Review the local profile preview against the official page.
6. Apply the verification note to the current ticket.

The parser can identify the member name, Bar number, member status, eligibility, public email, county, admission date, and 10-year discipline history. Imported information is not accepted as verified until the analyst selects the review confirmation.

The application does not scrape the Florida Bar site, call a Florida Bar API, or store profile data. A live iframe was not used because an external site can prevent framing and a static page cannot reliably inspect or control a cross-origin embedded page.

## Sidebar Navigation

- The Work / Training toggle now occupies the primary position under the current sidebar section label.
- Current Ticket has moved to the bottom of the Daily Work list.
- The section label changes between Daily work and Training & reference.
- Troubleshooting, Response Builder, Quick Replies, Florida Bar Search, and Known Issues remain directly accessible.

## Procedures and Quick Replies

The former Job Instructions page is now **Procedures & Reference**.

Wording-oriented entries are no longer shown as procedures. Version 3.0 moves 34 reply/note-oriented source entries into Quick Replies as **additional manager source wording**. These are hidden by default and can be enabled deliberately for review and editing.

Curated Quick Replies remain the default. Additional source wording is clearly labeled as requiring review before use.

## Existing Features Preserved

- Current Ticket scratchpad
- Complete workflow checklists and system findings
- Troubleshooting workspace
- Fully editable Response Builder
- Customer and Ivanti Quick Reply drafts
- Known Issues
- Registration and scenario training
- System Reference and Terminology
- No AI, OpenAI API, Ollama, analytics, or telemetry
- No persistence of ticket facts
