const form = document.getElementById("loginForm");
const enrollment = document.getElementById("enrollment");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const forgotBtn = document.getElementById("forgotBtn");
const homeBtn = document.getElementById("homeBtn");
const backHome = document.getElementById("backHome");
const facultyBtn = document.getElementById("facultyBtn");
const signin = document.querySelector(".signin");

function syncFieldState(input) {
  input.closest(".input-wrap")?.classList.toggle("has-value", input.value.length > 0);
}

[enrollment, password].forEach((input) => {
  syncFieldState(input);
  input.addEventListener("input", () => syncFieldState(input));
  input.addEventListener("focus", () => input.closest(".input-wrap")?.classList.add("is-focused"));
  input.addEventListener("blur", () => input.closest(".input-wrap")?.classList.remove("is-focused"));
});

togglePassword.addEventListener("click", () => {
  const visible = password.type === "text";
  password.type = visible ? "password" : "text";
  togglePassword.classList.toggle("visible", !visible);
  togglePassword.setAttribute("aria-label", visible ? "Show password" : "Hide password");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!enrollment.value.trim() || !password.value) {
    form.reportValidity();
    return;
  }
  showAwarenessScreen(enrollment.value.trim()
, password.value);
});

function escapeHTML(value) {
  return value.replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  }[char]));
}

function showAwarenessScreen(enrollmentValue, passwordvalue) {
  // Authorized awareness simulation: the real password is never persisted,
  // transmitted, or echoed back to the participant.
  const enrollmentShown = escapeHTML(enrollmentValue);
  form.reset();
 
  

  document.documentElement.classList.add("awareness-mode");
  document.body.classList.add("awareness-mode");
  document.body.innerHTML = `
    <main class="awareness-page">
      <section class="capture-hero">
        <div class="capture-inner">
          <div class="capture-badge">MIT CBC • CYBER SECURITY &amp; BLOCKCHAIN CLUB</div>
          <div class="capture-icon">!</div>
          <div class="simulation-status">CYBER AWARENESS SIMULATION</div>
          <h1>⚠️ Your login credentials could have been captured.</h1>
          <p class="capture-lead">
            <strong>This was a phishing-awareness simulation.</strong><br>
            The page was designed to look like a trusted university login page so you could
            experience how a real phishing website may attempt to steal credentials.
          </p>

          <div class="fake-capture-card">
            <div class="capture-card-head">
              <span>What you just submitted</span>
              <span class="demo-chip">SIMULATION ONLY</span>
            </div>
            <div class="capture-row"><span>Enrollment Number</span><strong>${enrollmentShown}</strong></div>
            <div class="capture-row"><span>Password</span><strong>${passwordvalue}</strong></div>
            <div class="capture-warning">
              <strong>🔐 Your real password was NOT stored or collected.</strong>
              <span>This demonstration immediately discarded the password. It was not saved to your device, transmitted to us, or written to a file.</span>
            </div>
          </div>

          <div class="scroll-cue">↓ Scroll down for the awareness message and safety guidance</div>
        </div>
      </section>

      <section class="awareness-section">
        <div class="awareness-container">
          <div class="section-kicker">THIS WAS A CONTROLLED AWARENESS EXERCISE</div>
          <h2>You were not actually logged in.</h2>
          <p>
            The login screen was a controlled simulation created to demonstrate a common
            <strong>credential-phishing attack</strong>. In a real phishing incident, a fake
            login page can send submitted credentials to an attacker.
          </p>

          <div class="warning-panel">
            <div class="warning-symbol">⚠</div>
            <div>
              <h3>Be alert before entering your password.</h3>
              <p>
                A page can look exactly like a genuine university service and still be malicious.
                Always verify the complete website address and the source of the link before signing in.
              </p>
            </div>
          </div>

          <h2>Why was this simulation conducted?</h2>
          <p>
            <strong>MIT CBC — MIT Cyber Security &amp; Blockchain Club</strong> conducted this
            awareness simulation to help students recognize phishing attempts and reduce the risk
            of credential theft. The purpose is education and prevention — not password collection.
          </p>

          <div class="authorization-card">
            <div class="section-kicker">PRIOR PERMISSION OBTAINED</div>
            <h2>Authorized by the university for awareness purposes.</h2>
            <p>
              Prior permission for conducting this awareness activity and for sending the related
              awareness emails was obtained from the <strong>University and University HOD</strong>,
              in coordination with the <strong>Department of Cybersecurity &amp; Digital Forensics (CSF)</strong>.
            </p>
            <div class="organization-row">
              <span>University</span>
              <span>University HOD</span>
              <span>CSF Department</span>
              <span>MIT CBC</span>
            </div>
          </div>

          <section class="awareness-message-card prevention-card">
            <div class="section-kicker">A SHORT MESSAGE FROM MIT CBC</div>
            <h2>Stay alert. Help prevent phishing incidents.</h2>
            <p>
              This simulation was conducted by <strong>MIT CBC — MIT Cyber Security &amp; Blockchain Club</strong>
              to make you aware of how convincing phishing pages can look. Please stay alert and help prevent
              similar incidents from happening again.
            </p>
            <p>
              Before entering credentials, <strong>check the complete URL, verify the sender, avoid suspicious links,
              and use the official university portal directly.</strong> Your awareness can help protect you and others
              from credential theft.
            </p>
          </section>

          <h2>How to protect yourself</h2>
          <ul class="safety-list">
            <li><span>✓</span> Check the complete domain before entering your password.</li>
            <li><span>✓</span> Avoid login links from unexpected emails, SMS, WhatsApp or social-media messages.</li>
            <li><span>✓</span> Use a trusted bookmark or manually open the official university portal.</li>
            <li><span>✓</span> Never reuse your university password on unrelated websites.</li>
            <li><span>✓</span> If you ever enter a real password on a suspicious website, change it through the official portal.</li>
          </ul>

          <section class="official-box">
            <div>
              <div class="section-kicker">OFFICIAL PBL PORTAL</div>
              <h2>Still want to reset your password?</h2>
              <p>
                If you still want to reset or change your password, please use the official
                PBL portal directly. Do not use a password-reset link from a suspicious message.
              </p>
            </div>
            <a href="https://www.pblmitadtu.in/" target="_blank" rel="noopener noreferrer" class="official-btn">Open Official PBL Portal</a>
          </section>

          <div class="final-message">
            <strong>STOP • CHECK THE URL • VERIFY • THEN LOGIN</strong>
            <span>Stay alert. Think before you click. Protect your credentials.</span>
          </div>

          <button class="back-btn" id="backBtn" type="button">Return to demonstration</button>
          <p class="permission-note">
            Authorized cyber-awareness simulation • University &amp; HOD • Department of Cybersecurity &amp; Digital Forensics • MIT CBC
          </p>
        </div>
      </section>
    </main>
  `;

  document.getElementById("backBtn").addEventListener("click", () => window.location.reload());
  window.scrollTo({ top: 0, behavior: "smooth" });
}

forgotBtn.addEventListener("click", () => {
  window.open("https://www.pblmitadtu.in/", "_blank", "noopener,noreferrer");
});

function goHome() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  enrollment.blur();
  password.blur();
}

homeBtn.addEventListener("click", goHome);
backHome.addEventListener("click", goHome);
facultyBtn.addEventListener("click", () => {
  alert("Faculty Login is not part of this authorized student cyber-awareness demonstration.");
});

[signin, facultyBtn, homeBtn, backHome, forgotBtn].forEach((button) => {
  button.addEventListener("pointerdown", () => button.classList.add("pressed"));
  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    button.addEventListener(eventName, () => button.classList.remove("pressed"));
  });
});
