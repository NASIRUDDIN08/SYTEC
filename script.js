/*
=========================================================
SYTEC EDITABLE DATA
=========================================================
BEGINNER NOTE:
Change the values in this section when you want to update
centre information or course information.

The website currently uses local JavaScript data only.
The AI chat interface below is a DEMO UI and does not call
an AI API. Never put a private API key in this file.
=========================================================
*/

/*
=========================================================
REGISTRATION FORM CONFIG
=========================================================
Paste the Google Apps Script "Web app" URL here after you
publish the script (see README.md, section "Google Sheet
Registration Setup"). Until you paste a real URL, the form
will still work but will only show a friendly message asking
the visitor to call the centre instead of saving to a sheet.
=========================================================
*/
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyEbVnwiM4FCMqjWCSQVz7eT-REGZZgP8P1f83abfaJucUmrIiRisq4dzJSAmml4TiA/exec"; // <-- paste your Apps Script Web App URL here

const SYTEC_DATA = {
  centre: {
    name: "Sahaganj Youth Technical Education Centre",
    shortName: "SYTEC",
    address: "Keota Tyre Bagan, Sahaganj, Hooghly, 712104",
    phones: ["8777495240", "7044518410"],
    email: "sahaganjytec2026@gmail.com",
    openingHours: "8:00 AM – 8:00 PM"
  },

  courses: [
    { name:"ADCA", description:"Advanced computer applications and practical digital skills.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." },
    { name:"PGDCA", description:"Postgraduate-level computer application learning pathway.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." },
    { name:"FA (Tally)", description:"Computerised accounting and Tally-focused learning.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." },
    { name:"DDTP", description:"Desktop publishing and computer-based creative skills.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." },
    { name:"DIPP", description:"Professional computer application learning pathway.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." },
    { name:"DIA+", description:"Digital application and computer skills learning pathway.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." },
    { name:"Java", description:"Programming fundamentals and Java development learning.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." },
    { name:"Python", description:"Python programming fundamentals and practical coding skills.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." },
    { name:"MySQL", description:"Database fundamentals and MySQL-based data skills.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." },
    { name:"HTML", description:"Web page structure and foundational web development skills.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." },
    { name:"C", description:"Programming fundamentals using the C language.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." },
    { name:"C++", description:"Object-oriented programming fundamentals using C++.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." },
    { name:"Visual Basic", description:"Visual application development fundamentals.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." },
    { name:"School Courses", description:"Computer learning options for school students.", duration:"Information will be updated soon.", eligibility:"Information will be updated soon.", syllabus:"Information will be updated soon.", practical:"Information will be updated soon.", certificate:"Information will be updated soon.", fees:"Information will be updated soon." }
  ],

  faqs: [
    { q:"Where is the centre located?", a:"Sahaganj Youth Technical Education Centre is located at Keota Tyre Bagan, Sahaganj, Hooghly, 712104." },
    { q:"What are the opening hours?", a:"The centre opening hours are 8:00 AM to 8:00 PM." },
    { q:"Which courses are currently available?", a:"The current course list is shown in the Courses section of this website, including ADCA, PGDCA, FA (Tally), DDTP, DIPP, DIA+, Java, Python, MySQL, HTML, C, C++, Visual Basic and School Courses." },
    { q:"Do you provide School Courses?", a:"Yes. School Courses are available. Please contact the centre for the latest details." },
    { q:"How can I know the current fees and course duration?", a:"Fees and course durations are not published yet in this website. Please contact the centre for the latest information." },
    { q:"How can I contact the centre?", a:"Call 8777495240 or 7044518410, or email sahaganjytec2026@gmail.com." }
  ]
};

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

function renderCourses(list = SYTEC_DATA.courses) {
  const grid = $("#courseGrid");
  const count = $("#courseCount");
  if (!grid) return;
  count.textContent = `${list.length} course${list.length === 1 ? "" : "s"} available`;
  grid.innerHTML = list.map((course, i) => `
    <article class="course-card reveal visible">
      <div>
        <span class="course-number">${String(i+1).padStart(2,"0")} / COURSE</span>
        <h3>${escapeHTML(course.name)}</h3>
        <p>${escapeHTML(course.description)}</p>
      </div>
      <button class="view-course" data-course="${encodeURIComponent(course.name)}">View Details ↗</button>
    </article>
  `).join("");
  $$(".view-course", grid).forEach(btn => btn.addEventListener("click", () => openCourse(decodeURIComponent(btn.dataset.course))));
}

function populateCourseSelect() {
  const select = $("#registerCourseSelect");
  if (!select) return;
  select.innerHTML = SYTEC_DATA.courses.map(c => `<option value="${escapeHTML(c.name)}">${escapeHTML(c.name)}</option>`).join("")
    + `<option value="Not sure / Ask me">Not sure yet / Ask me on call</option>`;
}

