# Portal Support Practice Workbook

All scenarios are synthetic. Do not insert real customer or ticket data into this workbook.

For each scenario, record: issue type, required facts, systems to check, action sequence, customer next step, work-note summary, and whether the ticket should resolve or escalate.

## Scenario 1: Pending attorney registration with missing phone
**Difficulty:** Beginner  
**Workflow:** Registration

Incident 450123 is a pending attorney registration. Ivanti contains the applicant’s name and email but no phone number. The filer role has not been selected. The application is visible in RAC.

**Facts provided:**
- Incident 450123
- Attorney registration
- Phone missing from Ivanti
- Pending application in RAC

### Decision questions
1. What should happen first in Ivanti?
   - A. Approve in RAC immediately
   - B. Assign the incident, select the filer role, save, and update the required ticket/customer fields
   - C. Send a password reset
   - D. Refer to the Clerk
2. Where may the missing phone information be found?
   - A. TPE
   - B. The pending registration in RAC
   - C. CCIS docket
   - D. Florida Bar discipline history
3. What determines approval?
   - A. The customer’s urgency
   - B. Current manager-approved approval criteria
   - C. Any active Bar number by itself
   - D. Whether the email is in spam

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 2: Registration rejected for a correctable issue
**Difficulty:** Beginner  
**Workflow:** Registration

A pending registration does not meet the current manager-approved criteria. The reason can be corrected by the applicant.

**Facts provided:**
- Pending registration
- Criteria not met
- Correctable issue

### Decision questions
1. Which RAC action applies?
   - A. Green check
   - B. Red X with the reason, then save
   - C. Delete the application
   - D. Open TPE
2. What should the customer receive?
   - A. Only “rejected”
   - B. The rejection reason and required correction
   - C. A refund promise
   - D. A Clerk form list
3. What closes the incident?
   - A. Changing status to Resolved, adding resolution notes, selecting the current Cause Code, and saving
   - B. Closing the browser
   - C. Deleting the customer record
   - D. Waiting for the applicant to call

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 3: Florida Bar email does not match the ticket
**Difficulty:** Intermediate  
**Workflow:** Account Access / Password

An attorney requests account assistance. The official Florida Bar profile displays a public email different from the email in the incident.

**Facts provided:**
- Attorney account
- Numeric Bar number provided
- Public email differs from ticket email

### Decision questions
1. What should the mismatch be treated as?
   - A. Automatic proof of fraud
   - B. A factual difference requiring the current manager account procedure
   - C. Reason to delete the account
   - D. Proof that the Bar profile is wrong
2. What should be documented?
   - A. Only the Bar number
   - B. Displayed name/status/eligibility, public email comparison, and the action taken
   - C. Unrelated profile history
   - D. The customer’s password
3. May the imported profile preview be applied without review?
   - A. Yes
   - B. No, it must be checked against the official page
   - C. Only if the email matches
   - D. Only on mobile

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 4: Locked-account message after repeated attempts
**Difficulty:** Intermediate  
**Workflow:** Account Access / Password

The customer reports a locked message after several login attempts. The incident includes a username and email but no verified RAC status yet.

**Facts provided:**
- Locked message
- Several failed attempts
- Username and email provided

### Decision questions
1. What should happen before reactivation or reset action?
   - A. Ask for the current password
   - B. Verify requester authorization and the RAC account/status
   - C. Create a second account
   - D. Assume the message is accurate
2. Which historical content must not be used blindly?
   - A. Conflicting old password requirements
   - B. The current RAC status
   - C. The incident number
   - D. The username
3. When is escalation appropriate?
   - A. Before RAC review
   - B. After the current locked-account procedure when Tier I cannot safely correct it
   - C. Whenever the customer asks
   - D. Only after deleting the account

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 5: Item appears only in Workbench
**Difficulty:** Beginner  
**Workflow:** Filing Status / Docket

A filer says a case was filed because it appears in Workbench. No filing number appears in My Submissions.

**Facts provided:**
- Workbench item
- No filing number
- Not in My Submissions

### Decision questions
1. What does the Workbench item prove?
   - A. The Clerk received it
   - B. Only unfinished/history-like activity, not submission
   - C. The fee was paid
   - D. The case is docketed
2. What is the likely next Portal action under the manager clean-retry guidance?
   - A. Resume the same Workbench item
   - B. Start the filing again from the beginning and do not use the failed/stale Workbench item
   - C. Ask the Clerk to delete it
   - D. Associate a Known Issue automatically
3. What should be recorded?
   - A. Only “not filed”
   - B. Workbench finding, My Submissions finding, absence of filing number, and customer next action
   - C. The customer’s password
   - D. A refund request

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 6: Transmitted filing not visible on the docket
**Difficulty:** Intermediate  
**Workflow:** Filing Status / Docket

