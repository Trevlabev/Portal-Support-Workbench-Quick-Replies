(() => {
  "use strict";

  const D = window.PSW_DATA;
  if (!D) return;

  const procedure = {
    id: "core-system-sign-in",
    title: "Sign in to Ivanti, RAC, and the Attorney E-Filing Portal",
    category: "Core system access",
    status: "Active team procedure",
    summary: "Open the correct official system and use the account assigned for that purpose. RAC and the Attorney E-Filing Portal use the same MyFLCourtAccess.com address but different account credentials.",
    useWhen: [
      "Beginning daily Portal Support work",
      "Opening or updating an Ivanti ticket",
      "Reviewing a registration or account in RAC",
      "Testing the filer-facing Portal with the Attorney account"
    ],
    systems: [
      {name: "Ivanti / HEAT", required: true},
      {name: "RAC — System Admin account", required: true},
      {name: "Attorney E-Filing Portal account", required: false}
    ],
    before: [
      "Use an Organization-managed device and approved browser.",
      "Keep passwords out of the Workbench, Ivanti notes, email, and screenshots.",
      "Confirm which account is required before signing in because RAC and the Attorney account use the same website address."
    ],
    steps: [
      {text: "Open Ivanti / HEAT at https://www.myhelpsupport.com/HEAT and sign in with the approved Ivanti credentials.", core: true},
      {text: "For RAC administrative work, open https://www.myflcourtaccess.com/ and use the RAC System Admin account.", core: true},
      {text: "For the RAC username, use your flclerks username.", core: true},
      {text: "For the RAC password, use the RAC-specific password that is separate from your normal login password.", core: true},
      {text: "For filer-facing testing, open https://www.myflcourtaccess.com/ and use the Attorney E-Filing Portal website account.", core: false, when: "The task requires the attorney-facing Portal rather than RAC administration."},
      {text: "For the Attorney account username, append Atty to your flclerks username: [flclerks username]Atty.", core: false, when: "Signing in to the Attorney E-Filing Portal account."},
      {text: "For the Attorney account password, use the separate password assigned to that Attorney account.", core: false, when: "Signing in to the Attorney E-Filing Portal account."},
      {text: "Verify the active account and role before changing a registration, account, filing, or ticket.", core: true},
      {text: "Sign out of the website when finished and do not save credentials in this tool.", core: true}
    ],
    record: [
      "Record the system reviewed and the job-relevant finding in Ivanti.",
      "Do not record passwords, temporary passwords, authentication codes, or access tokens.",
      "When testing with the Attorney account, distinguish the test result from the customer's actual account result."
    ],
    doneWhen: [
      "The correct system and account type were used.",
      "The required finding was documented in Ivanti without credentials.",
      "The session was signed out when the work was complete."
    ],
    related: ["Home quick links", "Current Ticket", "System Reference", "Registration workflow", "Account Access / Password workflow"],
    caution: "The Workbench stores no passwords. The username patterns shown here identify which account to use; enter the assigned password only on the official login page.",
    source: "Manager-provided account-use instructions, August 4, 2026"
  };

  D.procedureGuides = Array.isArray(D.procedureGuides) ? D.procedureGuides : [];
  const existing = D.procedureGuides.findIndex(item => item.id === procedure.id);
  if (existing >= 0) D.procedureGuides[existing] = procedure;
  else D.procedureGuides.unshift(procedure);

  const links = [
    {
      code: "IV",
      title: "Ivanti / HEAT",
      url: "https://www.myhelpsupport.com/HEAT",
      purpose: "Open and maintain the official support ticket.",
      account: "Use your approved Ivanti / HEAT credentials."
    },
    {
      code: "RAC",
      title: "RAC — System Admin",
      url: "https://www.myflcourtaccess.com/",
      purpose: "Review registrations, Portal accounts, and administrative records.",
      account: "Username: your flclerks username · Password: RAC-specific password, separate from your normal login."
    },
    {
      code: "AT",
      title: "Attorney E-Filing Portal",
      url: "https://www.myflcourtaccess.com/",
      purpose: "Use the filer-facing website account for attorney-side testing.",
      account: "Username: [flclerks username]Atty · Password: separate Attorney-account password."
    }
  ];

  function injectQuickLinks() {
    const home = document.querySelector("#page-home");
    if (!home || home.querySelector("#coreSystemQuickLinks")) return;
    const workflow = home.querySelector('[aria-labelledby="homeWorkflowTitle"]');
    const section = document.createElement("section");
    section.id = "coreSystemQuickLinks";
    section.className = "home-section core-system-links";
    section.setAttribute("aria-labelledby", "coreSystemLinksTitle");
    section.innerHTML = `
      <div class="home-section-head core-system-links-head">
        <div>
          <span class="eyebrow">Quick links</span>
          <h3 id="coreSystemLinksTitle">Open the core systems</h3>
          <p>RAC and the Attorney E-Filing Portal share the same website address but use different accounts. The Workbench never stores either password.</p>
        </div>
      </div>
      <div class="core-system-link-grid">
        ${links.map(link => `
          <a class="core-system-link-card" href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${link.title} in a new tab">
            <span class="core-system-link-icon" aria-hidden="true">${link.code}</span>
            <span class="core-system-link-copy">
              <strong>${link.title}</strong>
              <small>${link.purpose}</small>
              <span>${link.account}</span>
            </span>
            <span class="core-system-link-open" aria-hidden="true">Open ↗</span>
          </a>
        `).join("")}
      </div>
      <p class="core-system-security-note"><strong>Credential rule:</strong> enter passwords only on the official login page. Do not place them in Current Ticket, Messages, troubleshooting notes, screenshots, or Job Procedures.</p>
    `;
    if (workflow) home.insertBefore(section, workflow);
    else home.append(section);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injectQuickLinks, {once: true});
  else injectQuickLinks();
})();