function openCourse(name) {
  const c = SYTEC_DATA.courses.find(x => x.name === name);
  if (!c) return;
  $("#modalCourseName").textContent = c.name;
  $("#modalCourseDescription").textContent = c.description;
  $("#modalDuration").textContent = c.duration;
  $("#modalEligibility").textContent = c.eligibility;
  $("#modalSyllabus").textContent = c.syllabus;
  $("#modalPractical").textContent = c.practical;
  $("#modalCertificate").textContent = c.certificate;
  $("#modalFees").textContent = c.fees;
  currentModalCourse = c.name;
  $("#courseModal").classList.add("open");
  $("#courseModal").setAttribute("aria-hidden","false");
}

function closeCourse() {
  $("#courseModal").classList.remove("open");
  $("#courseModal").setAttribute("aria-hidden","true");
}

let currentModalCourse = null;

function openRegister(courseName) {
  const select = $("#registerCourseSelect");
  if (select && courseName) select.value = courseName;
  $("#registerStatus").textContent = "";
  $("#registerStatus").className = "form-status";
  $("#registerModal").classList.add("open");
  $("#registerModal").setAttribute("aria-hidden","false");
}

function closeRegister() {
  $("#registerModal").classList.remove("open");
  $("#registerModal").setAttribute("aria-hidden","true");
}

async function handleRegisterSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const status = $("#registerStatus");
  const btn = $("#registerSubmitBtn");
  const data = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    course: form.course.value,
    message: form.message.value.trim(),
    submittedAt: new Date().toISOString(),
    source: "SYTEC Website"
  };

  if (!GOOGLE_SCRIPT_URL) {
    status.textContent = "Thanks! Registration form is not fully connected yet — please call " + SYTEC_DATA.centre.phones[0] + " to confirm your seat.";
    status.className = "form-status error";
    return;
  }

  btn.disabled = true;
  btn.textContent = "Submitting...";
  status.textContent = "";
  status.className = "form-status";

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });
    status.textContent = "Thank you, " + data.name + "! Your registration is received. Our team will call you shortly on " + data.phone + " to confirm.";
    status.className = "form-status success";
    form.reset();
    populateCourseSelect();
  } catch (err) {
    status.textContent = "Something went wrong sending your details. Please call " + SYTEC_DATA.centre.phones[0] + " directly.";
    status.className = "form-status error";
  } finally {
    btn.disabled = false;
    btn.textContent = "Submit Registration ↗";
  }
}