A filing has a nine-digit filing number and RAC shows Transmitted. The customer asks why it is not visible on the official docket.

**Facts provided:**
- Nine-digit filing number
- RAC status: Transmitted
- Not visible on official docket

### Decision questions
1. Which systems answer the two status questions?
   - A. RAC for Portal status and CCIS/Clerk record for docket status
   - B. TPE only
   - C. Florida Bar only
   - D. Workbench only
2. Who controls official docket processing?
   - A. Portal Support
   - B. The Clerk
   - C. The browser vendor
   - D. The Florida Bar
3. What should the work note avoid?
   - A. Recording both findings
   - B. Saying Transmitted proves docket placement
   - C. Recording the filing number
   - D. Providing a Clerk referral when appropriate

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 7: Attorney is not receiving eService
**Difficulty:** Intermediate  
**Workflow:** My Cases / eService

An attorney receives other Portal messages but not eService for one case. The profile email was updated recently.

**Facts provided:**
- One case affected
- Other Portal email received
- Profile email recently changed

### Decision questions
1. What should be compared?
   - A. Profile email and the email on the case service list, plus bounce-back/spam evidence
   - B. Only the browser version
   - C. Only the Bar number
   - D. The full payment card
2. What should not be assumed?
   - A. The service list already contains the new profile email
   - B. The customer has a username
   - C. The case has a county
   - D. The incident is in Ivanti
3. If official docket/access action is required, who owns it?
   - A. Portal Support
   - B. The applicable Clerk
   - C. TPE
   - D. The Florida Bar

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 8: Upload reaches 100% and stalls
**Difficulty:** Intermediate  
**Workflow:** Upload / PDF / Browser

The first PDF reaches 100%. A second document cannot be added. The filer resumed the filing from Workbench and is using Safari on a Mac.

**Facts provided:**
- Upload at 100%
- Second document cannot be added
- Resumed from Workbench
- Safari on Mac

### Decision questions
1. Which conditions must be corrected?
   - A. Use a supported browser, sign out, start over, and do not reuse the Workbench item
   - B. Keep Safari and retry repeatedly
   - C. Delete the customer account
   - D. Ask for the card number
2. What document/upload check also applies?
   - A. Wait for the upload indicator to fully complete and validate PDF/security/filename/page conditions
   - B. Check the official docket first
   - C. Check Florida Bar discipline
   - D. Change the case party
3. What is required if the complete clean retry still fails?
   - A. An evidence-complete Analyst package
   - B. A generic “still broken” note
   - C. Automatic Known Issue association
   - D. A refund promise

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 9: Secured PDF fails validation
**Difficulty:** Beginner  
**Workflow:** Upload / PDF / Browser

A PDF cannot be uploaded. The file is password protected and page size is unknown.

**Facts provided:**
- PDF upload failure
- Password protected
- Page size unknown

### Decision questions
1. What should happen before retrying?
   - A. Remove the locked/secured condition and verify the document requirements
   - B. Send the password to Portal Support
   - C. Zip the file
   - D. Change the filing county
2. Which additional document fact should be checked?
   - A. 8.5 × 11 page size and other current manager-approved PDF conditions
   - B. Judge assignment
   - C. Bar discipline
   - D. Customer’s bank balance
3. Should changing technical limits be quoted without review?
   - A. Yes
   - B. No, verify current manager guidance
   - C. Only to self-represented filers
   - D. Only in Ivanti notes

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 10: Unknown charge with limited information
**Difficulty:** Intermediate  
**Workflow:** Payment / Charge / Refund

A customer reports an unfamiliar Portal-related charge and provides only the date and amount.

**Facts provided:**
- Unknown charge
- Date and amount provided
- No filing number or last four yet

### Decision questions
1. What additional information is appropriate?
   - A. Payment type, last four only, account holder, filing number, and descriptor
   - B. Full card number and security code
   - C. Online banking password
   - D. Social Security number
2. What research is required?
   - A. TPE transaction research and related filing review in RAC/My Submissions
   - B. Florida Bar profile only
   - C. CCIS only
   - D. No system check
3. What should the analyst avoid saying?
   - A. “I will verify ownership and next steps.”
   - B. “You will definitely receive a refund.”
   - C. “Please provide the last four digits.”
   - D. “I will review the related filing.”

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 11: Accepted filing under the wrong county
**Difficulty:** Intermediate  
**Workflow:** Wrong Attorney / County / Correction

A customer says a filing was submitted under the wrong county. RAC shows Accepted and CCIS shows the filing on the official docket.

**Facts provided:**
- Wrong county
- RAC: Accepted
- CCIS: docketed

### Decision questions
1. Which path applies?
   - A. Tell the customer to change the docket in the Portal
   - B. Refer correction/removal of the accepted/docketed record to the applicable Clerk
   - C. Return it to Workbench
   - D. Reset the account password
