(() => {
  "use strict";

  const D = window.PSW_DATA;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const STORAGE = {
    pins: "pswGitPins",
    recent: "pswGitRecent",
    mode: "pswGitMode",
    checklistFilter: "pswChecklistFilter",
    collapseCompleted: "pswCollapseCompleted"
  };

  const state = {
    issue: "registration",
    done: new Set(),
    na: new Set(),
    systems: new Set(),
    parsed: [],
    activeOutput: "customer",
    mode: "work",
    checklistFilter: "all",
    replyKit: [],
    troubleKit: [],
    composerExtra: "",
    registrationDone: new Set(),
    searchIndex: []
  };

  const composerLibraries = {
    opening: {
      label: "Opening",
      options: [
        ["", "Select an opening"],
        ["standard", "Standard help-desk greeting"],
        ["followup", "Follow-up response"],
        ["phone", "After telephone contact"],
        ["delay", "Response-delay acknowledgment"]
      ],
      text: {
        standard: "Hello, and thank you for contacting the E-Filing Portal website MyFLCourtAccess.com Help Desk.",
        followup: "Hello, and thank you for following up with the MyFLCourtAccess.com Help Desk.",
        phone: "Thank you for speaking with me regarding your MyFLCourtAccess.com support request.",
        delay: "Hello, and thank you for your patience while the MyFLCourtAccess.com Help Desk reviewed your request."
      }
    },
    finding: {
      label: "Verified finding",
      options: [
        ["", "Select a verified finding"],
        ["portalstatus", "Portal status reviewed"],
        ["clerkaccepted", "Clerk accepted / docket pending"],
        ["notportal", "No Portal filing number identified"],
        ["account", "Portal account reviewed"],
        ["technical", "Technical symptom documented"]
      ],
      text: {
        portalstatus: "I reviewed the filing information available through the Portal and confirmed the current Portal status described below.",
        clerkaccepted: "The filing has moved through the Portal process. The Clerk controls final processing and placement on the official docket.",
        notportal: "The information provided does not include a Portal filing number. Without a Portal filing number, the issue may belong to the Clerk, Judge, or another system rather than the Portal.",
        account: "I reviewed the Portal account information available to the Help Desk and verified the account status described below.",
        technical: "I documented the reported technical symptom and the troubleshooting information provided."
      }
    },
    boundary: {
      label: "Portal / Clerk boundary",
      options: [
        ["", "Select a boundary statement"],
        ["navigation", "Portal navigation only"],
        ["docket", "Official docket belongs to Clerk"],
        ["legal", "No legal or procedural advice"],
        ["forward", "Cannot forward documents to case"],
        ["none", "No boundary statement needed"]
      ],
      text: {
        navigation: "Portal Support can provide technical and navigational assistance for MyFLCourtAccess.com.",
        docket: "The E-Filing Portal is not the county Clerk and cannot change, remove, or provide official access to the docket.",
        legal: "Portal Support cannot provide legal advice, select forms, or determine which filing selections are legally required.",
        forward: "Portal Support cannot process documents from email, forward them to the Clerk, or submit them to a Judge or case.",
        none: ""
      }
    },
    action: {
      label: "Next action",
      options: [
        ["", "Select a next action"],
        ["newfiling", "Start a clean new filing"],
        ["mysubmissions", "Review My Submissions"],
        ["password", "Use Forgot Password"],
        ["clerk", "Contact the Clerk"],
        ["info", "Request missing information"],
        ["escalated", "Analyst review pending"]
      ],
      text: {
        newfiling: "Use the Sign Out hyperlink, sign back in, and begin a new filing instead of resuming the failed Workbench item. Clear browser cache and cookies, update the browser, allow pop-ups and redirects, and validate the document before uploading one file at a time.",
        mysubmissions: "Open your Portal account and select My Submissions to review the current status and filing number.",
        password: "Enter the current username, remove anything displayed in the password field, select Forgot Password, and follow the temporary-password instructions sent to the email associated with the account.",
        clerk: "Contact the Clerk in the county where the case is or will be filed for case-specific, docket, procedural, or document-access assistance.",
        info: "Please provide the county, whether the filing is new or existing, the case number if one exists, the document involved, the Portal username, and the filing number when available.",
        escalated: "The reported issue has been turned over for additional Analyst review. Support will provide an update when more information is available."
      }
    },
    closing: {
      label: "Closing",
      options: [
        ["", "Select a closing"],
        ["standard", "Standard support closing"],
        ["noreply", "No-reply / new request closing"],
        ["questions", "Further questions"],
        ["resolved", "Self-resolved closing"]
      ],
      text: {
        standard: "Please review the instructions above and complete the applicable next step.",
        noreply: "Please do not reply to this email. If the issue remains unresolved or you have another e-filing question, submit a new Help Desk request through MyFLCourtAccess.com.",
        questions: "Please let the Help Desk know if the technical Portal issue remains unresolved after completing the steps above.",
        resolved: "The request has been documented as self-resolved. Please contact the Portal again if technical assistance is still needed."
      }
    }
  };

  const systemReference = [
    {name:"Ivanti", use:"Own, classify, document, communicate, resolve, and route the support incident.", limit:"Ivanti notes do not prove the Portal, payment, or official docket status unless those systems were separately checked."},
    {name:"RAC", use:"Review Portal registrations, accounts, filer information, filings, and Portal-side statuses.", limit:"A Portal status does not by itself prove Clerk acceptance or official docket placement."},
    {name:"CCIS", use:"Review the official case docket and case-party information when Portal Support has access and the workflow requires it.", limit:"Do not treat CCIS review as authority to alter the docket or provide legal/procedural advice."},
    {name:"TPE", use:"Research payment transactions using safe identifiers such as date, amount, payment type, and last four digits.", limit:"Never collect full payment-card or bank-account credentials; a transaction result does not by itself determine refund ownership."},
    {name:"My Submissions", use:"Confirm the filer-visible Portal filing history, filing number, and current Portal status.", limit:"Workbench history alone does not prove a filing was submitted."},
    {name:"Workbench", use:"Temporarily hold or review work in progress.", limit:"Do not resume a failed technical filing from Workbench when the current troubleshooting procedure requires a clean new filing."},
    {name:"Analyst / Tier II", use:"Investigate reproducible or unresolved technical issues after Tier I evidence and troubleshooting are complete.", limit:"Do not escalate an empty ticket. Include identifiers, systems checked, exact errors, reproduction, scope, impact, and attachments."},
    {name:"County Clerk", use:"Control official case processing, docket placement, accepted-filing corrections, procedural questions, document access, and many case-specific actions.", limit:"Portal Support should verify ownership before referring, but must not cross into legal advice or Clerk-controlled procedure."}
  ];

  const processMaps = [
    {title:"Registration", nodes:[["Intake","Claim the Ivanti ticket, select filer role, update fields, and rename the summary."],["Customer","Search before creating; verify contact information and EFI – Efilers organizational unit."],["RAC","Open Registration Applications and verify the current approval criteria."],["Decision","Approve or reject, record the reason, and communicate the result."],["Close","Add resolution notes, Cause Code, and save the resolved ticket."]]},
    {title:"Filing status / docket", nodes:[["Collect","Obtain the nine-digit filing number, county, case number, date, and exact concern."],["Portal","Review RAC and My Submissions; distinguish Workbench from submitted history."],["Docket","Review CCIS when the question concerns official placement or case-party status."],["Boundary","Separate Portal transmission from Clerk acceptance and docket placement."],["Outcome","Give the verified next action, Clerk referral, or technical escalation."]]},
    {title:"Upload / browser", nodes:[["Evidence","Record exact error, environment, identifiers, scope, screenshots, and timing."],["Session","Sign out, hand-key the URL, clear cache/cookies, update browser, and allow pop-ups."],["Document","Validate PDF format, security, filename, size, page size, and upload completion."],["Clean retry","Start over; do not resume the failed Workbench filing."],["Escalate","Document every result, reproduction, impact, and attachments before Analyst review."]]},
    {title:"Payment / refund", nodes:[["Collect safely","Payment type, last four only, exact date, amount, account holder, filing number."],["Research","Review TPE and the related filing status."],["Troubleshoot","Hand-key payment, review saved method, browser, session, and processing state."],["Ownership","Determine Portal/banking versus Clerk responsibility."],["Close","Document findings, referral, refund path, or escalation without promising an outcome."]]},
    {title:"My Cases / eService", nodes:[["Identify","Case lookup, docket access, subscription, eService delivery, or service-list issue."],["Search","Use party names, county, Include filters, and the correct Portal account."],["Verify","Attorney of Record, docket conditions, service-list email, spam, and bounce status."],["Explain","Profile changes do not automatically update service lists or Clerk records."],["Resolve","Provide navigation, Clerk referral, or escalation and document the checks."]]},
    {title:"Technical escalation", nodes:[["Describe","One-sentence problem statement and exact trigger."],["Identify","Ticket, user, filing, county, case, environment, time, scope, and deadline."],["Investigate","RAC/CCIS/TPE/SQL as applicable plus the complete Tier I troubleshooting path."],["Reproduce","Record whether and where it reproduces; search known issues or Master Tickets."],["Package","Attach evidence and state the exact Analyst action requested."]]}
  ];

  function load(key, fallback = []) { try { return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(fallback)); } catch { return fallback; } }
  function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
  function toast(text) { const el = $("#toast"); el.textContent = text; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 1700); }
  function copyText(text) { if (!text) return toast("Nothing to copy"); navigator.clipboard?.writeText(text).then(() => toast("Copied")).catch(() => { const area = document.createElement("textarea"); area.value = text; document.body.append(area); area.select(); document.execCommand("copy"); area.remove(); toast("Copied"); }); }

  function showTab(name) {
    $$(".nav[data-tab]").forEach(button => button.classList.toggle("active", button.dataset.tab === name));
    $$(".tab").forEach(tab => tab.classList.toggle("active", tab.id === `tab-${name}`));
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  function setMode(mode, openDefault = true) {
    state.mode = mode;
    save(STORAGE.mode, mode);
    $("#workModeButton").classList.toggle("active", mode === "work");
    $("#trainingModeButton").classList.toggle("active", mode === "training");
    $(".work-nav").classList.toggle("hidden", mode !== "work");
    $(".training-nav").classList.toggle("hidden", mode !== "training");
    if (openDefault) showTab(mode === "work" ? "work" : "registration");
  }

  function isPinned(type, id) { return load(STORAGE.pins).some(item => item.type === type && item.id === id); }
  function togglePin(type, id, title) {
    let pins = load(STORAGE.pins);
    pins = isPinned(type, id) ? pins.filter(item => !(item.type === type && item.id === id)) : [{type, id, title}, ...pins];
    save(STORAGE.pins, pins.slice(0, 24));
    renderPinned(); renderReplies(); renderTroubleCards();
  }
  function recordRecent(type, id, title) {
    let recent = load(STORAGE.recent).filter(item => !(item.type === type && item.id === id));
    recent.unshift({type, id, title}); save(STORAGE.recent, recent.slice(0, 10)); renderPinned();
  }

  function flatWorkflow(workflow = D.workflows[state.issue]) {
    const result = [];
    workflow.groups.forEach(group => group.items.forEach(item => result.push({...item, group: group.name, index: result.length})));
    return result;
  }
  function fieldValue(id) { return $(`#f-${id}`)?.value.trim() || ""; }
  function fieldLabel(id) { return D.fields[id]?.[0] || id; }

  function renderFields() {
    const workflow = D.workflows[state.issue];
    const container = $("#ticketFields");
    container.innerHTML = "";
    [...workflow.required, ...workflow.optional.filter(id => !workflow.required.includes(id))].forEach(id => {
      const [labelText, type, extra] = D.fields[id];
      const label = document.createElement("label"); label.className = `field ${type === "textarea" ? "full" : ""}`;
      label.innerHTML = `${labelText}${workflow.required.includes(id) ? '<span class="required">*</span>' : ""}`;
      let control;
      if (type === "textarea") control = document.createElement("textarea");
      else if (type === "select") { control = document.createElement("select"); extra.forEach(value => control.add(new Option(value || "Select", value))); }
      else { control = document.createElement("input"); control.type = type; if (extra) control.placeholder = extra; }
      control.id = `f-${id}`; control.autocomplete = "off";
      control.addEventListener("input", () => { updateGate(); buildOutputs(); });
      control.addEventListener("change", () => { updateGate(); buildOutputs(); });
      label.append(control); container.append(label);
    });
  }

  function renderSystems() {
    const workflow = D.workflows[state.issue]; const container = $("#systems"); container.innerHTML = ""; state.systems.clear();
    workflow.systems.forEach((name, index) => {
      const label = document.createElement("label"); label.className = "chip";
      const input = document.createElement("input"); input.type = "checkbox";
      input.addEventListener("change", () => { input.checked ? state.systems.add(index) : state.systems.delete(index); updateGate(); buildOutputs(); });
      label.append(input, document.createTextNode(name)); container.append(label);
    });
  }

  function renderChecklist() {
    const workflow = D.workflows[state.issue]; const container = $("#checklist"); const items = flatWorkflow(workflow);
    container.innerHTML = ""; state.done.clear(); state.na.clear();
    workflow.groups.forEach(group => {
      const section = document.createElement("section"); section.className = "check-group"; section.dataset.group = group.name;
      const heading = document.createElement("div"); heading.className = "check-title"; heading.innerHTML = `<span>${group.name}</span><span class="group-count">0 of ${group.items.length} addressed</span>`; section.append(heading);
      group.items.forEach(item => {
        const index = items.find(entry => entry.group === group.name && entry.text === item.text).index;
        const row = document.createElement("div"); row.className = "check-row"; row.dataset.index = String(index); row.dataset.core = item.required ? "true" : "false"; row.dataset.text = item.text.toLowerCase();
        const checkbox = document.createElement("input"); checkbox.type = "checkbox";
        const body = document.createElement("div"); body.innerHTML = `<span>${item.text}${item.required ? '<span class="core">CORE</span>' : ""}</span>${item.note ? `<span class="note">${item.note}</span>` : ""}`;
        const na = document.createElement("button"); na.className = "na"; na.textContent = "N/A";
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) { state.done.add(index); state.na.delete(index); na.classList.remove("active"); row.classList.add("done"); row.classList.remove("na-row"); }
          else { state.done.delete(index); row.classList.remove("done"); }
          updateChecklistStats(); applyChecklistFilter(); updateGate(); buildOutputs();
        });
        na.addEventListener("click", () => {
          const active = !state.na.has(index);
          if (active) { state.na.add(index); state.done.delete(index); checkbox.checked = false; na.classList.add("active"); row.classList.add("na-row"); row.classList.remove("done"); }
          else { state.na.delete(index); na.classList.remove("active"); row.classList.remove("na-row"); }
          updateChecklistStats(); applyChecklistFilter(); updateGate(); buildOutputs();
        });
        row.append(checkbox, body, na); section.append(row);
      });
      container.append(section);
    });
    updateChecklistStats(); applyChecklistFilter();
  }

  function updateChecklistStats() {
    const items = flatWorkflow(); $("#doneCount").textContent = state.done.size; $("#naCount").textContent = state.na.size; $("#openCount").textContent = Math.max(items.length - state.done.size - state.na.size, 0);
    $$(".check-group").forEach(section => {
      const groupItems = items.filter(item => item.group === section.dataset.group);
      const addressed = groupItems.filter(item => state.done.has(item.index) || state.na.has(item.index)).length;
      $(".group-count", section).textContent = `${addressed} of ${groupItems.length} addressed`;
    });
  }

  function applyChecklistFilter() {
    const query = $("#checkSearch").value.trim().toLowerCase(); const collapse = $("#collapseCompleted").checked;
    $$(".check-row").forEach(row => {
      const index = Number(row.dataset.index); const done = state.done.has(index); const na = state.na.has(index); const open = !done && !na; const core = row.dataset.core === "true";
      const stateMatch = state.checklistFilter === "all" || (state.checklistFilter === "open" && open) || (state.checklistFilter === "core" && core) || (state.checklistFilter === "done" && done) || (state.checklistFilter === "na" && na);
      row.classList.toggle("hidden-by-filter", !(stateMatch && (!query || row.dataset.text.includes(query))));
    });
    $$(".check-group").forEach(section => {
      const rows = $$(".check-row", section); const anyVisible = rows.some(row => !row.classList.contains("hidden-by-filter"));
      const allAddressed = rows.every(row => { const i = Number(row.dataset.index); return state.done.has(i) || state.na.has(i); });
      section.classList.toggle("hidden-by-filter", !anyVisible); section.classList.toggle("collapsed-complete", collapse && allAddressed);
    });
  }

  function missingItems() {
    const workflow = D.workflows[state.issue]; const missing = [];
    workflow.required.forEach(id => { if (!fieldValue(id)) missing.push(fieldLabel(id)); });
    if (!state.systems.size) missing.push("At least one relevant system checked");
    flatWorkflow(workflow).filter(item => item.required).forEach(item => { if (!state.done.has(item.index) && !state.na.has(item.index)) missing.push(`Core checklist step: ${item.text}`); });
    return missing;
  }

  function updateGate() {
    const missing = missingItems(); const gate = $("#completionGate"); const list = $("#missingItems"); list.innerHTML = ""; gate.classList.toggle("ready", !missing.length);
    $("h3", gate).textContent = missing.length ? `${missing.length} item${missing.length === 1 ? "" : "s"} still needed` : "Minimum documentation is complete";
    (missing.length ? missing : ["Review the output and current procedure before copying or closing."]).forEach(text => { const li = document.createElement("li"); li.textContent = text; list.append(li); });
    updateWorkflowSteps();
  }

  function updateWorkflowSteps() {
    const workflow = D.workflows[state.issue]; const fieldsReady = workflow.required.every(id => fieldValue(id)); const core = flatWorkflow(workflow).filter(item => item.required); const investigated = state.systems.size > 0 && core.every(item => state.done.has(item.index) || state.na.has(item.index)); const steps = $$(".step"); steps.forEach(step => step.className = "step");
    if (!fieldsReady) steps[0].classList.add("active"); else { steps[0].classList.add("complete"); if (!investigated) steps[1].classList.add("active"); else { steps[1].classList.add("complete"); steps[2].classList.add("complete"); steps[3].classList.add("active"); } }
  }

  function facts() { const workflow = D.workflows[state.issue]; return [...workflow.required, ...workflow.optional].map(id => fieldValue(id) ? `${fieldLabel(id)}: ${fieldValue(id)}` : null).filter(Boolean); }
  function completedActions() { const items = flatWorkflow(); return [...state.done].sort((a,b)=>a-b).map(index => items[index].text); }
  function naActions() { const items = flatWorkflow(); return [...state.na].sort((a,b)=>a-b).map(index => items[index].text); }
  function systemNames() { return [...state.systems].sort((a,b)=>a-b).map(index => D.workflows[state.issue].systems[index]); }

  function buildOutputs() {
    const workflow = D.workflows[state.issue]; const factLines = facts(); const actions = completedActions(); const na = naActions(); const systems = systemNames(); const name = fieldValue("customerName"); const issue = fieldValue("issueSummary"); const finding = fieldValue("docketFinding") || fieldValue("statusValue");
    const values = {
      customer: [name ? `Hello ${name},\n\nThank you for contacting the MyFLCourtAccess.com Help Desk.` : "Thank you for contacting the MyFLCourtAccess.com Help Desk.", issue ? `\nI reviewed your request regarding: ${issue}` : "", finding ? `\nVerified information: ${finding}` : "", `\n${workflow.customer.map(item => `• ${item}`).join("\n")}`, "\nPlease review the instructions above and use the current approved process."].filter(Boolean).join("\n"),
      worknote: [`Ticket type: ${workflow.label}`, issue ? `Issue: ${issue}` : "Issue: [enter customer issue]", "", "Facts collected:", ...(factLines.length ? factLines.map(item => `• ${item}`) : ["• No facts entered"]), "", "Systems checked:", ...(systems.length ? systems.map(item => `• ${item}`) : ["• None checked"]), "", "Checklist completed:", ...(actions.length ? actions.map(item => `• ${item}`) : ["• None checked"]), ...(na.length ? ["", "Checklist marked N/A:", ...na.map(item => `• ${item}`)] : [])].join("\n"),
      resolution: [`Issue: ${issue || `[${workflow.label} issue]`}`, `Verification: ${systems.length ? `Reviewed ${systems.join(", ")}.` : "[Record systems reviewed]."}`, `Action: ${actions.length ? actions.join(" ") : "[Record action taken]."}`, "Communication: Customer provided with the applicable instructions or status.", `Outcome: ${missingItems().length ? "[Incomplete — finish core documentation before resolving]." : "[Resolved / referred / escalated]."}`].join("\n"),
      escalation: [`Ticket type: ${workflow.label}`, ...factLines, "", `Systems reviewed: ${systems.length ? systems.join(", ") : "[none recorded]"}`, "", "Checklist / troubleshooting completed:", ...(actions.length ? actions.map(item => `• ${item}`) : ["• [none recorded]"]), ...(na.length ? ["", "Not applicable:", ...na.map(item => `• ${item}`)] : []), "", `Additional troubleshooting detail: ${fieldValue("troubleshootingValue") || "[not entered]"}`, `Attachments: ${fieldValue("attachmentsValue") || "[not entered]"}`, `Business impact: ${fieldValue("impactValue") || "[not entered]"}`, `Reproducible: ${fieldValue("reproValue") || "[not entered]"}`, "", "Requested action: Analyst / Tier II review."].join("\n")
    };
    renderOutputs(values); updateGate();
  }

  function renderOutputs(values) {
    const container = $("#outputPanels"); container.innerHTML = "";
    const titles = {customer:"Customer-facing draft", worknote:"Ivanti work note", resolution:"Resolution note", escalation:"Analyst / Tier II package"};
    Object.entries(values).forEach(([key, value]) => {
      const panel = document.createElement("div"); panel.className = `output-panel ${state.activeOutput === key ? "active" : ""}`; panel.dataset.panel = key;
      panel.innerHTML = `<div class="output-head"><strong>${titles[key]}</strong><button class="copy-btn secondary">Copy</button></div><textarea></textarea>`;
      $("textarea", panel).value = value; $(".copy-btn", panel).addEventListener("click", () => copyText($("textarea", panel).value)); container.append(panel);
    });
  }

  function ticketBundle() {
    const outputs = {}; $$(".output-panel").forEach(panel => outputs[panel.dataset.panel] = $("textarea", panel).value);
    return ["=== CUSTOMER RESPONSE ===", outputs.customer || "", "", "=== IVANTI WORK NOTE ===", outputs.worknote || "", "", "=== RESOLUTION NOTE ===", outputs.resolution || "", "", "=== ANALYST / TIER II PACKAGE ===", outputs.escalation || ""].join("\n");
  }

  function renderWork() {
    const select = $("#issueType"); if (!select.options.length) Object.entries(D.workflows).forEach(([key, workflow]) => select.add(new Option(workflow.label, key)));
    select.value = state.issue; const workflow = D.workflows[state.issue]; $("#purpose").textContent = workflow.purpose; $("#sourceWarning").textContent = workflow.warning || workflow.completion || "Verify dated or incomplete source language against the current procedure.";
    renderFields(); renderSystems(); renderChecklist(); buildOutputs();
  }

  function clearTicket() { renderWork(); $("#parserText").value = ""; $("#parsedResults").innerHTML = ""; state.parsed = []; $("#applyParsed").disabled = true; toast("Ticket cleared"); }

  const parsers = [
    ["incidentNumber", /(?:ticket|incident)(?:\s*(?:number|#))?\s*[:#-]?\s*(\d{5,})/i],
    ["filingNumber", /(?:filing)(?:\s*(?:number|#))?\s*[:#-]?\s*(\d{7,12})/i],
    ["caseNumber", /(?:case)(?:\s*(?:number|#))?\s*[:#-]?\s*([A-Z0-9-]{6,})/i],
    ["barNumber", /(?:bar)(?:\s*(?:number|#))?\s*[:#-]?\s*(\d{4,})/i],
    ["emailValue", /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i],
    ["phoneValue", /(\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4})/],
    ["countyValue", /\b([A-Z][a-z]+)\s+County\b/],
    ["amountValue", /\$\s?(\d+(?:\.\d{2})?)/],
    ["browserValue", /\b(Chrome|Edge|Firefox|Safari)(?:\s+(?:version\s*)?(\d+(?:\.\d+)*))?/i]
  ];

  function parseTicket() {
    const text = $("#parserText").value; state.parsed = [];
    parsers.forEach(([field, pattern]) => { const match = text.match(pattern); if (match) state.parsed.push({field, value: match[2] ? `${match[1]} ${match[2]}` : match[1], selected: true}); });
    renderParsed();
  }
  function renderParsed() {
    const container = $("#parsedResults"); container.innerHTML = "";
    state.parsed.forEach((item, index) => { const row = document.createElement("label"); row.className = "parsed"; row.innerHTML = `<input type="checkbox" ${item.selected ? "checked" : ""}><strong>${fieldLabel(item.field)}</strong><span>${item.value}</span>`; $("input", row).addEventListener("change", event => item.selected = event.target.checked); container.append(row); });
    $("#applyParsed").disabled = !state.parsed.length;
  }
  function applyParsed() { state.parsed.filter(item => item.selected).forEach(item => { const field = $(`#f-${item.field}`); if (field) field.value = item.value; }); buildOutputs(); toast("Selected fields applied"); }

  function renderPinned() {
    const container = $("#pinnedRecent"); const pins = load(STORAGE.pins); const recent = load(STORAGE.recent); container.innerHTML = "";
    const items = [...pins.map(item => ({...item, label:"Pinned"})), ...recent.filter(r => !pins.some(p => p.type === r.type && p.id === r.id)).map(item => ({...item, label:"Recent"}))].slice(0, 12);
    if (!items.length) { container.innerHTML = '<p class="muted">Pin a reply or troubleshooting card. Recently copied items also appear here.</p>'; return; }
    items.forEach(item => { const button = document.createElement("button"); button.innerHTML = `<strong>${item.title}</strong><br><small>${item.label} · ${item.type}</small>`; button.addEventListener("click", () => { if (item.type === "reply") { setMode("work", false); showTab("replies"); $("#replySearch").value = item.title; renderReplies(); } else { setMode("work", false); showTab("troubleshoot"); $("#troubleSearch").value = item.title; renderTroubleCards(); } }); container.append(button); });
  }

  function uniqueValues(items, key) { return [...new Set(items.map(item => item[key]).filter(Boolean))].sort(); }
  function populateSelect(select, values, allLabel) { const current = select.value; select.innerHTML = ""; select.add(new Option(allLabel, "")); values.forEach(value => select.add(new Option(value, value))); if ([...select.options].some(option => option.value === current)) select.value = current; }

  function cardElement(item, type) {
    const card = document.createElement("article"); card.className = "item-card";
    const verify = item.verify ? '<span class="warning-tag">VERIFY</span>' : ""; const warning = item.warning ? `<div class="warning-box">${item.warning}</div>` : "";
    card.innerHTML = `<div class="item-head"><div><h3>${item.title}${verify}</h3><div class="meta">${[item.category, item.audience].filter(Boolean).join(" · ")}</div></div><button class="pin ${isPinned(type, item.id) ? "active" : ""}">${isPinned(type, item.id) ? "Pinned" : "Pin"}</button></div>${warning}<div class="source-text">${item.text}</div><div class="item-actions"><button class="add-kit">Add to ${type === "reply" ? "reply" : "troubleshooting"} kit</button><button class="copy-card">Copy now</button></div>`;
    $(".pin", card).addEventListener("click", () => togglePin(type, item.id, item.title));
    $(".copy-card", card).addEventListener("click", () => { copyText(item.text); recordRecent(type, item.id, item.title); });
    $(".add-kit", card).addEventListener("click", () => { addToKit(type, item); recordRecent(type, item.id, item.title); });
    return card;
  }

  function addToKit(type, item) {
    const kit = type === "reply" ? state.replyKit : state.troubleKit;
    if (kit.some(entry => entry.id === item.id)) return toast("Already in selected kit");
    kit.push({id:item.id, title:item.title, text:item.text, type});
    type === "reply" ? renderReplyKit() : renderTroubleKit(); toast("Added to selected kit");
  }

  function renderKit(containerSelector, kit, renderAfter) {
    const container = $(containerSelector); container.innerHTML = "";
    if (!kit.length) { container.innerHTML = '<div class="kit-empty">Nothing selected yet.</div>'; return; }
    kit.forEach((item, index) => {
      const row = document.createElement("div"); row.className = "kit-item"; row.innerHTML = `<div class="kit-item-head"><strong>${index + 1}. ${item.title}</strong><div class="kit-controls"><button data-move="up" title="Move up">↑</button><button data-move="down" title="Move down">↓</button><button class="remove" title="Remove">×</button></div></div>`;
      $("[data-move='up']", row).disabled = index === 0; $("[data-move='down']", row).disabled = index === kit.length - 1;
      $("[data-move='up']", row).addEventListener("click", () => { [kit[index-1], kit[index]] = [kit[index], kit[index-1]]; renderAfter(); });
      $("[data-move='down']", row).addEventListener("click", () => { [kit[index+1], kit[index]] = [kit[index], kit[index+1]]; renderAfter(); });
      $(".remove", row).addEventListener("click", () => { kit.splice(index, 1); renderAfter(); }); container.append(row);
    });
  }

  function replyKitText() {
    const parts = [];
    if ($("#kitIncludeGreeting").checked) parts.push("Hello, and thank you for contacting the E-Filing Portal website MyFLCourtAccess.com Help Desk.");
    state.replyKit.forEach(item => parts.push(item.text.trim()));
    if ($("#kitIncludeClosing").checked) parts.push("Please do not reply to this email. If the issue remains unresolved or you have another e-filing question, submit a new Help Desk request through MyFLCourtAccess.com.");
    return parts.filter(Boolean).join("\n\n");
  }
  function renderReplyKit() { renderKit("#replyKit", state.replyKit, renderReplyKit); $("#replyKitPreview").value = replyKitText(); }
  function renderTroubleKit() { renderKit("#troubleKit", state.troubleKit, renderTroubleKit); }

  function renderReplies() {
    populateSelect($("#replyCategory"), uniqueValues(D.quickReplies, "category"), "All categories"); populateSelect($("#replyAudience"), uniqueValues(D.quickReplies, "audience"), "All audiences");
    const query = $("#replySearch").value.trim().toLowerCase(); const category = $("#replyCategory").value; const audience = $("#replyAudience").value; const verifyOnly = $("#replyVerifyOnly").checked;
    const items = D.quickReplies.filter(item => (!query || `${item.title} ${item.text} ${item.category} ${item.audience}`.toLowerCase().includes(query)) && (!category || item.category === category) && (!audience || item.audience === audience) && (!verifyOnly || item.verify));
    $("#replyCount").textContent = `${items.length} repl${items.length === 1 ? "y" : "ies"}`; const container = $("#replyCards"); container.innerHTML = ""; items.forEach(item => container.append(cardElement(item, "reply"))); renderReplyKit();
  }

  function renderTroubleCards() {
    populateSelect($("#troubleCategory"), uniqueValues(D.troubleshootingCards, "category"), "All categories");
    const query = $("#troubleSearch").value.trim().toLowerCase(); const category = $("#troubleCategory").value; const verifyOnly = $("#troubleVerifyOnly").checked;
    const items = D.troubleshootingCards.filter(item => (!query || `${item.title} ${item.text} ${item.category}`.toLowerCase().includes(query)) && (!category || item.category === category) && (!verifyOnly || item.verify));
    $("#troubleCount").textContent = `${items.length} item${items.length === 1 ? "" : "s"}`; const container = $("#troubleCards"); container.innerHTML = ""; items.forEach(item => container.append(cardElement(item, "trouble"))); renderTroubleKit();
  }

  function renderMasterTrouble() {
    const container = $("#masterTroubleChecklist"); container.innerHTML = ""; let current = "";
    D.troubleshootingChecklist.forEach((item, index) => { if (item.group !== current) { current = item.group; const heading = document.createElement("div"); heading.className = "master-group"; heading.textContent = current; container.append(heading); } const label = document.createElement("label"); label.className = "master-check"; label.innerHTML = `<input type="checkbox" data-master="${index}"><span>${item.text}</span>`; container.append(label); });
  }

  function renderComposerControls() {
    const container = $("#composerControls"); container.innerHTML = "";
    Object.entries(composerLibraries).forEach(([key, library]) => { const label = document.createElement("label"); label.className = "field"; label.textContent = library.label; const select = document.createElement("select"); select.id = `composer-${key}`; library.options.forEach(([value, text]) => select.add(new Option(text, value))); select.addEventListener("change", buildComposer); label.append(select); container.append(label); });
    $("#composerDetail").addEventListener("input", buildComposer); $("#composerBullets").addEventListener("change", buildComposer); buildComposer();
  }
  function buildComposer() {
    const parts = [];
    for (const [key, library] of Object.entries(composerLibraries)) { const value = $(`#composer-${key}`)?.value || ""; let text = library.text[value] || ""; if (key === "action" && text && $("#composerBullets").checked) text = text.split(/(?<=\.)\s+/).filter(Boolean).map(line => `• ${line}`).join("\n"); if (text) parts.push(text); }
    const detail = $("#composerDetail").value.trim(); if (detail) parts.splice(Math.min(parts.length, 2), 0, `Verified case-specific detail: ${detail}`); $("#composedReplyOutput").value = parts.join("\n\n");
  }
  function clearComposer() { Object.keys(composerLibraries).forEach(key => $(`#composer-${key}`).value = ""); $("#composerDetail").value = ""; $("#composerBullets").checked = false; buildComposer(); }
  function composerFromTicket() { const info = facts().join("; "); $("#composerDetail").value = info; $("#composer-opening").value = "standard"; const workflow = state.issue; $("#composer-finding").value = workflow === "access" ? "account" : workflow === "technical" || workflow === "upload" ? "technical" : "portalstatus"; $("#composer-boundary").value = workflow === "clerk" ? "legal" : workflow === "filing" || workflow === "cases" || workflow === "correction" ? "docket" : "navigation"; $("#composer-action").value = workflow === "access" ? "password" : workflow === "upload" ? "newfiling" : workflow === "clerk" ? "clerk" : "mysubmissions"; $("#composer-closing").value = "standard"; buildComposer(); toast("Current ticket facts added"); }

  function registrationGroups() {
    const workflow = D.workflows.registration;
    return workflow.groups;
  }
  function renderRegistrationTraining() {
    const container = $("#registrationTrainingChecklist"); container.innerHTML = ""; let index = 0;
    registrationGroups().forEach(group => { const section = document.createElement("section"); section.className = "registration-group"; section.innerHTML = `<h3>${group.name}</h3>`; group.items.forEach(item => { const current = index++; const label = document.createElement("label"); label.className = `registration-row ${state.registrationDone.has(current) ? "done" : ""}`; label.innerHTML = `<input type="checkbox" ${state.registrationDone.has(current) ? "checked" : ""}><span>${item.text}</span>`; $("input", label).addEventListener("change", event => { event.target.checked ? state.registrationDone.add(current) : state.registrationDone.delete(current); renderRegistrationTraining(); }); section.append(label); }); container.append(section); });
    const total = index; $("#regDone").textContent = state.registrationDone.size; $("#regOpen").textContent = total - state.registrationDone.size; $("#regPercent").textContent = `${Math.round((state.registrationDone.size / total) * 100)}%`;
  }

  function renderSource() {
    populateSelect($("#sourceCategory"), uniqueValues(D.sourceSections, "category"), "All source categories");
    const query = $("#sourceSearch").value.trim().toLowerCase(); const category = $("#sourceCategory").value;
    const items = D.sourceSections.filter(item => (!query || `${item.title} ${item.text} ${item.category}`.toLowerCase().includes(query)) && (!category || item.category === category)); $("#sourceCount").textContent = `${items.length} source entries`;
    const container = $("#sourceCards"); container.innerHTML = ""; items.forEach(item => { const card = document.createElement("article"); card.className = "source-card"; card.innerHTML = `<h3>${item.title}<span class="source-filter-badge">${item.category || "Source"}</span></h3><div class="meta">${item.status || "Review before use"}</div><div class="source-text">${item.text}</div>`; container.append(card); });
  }

  function renderTerms() { const query = $("#termSearch").value.trim().toLowerCase(); const container = $("#termCards"); container.innerHTML = ""; D.glossary.filter(item => !query || `${item.term} ${item.definition}`.toLowerCase().includes(query)).forEach(item => { const card = document.createElement("article"); card.className = "item-card"; card.innerHTML = `<h3>${item.term}</h3><p>${item.definition}</p>`; container.append(card); }); }
  function renderPolicies() { const container = $("#policyCards"); container.innerHTML = ""; D.policyCards.forEach(item => { const card = document.createElement("article"); card.className = "policy-card"; card.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`; container.append(card); }); }
  function renderSystemsReference() { const container = $("#systemCards"); container.innerHTML = ""; systemReference.forEach(item => { const card = document.createElement("article"); card.className = "system-card"; card.innerHTML = `<h3>${item.name}</h3><h4>Use it to</h4><p>${item.use}</p><h4>Do not infer</h4><p>${item.limit}</p>`; container.append(card); }); }
  function renderProcessMaps() { const container = $("#processMaps"); container.innerHTML = ""; processMaps.forEach(map => { const card = document.createElement("article"); card.className = "process-map"; const track = map.nodes.map(([title, text], index) => `<div class="process-node"><strong>${index + 1}. ${title}</strong><span>${text}</span></div>${index < map.nodes.length - 1 ? '<div class="process-arrow">→</div>' : ""}`).join(""); card.innerHTML = `<h3>${map.title}</h3><div class="process-track">${track}</div>`; container.append(card); }); }

  function searchIndex() {
    const index = [];
    Object.entries(D.workflows).forEach(([key, workflow]) => index.push({type:"Workflow", title:workflow.label, text:`${workflow.purpose} ${workflow.groups.flatMap(group => group.items.map(item => item.text)).join(" ")}`, action:() => { setMode("work", false); state.issue = key; renderWork(); showTab("work"); }}));
    D.quickReplies.forEach(item => index.push({type:"Reply", title:item.title, text:`${item.text} ${item.category} ${item.audience}`, action:() => { setMode("work", false); showTab("replies"); $("#replySearch").value = item.title; renderReplies(); }}));
    D.troubleshootingCards.forEach(item => index.push({type:"Troubleshooting", title:item.title, text:`${item.text} ${item.category}`, action:() => { setMode("work", false); showTab("troubleshoot"); $("#troubleSearch").value = item.title; renderTroubleCards(); }}));
    D.sourceSections.forEach(item => index.push({type:"Source", title:item.title, text:`${item.text} ${item.category}`, action:() => { setMode("training", false); showTab("source"); $("#sourceSearch").value = item.title; renderSource(); }}));
    D.glossary.forEach(item => index.push({type:"Term", title:item.term, text:item.definition, action:() => { setMode("training", false); showTab("terms"); $("#termSearch").value = item.term; renderTerms(); }}));
    systemReference.forEach(item => index.push({type:"System", title:item.name, text:`${item.use} ${item.limit}`, action:() => { setMode("training", false); showTab("systems"); }}));
    return index;
  }
  function openCommand() { $("#commandOverlay").classList.remove("hidden"); $("#commandInput").value = ""; renderCommand(""); setTimeout(() => $("#commandInput").focus(), 0); }
  function renderCommand(query) { const q = query.trim().toLowerCase(); const results = (q ? state.searchIndex.filter(item => `${item.title} ${item.text}`.toLowerCase().includes(q)) : state.searchIndex.slice(0, 10)).slice(0, 30); const container = $("#commandResults"); container.innerHTML = ""; results.forEach(item => { const button = document.createElement("button"); button.className = "command-result"; button.innerHTML = `<span class="result-type">${item.type}</span><strong>${item.title}</strong><small>${item.text.slice(0, 150)}</small>`; button.addEventListener("click", () => { $("#commandOverlay").classList.add("hidden"); item.action(); }); container.append(button); }); if (!results.length) container.innerHTML = '<div class="kit-empty">No matching guidance.</div>'; }

  function nextIncomplete() {
    const requiredField = D.workflows[state.issue].required.find(id => !fieldValue(id));
    if (requiredField) { const field = $(`#f-${requiredField}`); field.scrollIntoView({behavior:"smooth", block:"center"}); field.focus(); return toast(`Next: ${fieldLabel(requiredField)}`); }
    if (!state.systems.size) { $("#systems").scrollIntoView({behavior:"smooth", block:"center"}); return toast("Next: check a relevant system"); }
    const missingCore = flatWorkflow().find(item => item.required && !state.done.has(item.index) && !state.na.has(item.index));
    if (missingCore) { const row = $(`.check-row[data-index='${missingCore.index}']`); row.scrollIntoView({behavior:"smooth", block:"center"}); row.animate([{outline:"3px solid #2d9b83"},{outline:"0 solid transparent"}],{duration:1300}); return toast("Next core checklist step"); }
    $("#outputsCard").scrollIntoView({behavior:"smooth", block:"start"}); toast("Core documentation complete—review outputs");
  }

  function initEvents() {
    $("#ackCheck").addEventListener("change", event => $("#enterApp").disabled = !event.target.checked);
    $("#enterApp").addEventListener("click", () => $("#securityGate").classList.add("hidden"));
    $$(".nav[data-tab]").forEach(button => button.addEventListener("click", () => showTab(button.dataset.tab)));
    $$("[data-action='search']").forEach(button => button.addEventListener("click", openCommand));
    $("#workModeButton").addEventListener("click", () => setMode("work")); $("#trainingModeButton").addEventListener("click", () => setMode("training"));
    $("#topSearch").addEventListener("click", openCommand); $("#topNewTicket").addEventListener("click", () => { setMode("work", false); showTab("work"); clearTicket(); }); $("#heroNewTicket").addEventListener("click", clearTicket);
    $("#issueType").addEventListener("change", event => { state.issue = event.target.value; renderWork(); }); $("#clearTicket").addEventListener("click", clearTicket); $("#refreshOutputs").addEventListener("click", buildOutputs);
    $("#markAll").addEventListener("click", () => { flatWorkflow().forEach(item => state.done.add(item.index)); state.na.clear(); $$(".check-row").forEach(row => { $("input", row).checked = true; row.classList.add("done"); row.classList.remove("na-row"); $(".na", row).classList.remove("active"); }); updateChecklistStats(); applyChecklistFilter(); buildOutputs(); });
    $("#copyInvestigation").addEventListener("click", () => copyText(["Systems checked:", ...(systemNames().length ? systemNames().map(x=>`• ${x}`) : ["• None"]), "", "Checklist completed:", ...(completedActions().length ? completedActions().map(x=>`• ${x}`) : ["• None"]), ...(naActions().length ? ["", "Marked N/A:", ...naActions().map(x=>`• ${x}`)] : [])].join("\n")));
    $("#copyTicketBundle").addEventListener("click", () => copyText(ticketBundle())); $("#nextIncomplete").addEventListener("click", nextIncomplete);
    $("#sendToComposer").addEventListener("click", () => { setMode("work", false); showTab("composer"); composerFromTicket(); });
    $$(".output-tab").forEach(button => button.addEventListener("click", () => { state.activeOutput = button.dataset.output; $$(".output-tab").forEach(b => b.classList.toggle("active", b === button)); $$(".output-panel").forEach(panel => panel.classList.toggle("active", panel.dataset.panel === state.activeOutput)); }));
    $("#checkSearch").addEventListener("input", applyChecklistFilter); $$("[data-check-filter]").forEach(button => button.addEventListener("click", () => { state.checklistFilter = button.dataset.checkFilter; save(STORAGE.checklistFilter, state.checklistFilter); $$("[data-check-filter]").forEach(b => b.classList.toggle("active", b === button)); applyChecklistFilter(); }));
    $("#collapseCompleted").addEventListener("change", event => { save(STORAGE.collapseCompleted, event.target.checked); applyChecklistFilter(); });
    $("#parseButton").addEventListener("click", parseTicket); $("#applyParsed").addEventListener("click", applyParsed);
    ["#replySearch","#replyCategory","#replyAudience","#replyVerifyOnly"].forEach(selector => $(selector).addEventListener(selector === "#replySearch" ? "input" : "change", renderReplies));
    ["#troubleSearch","#troubleCategory","#troubleVerifyOnly"].forEach(selector => $(selector).addEventListener(selector === "#troubleSearch" ? "input" : "change", renderTroubleCards));
    $("#kitIncludeGreeting").addEventListener("change", renderReplyKit); $("#kitIncludeClosing").addEventListener("change", renderReplyKit); $("#clearReplyKit").addEventListener("click", () => { state.replyKit = []; renderReplyKit(); }); $("#copyReplyKit").addEventListener("click", () => copyText(replyKitText()));
    $("#clearTroubleKit").addEventListener("click", () => { state.troubleKit = []; renderTroubleKit(); }); $("#copyTroubleKit").addEventListener("click", () => copyText(state.troubleKit.map(item => item.text).join("\n\n")));
    $("#copyTroubleChecked").addEventListener("click", () => { const selected = $$("[data-master]:checked").map(input => D.troubleshootingChecklist[Number(input.dataset.master)]); copyText(["Troubleshooting completed:", ...(selected.length ? selected.map(item => `• ${item.text}`) : ["• None checked"])].join("\n")); });
    $("#copyComposer").addEventListener("click", () => copyText($("#composedReplyOutput").value)); $("#clearComposer").addEventListener("click", clearComposer); $("#composerFromTicket").addEventListener("click", composerFromTicket); $("#composerToKit").addEventListener("click", () => { const text = $("#composedReplyOutput").value.trim(); if (!text) return toast("Build a response first"); const item = {id:`composer-${Date.now()}`,title:"Composed response",text,type:"reply"}; state.replyKit.push(item); renderReplyKit(); showTab("replies"); toast("Composed response added to reply kit"); });
    $("#resetRegistrationTraining").addEventListener("click", () => { state.registrationDone.clear(); renderRegistrationTraining(); }); $("#copyRegistrationTraining").addEventListener("click", () => { let index=0; const lines=[]; registrationGroups().forEach(group => group.items.forEach(item => { if (state.registrationDone.has(index)) lines.push(`• ${item.text}`); index++; })); copyText(["Registration training steps completed:", ...(lines.length ? lines : ["• None completed"])].join("\n")); });
    $("#sourceSearch").addEventListener("input", renderSource); $("#sourceCategory").addEventListener("change", renderSource); $("#termSearch").addEventListener("input", renderTerms);
    $("#commandInput").addEventListener("input", event => renderCommand(event.target.value)); $("#closeCommand").addEventListener("click", () => $("#commandOverlay").classList.add("hidden")); $("#commandOverlay").addEventListener("click", event => { if (event.target === $("#commandOverlay")) $("#commandOverlay").classList.add("hidden"); });
    document.addEventListener("keydown", event => { const key = event.key.toLowerCase(); if ((event.ctrlKey || event.metaKey) && key === "k") { event.preventDefault(); openCommand(); } else if (event.altKey && key === "n") { event.preventDefault(); setMode("work", false); showTab("work"); clearTicket(); } else if (event.altKey && key === "r") { event.preventDefault(); setMode("work", false); showTab("composer"); } else if (event.altKey && key === "q") { event.preventDefault(); setMode("work", false); showTab("replies"); } else if (event.altKey && key === "t") { event.preventDefault(); setMode("work", false); showTab("troubleshoot"); } else if (event.key === "Escape") $("#commandOverlay").classList.add("hidden"); });
  }

  function init() {
    state.mode = load(STORAGE.mode, "work"); state.checklistFilter = load(STORAGE.checklistFilter, "all");
    $("#collapseCompleted").checked = load(STORAGE.collapseCompleted, false);
    initEvents(); renderWork(); renderTroubleCards(); renderMasterTrouble(); renderComposerControls(); renderReplies(); renderRegistrationTraining(); renderSource(); renderTerms(); renderPolicies(); renderSystemsReference(); renderProcessMaps(); renderPinned(); state.searchIndex = searchIndex();
    const filterButton = $(`[data-check-filter='${state.checklistFilter}']`) || $("[data-check-filter='all']"); $$("[data-check-filter]").forEach(button => button.classList.toggle("active", button === filterButton)); applyChecklistFilter(); setMode(state.mode, true);
  }

  document.addEventListener("DOMContentLoaded", init);
})();