function renderFaqs() {
  $("#faqList").innerHTML = SYTEC_DATA.faqs.map((f,i) => `
    <div class="faq-item">
      <button class="faq-q" aria-expanded="false"><span>${escapeHTML(f.q)}</span><span>+</span></button>
      <div class="faq-a">${escapeHTML(f.a)}</div>
    </div>
  `).join("");
  $$(".faq-q").forEach(q => q.addEventListener("click", () => {
    const item = q.parentElement;
    const open = item.classList.toggle("open");
    q.setAttribute("aria-expanded", open ? "true" : "false");
    q.lastElementChild.textContent = open ? "−" : "+";
  }));
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

const chatOverlay = $("#chatOverlay");
function openChat() { chatOverlay.classList.add("open"); chatOverlay.setAttribute("aria-hidden","false"); setTimeout(()=>$("#chatInput").focus(),100); }
function closeChat() { chatOverlay.classList.remove("open"); chatOverlay.setAttribute("aria-hidden","true"); }

function addMessage(text, type="bot") {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerHTML = escapeHTML(text).replace(/\n/g,"<br>");
  $("#chatMessages").appendChild(div);
  $("#chatMessages").scrollTop = $("#chatMessages").scrollHeight;
}

function localAssistantReply(input) {
  const q = input.toLowerCase();
  if (/(register|registration|sign up|apply|book a seat|reserve)/.test(q)) {
    setTimeout(() => openRegister(null), 400);
    return "Opening the registration form for you now. Fill in your name, phone number and course, and our team will call you to confirm.";
  }
  const matchedCourse = SYTEC_DATA.courses.find(c => q.includes(c.name.toLowerCase()));
  if (matchedCourse && /(join|register|enrol|enroll|apply|interested|want to do|take this)/.test(q)) {
    setTimeout(() => openRegister(matchedCourse.name), 400);
    return `Great choice! Opening the registration form pre-filled for ${matchedCourse.name}.`;
  }
  if (/(fee|fees|price|cost|duration|how long|month)/.test(q)) {
    return "Current fees and course durations have not been added to the website yet. Please contact SYTEC for the latest information, or type \"register\" and our team will confirm this when they call you.";
  }
  if (/(phone|call|contact number|contact us|email|mail id|mail)/.test(q)) {
    return `You can call ${SYTEC_DATA.centre.phones[0]} or ${SYTEC_DATA.centre.phones[1]}, or email ${SYTEC_DATA.centre.email}.`;
  }
  if (/(where|location|address|map|situated)/.test(q)) {
    return `The centre is at ${SYTEC_DATA.centre.address}. Use the Contact section's Maps button for navigation.`;
  }
  if (/(time|timing|open|hours|closed)/.test(q)) {
    return `Opening hours are ${SYTEC_DATA.centre.openingHours}. Please contact the centre for current batch timings.`;
  }
  if (/(admission|admit|how (do|can) i join|eligib)/.test(q)) {
    return "For current admission details, available batches and required documents, please contact the centre directly, or type \"register\" to fill the online form.";
  }
  if (q.includes("python")) return "Python is currently listed as an available course. Open Courses → Python → View Details for the information currently published.";
  if (q.includes("school")) return "Yes. School Courses are available. Please contact the centre for current syllabus, duration and fee details.";
  if (/(course|courses|what do you teach|^learn$|subjects)/.test(q)) {
    return `SYTEC currently lists ${SYTEC_DATA.courses.map(c=>c.name).join(", ")}. Course durations and fees are marked for update where information has not yet been supplied. Say "register" any time to apply.`;
  }
  return "I can help you explore SYTEC's courses, admission information, contact details, location and opening hours. For information not published on this website, please contact the centre.";
}

function quickAction(action) {
  const replies = {
    courses:"Our current courses include ADCA, PGDCA, FA (Tally), DDTP, DIPP, DIA+, Java, Python, MySQL, HTML, C, C++, Visual Basic and School Courses.",
    admission:"For current admission details, batches, fees and required documents, please contact the centre directly.",
    details:"Open the Courses section and select View Details on any course. Missing information is clearly marked as 'Information will be updated soon.'",
    contact:`Phone: ${SYTEC_DATA.centre.phones.join(" / ")}\nEmail: ${SYTEC_DATA.centre.email}`,
    location:`Address: ${SYTEC_DATA.centre.address}`,
    hours:`Opening hours: ${SYTEC_DATA.centre.openingHours}`,
    register:"Opening the registration form for you now."
  };
  addMessage(replies[action] || "Please ask me about SYTEC.", "bot");
  if (action === "register") setTimeout(() => { closeChat(); openRegister(null); }, 400);
}

$("#courseSearch").addEventListener("input", e => {
  const term = e.target.value.trim().toLowerCase();
  renderCourses(SYTEC_DATA.courses.filter(c => c.name.toLowerCase().includes(term) || c.description.toLowerCase().includes(term)));
});
$("#modalClose").addEventListener("click", closeCourse);
$("#courseModal").addEventListener("click", e => { if (e.target === $("#courseModal")) closeCourse(); });
$("#modalRegister").addEventListener("click", () => { closeCourse(); openRegister(currentModalCourse); });
$("#heroRegister").addEventListener("click", () => openRegister(null));
$("#admissionRegister").addEventListener("click", () => openRegister(null));
$("#registerClose").addEventListener("click", closeRegister);
$("#registerModal").addEventListener("click", e => { if (e.target === $("#registerModal")) closeRegister(); });
$("#registerForm").addEventListener("submit", handleRegisterSubmit);
$("#aiFab").addEventListener("click", openChat);
$("#heroAi").addEventListener("click", openChat);
$("#navAi").addEventListener("click", openChat);
$("#chatClose").addEventListener("click", closeChat);
$("#chatOverlay").addEventListener("click", e => { if (e.target === chatOverlay) closeChat(); });
$("#quickActions").addEventListener("click", e => { if (e.target.dataset.action) quickAction(e.target.dataset.action); });
$("#chatForm").addEventListener("submit", e => {
  e.preventDefault();
  const input = $("#chatInput").value.trim();
  if (!input) return;
  addMessage(input,"user");
  $("#chatInput").value = "";
  setTimeout(() => addMessage(localAssistantReply(input),"bot"), 250);
});

$("#menuToggle").addEventListener("click", () => {
  const nav = $("#nav");
  const open = nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", open ? "true" : "false");
});
$$(".nav a").forEach(a => a.addEventListener("click", () => $("#nav").classList.remove("open")));

window.addEventListener("scroll", () => {
  $("#siteHeader").classList.toggle("scrolled", window.scrollY > 20);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  $("#scrollProgress").style.width = `${max ? (window.scrollY/max)*100 : 0}%`;
});

const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); }), {threshold:.12});
$$(".reveal").forEach(el => observer.observe(el));

$("#year").textContent = new Date().getFullYear();
renderCourses();
renderFaqs();
populateCourseSelect();