2. What should be recorded?
   - A. Separate RAC and CCIS findings and the Clerk referral
   - B. Only the customer’s statement
   - C. A Known Issue association
   - D. A payment refund
3. Should Portal Support tell the customer exactly how the corrected case must be filed?
   - A. Yes
   - B. No; provide technical navigation within scope and refer procedural choices to the Clerk
   - C. Only if the customer is an attorney
   - D. Only for one county

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 12: Multiple users report the same endpoint error
**Difficulty:** Advanced  
**Workflow:** Known Issue / Technical Error

Three users in different organizations report the same endpoint error within 20 minutes. Each is blocked from submitting. Basic troubleshooting has been completed for one user.

**Facts provided:**
- Three organizations
- Same exact error
- 20-minute window
- Submission blocked
- One complete Tier I result

### Decision questions
1. What should happen next?
   - A. Associate automatically to any similar Known Issue
   - B. Capture evidence for all affected users, search current Known Issues/Master Tickets, and follow the escalation procedure
   - C. Tell every user to keep retrying
   - D. Close as duplicate without notes
2. What belongs in the escalation?
   - A. Exact error/page/time, identifiers, environments, scope/impact, systems, Tier I results, attachments, and requested Analyst action
   - B. Only the first incident number
   - C. Customer passwords
   - D. A promised repair time
3. How should customers be updated?
   - A. Promise a fix within an hour
   - B. Use current manager-approved escalation/status wording without promising a repair time
   - C. Do not respond
   - D. Tell them it is definitely a statewide outage

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 13: Customer asks which summons and filing selections to use
**Difficulty:** Beginner  
**Workflow:** Clerk Referral / Procedural Question

A self-represented filer asks which summons form to use, which case type to select, and whether a fee applies in a specific county.

**Facts provided:**
- Form selection question
- Case-type selection question
- County-specific fee question

### Decision questions
1. What can Portal Support provide?
   - A. Exact legal selections
   - B. Technical/navigation assistance for the website and a referral for forms/procedure/fees
   - C. A guarantee of acceptance
   - D. A legal opinion
2. How should the county-specific information be handled?
   - A. Use any county note as final authority
   - B. Confirm current county guidance and refer the authoritative Clerk process
   - C. Apply statewide
   - D. Ignore the county
3. What should the work note state?
   - A. The Portal facts checked, why the issue is Clerk-controlled, and the referral provided
   - B. Only “referred”
   - C. The customer’s legal strategy
   - D. An invented fee amount

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 14: Correction Queue payment still fails after saved-method retry
**Difficulty:** Advanced  
**Workflow:** Wrong Attorney / County / Correction

A filing was returned to Correction Queue. Payment fails. The customer deleted the saved method and hand-keyed the information, but the complete browser/session steps have not been documented.

**Facts provided:**
- Correction Queue
- Payment failure
- Saved method removed
- Hand-keyed retry failed
- Incomplete troubleshooting record

### Decision questions
1. Is the ticket ready for escalation?
   - A. Yes, because one retry failed
   - B. No; complete and document the applicable browser/session and payment troubleshooting first unless current management directs otherwise
   - C. Yes, if the customer is an attorney
   - D. No, because payment issues are never escalated
2. Which systems should be reviewed?
   - A. TPE and the filing in RAC/My Submissions
   - B. Florida Bar and CCIS only
   - C. No systems
   - D. The customer’s bank portal
3. What should the escalation request identify?
   - A. The requested Analyst review/action after complete evidence
   - B. A refund promise
   - C. The customer’s full payment data
   - D. A legal conclusion

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---

## Scenario 15: Customer reply assembled from too many templates
**Difficulty:** Beginner  
**Workflow:** Known Issue / Technical Error

A draft contains three greetings, two Clerk disclaimers, a complete clean-slate message, and an unrelated refund paragraph. The verified issue is a PDF upload failure.

**Facts provided:**
- PDF upload failure
- Draft contains duplicated and unrelated Quick Messages

### Decision questions
1. What should the analyst do?
   - A. Send it because all text is manager-provided
   - B. Remove irrelevant/duplicated blocks and rewrite the final message to the verified issue
   - C. Add another greeting
   - D. Convert it to an internal note without review
2. What should remain in the message?
   - A. Acknowledgment, verified finding, applicable PDF/clean-retry steps, and a clear next action
   - B. The refund paragraph
   - C. Multiple complete greetings
   - D. Analyst-only system detail
3. What must happen before sending?
   - A. Review the final response against the ticket facts and job instructions
   - B. Nothing else
   - C. Delete the work note
   - D. Promise resolution

### Your ticket plan
- Issue type:
- Required facts still missing:
- Systems and findings:
- Troubleshooting/actions:
- Customer next step:
- Resolve or escalate:
- Ivanti work note:

---
