# SYTEC Website — Complete Beginner Guide

This guide is written for someone with **no coding experience**. Follow it top to bottom.

---

## What's in this project

- `index.html` — the website structure (all sections, the registration form, the chat popup)
- `style.css` — the premium dark-navy / gold design
- `script.js` — **all the content you'll ever need to edit** (courses, FAQs, phone numbers) + all the interactive behaviour
- `README.md` — this file

---

## 1. Editing content (courses, phone, email, FAQs)

Open `script.js` in any text editor (Notepad is fine). Near the top you'll see `SYTEC_DATA`.

- **Centre details** (name, address, phone, email, hours) → edit the `centre: { ... }` block.
- **Courses** → edit the `courses: [ ... ]` list. Each course is one `{ ... }` block. Copy one and paste it below to add a new course.
- **FAQs** → edit the `faqs: [ ... ]` list the same way.

Only enter real information — leave `"Information will be updated soon."` for anything not confirmed yet.

You never need to touch `index.html` or `style.css` just to change text/content — everything text-based is in `script.js`.

---

## 2. The new "Register for a Course" form

I added a **Register Now** button (in the hero section, the Admission section, inside every course's "View Details" popup, and inside the AI chat assistant). When a visitor fills it in (Name, Phone, Email, Course, Message), it can automatically save that entry into a **Google Sheet** you own — for free, with no coding.

### Step-by-step: connect it to a free Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank sheet. Name it e.g. **"SYTEC Registrations"**.
2. In row 1, add these column headers exactly: `Timestamp | Name | Phone | Email | Course | Message`
3. In the sheet, click **Extensions → Apps Script**. A code editor opens in a new tab.
4. Delete anything in the editor and paste this:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.phone || "",
    data.email || "",
    data.course || "",
    data.message || ""
  ]);
  return ContentService.createTextOutput(JSON.stringify({status:"ok"}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. Click **Deploy → New deployment**. Click the gear icon next to "Select type" and choose **Web app**.
6. Set **"Who has access"** to **"Anyone"** (this is required so your website can send data to it — it does NOT expose your sheet publicly, only this one specific submit action).
7. Click **Deploy**. Google will ask you to authorize — approve it (it's your own script).
8. Copy the **Web app URL** it gives you (starts with `https://script.google.com/macros/s/.../exec`).
9. Open `script.js` in the website files, find this line near the top:

   ```javascript
   const GOOGLE_SCRIPT_URL = ""; // <-- paste your Apps Script Web App URL here
   ```

   Paste your URL between the quotes, e.g. `const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";`
10. Save, re-upload the file to your host (or just re-publish). Test the form yourself — a new row should appear in your Google Sheet within a few seconds.

Every registration now lands in a sheet you fully own, for free, forever, with no monthly cost.

---

## 3. About the "verification call with press 1 / press 2" idea

I want to be upfront about this rather than fake it: **a fully automated phone call system (an IVR that dials the visitor and asks them to press 1/2/3) is not something that can be built for free.** It requires a paid calling/telephony service (e.g. Twilio, Exotel, Knowlarity) that charges per minute or per call — there is no genuinely free way to make outbound automated phone calls to real mobile numbers in India.

**What you can do instead, for free:**

- **Use the Google Sheet as your call list.** Every registration lands there instantly with name, phone and course — someone at the centre calls them personally and confirms (this is actually more trustworthy to parents/students than a robot call, and costs nothing extra).
- **Add a "click-to-WhatsApp" confirmation** — free and very popular in India. I can add a button that opens WhatsApp with a pre-filled message like *"Hi, I registered for PGDCA at SYTEC, please confirm my seat."* sent straight to the centre's number. Just say the word and I'll add it.
- If later you do get a small budget, Twilio/Exotel can add real automated confirmation calls — that's a "phase 2" upgrade, not something needed to launch.

---

## 4. About the AI chat assistant

The chat bubble on the site works **right now, for free, with no setup** — it's a smart rule-based assistant that already knows your courses, fees status, address, phone numbers, opening hours and can open the registration form when asked. It will correctly answer almost anything a visitor is likely to ask about the centre.

What it is **not**: a full open-ended AI (like ChatGPT/Claude) that can chat about absolutely anything. Connecting a real AI model requires an API that charges per message — not free — plus a small backend to hide the API key safely. If you want that later, it's a well-defined upgrade; the current assistant already covers the realistic use case (answering course/admission/contact questions) at zero cost.

---

## 5. Free hosting (going live)

**Cloudflare Pages** (recommended, free, no card needed):

1. Create a free account at [pages.cloudflare.com](https://pages.cloudflare.com).
2. Choose "Upload assets" (no GitHub needed) and drag in `index.html`, `style.css`, `script.js`.
3. Click Deploy. You'll get a free `.pages.dev` address instantly. You can later connect your own domain name (domain purchase is the only real cost in this whole project, and is optional).

Other free options: GitHub Pages, Netlify — the process is very similar (upload the same 3 files).

---

## 6. Connecting Google Search Console

Once your site is live at its address:

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Add your site as a "URL prefix" property (paste your live website address).
3. Verify ownership — the easiest method is the **HTML tag** option: it gives you one `<meta>` tag to paste inside `<head>` in `index.html`, right under the existing `<meta name="description"...>` line.
4. After verifying, submit your homepage URL under "URL Inspection → Request Indexing" so Google starts crawling it.

---

## 7. Before you publish — quick test checklist

- Mobile layout (resize your browser or open on your phone)
- Phone links, email link, Maps link
- Course search + "View Details" popups
- **New: Register form actually adds a row to your Google Sheet**
- FAQ open/close
- AI chat assistant (try asking about courses, fees, and "register")
- All navigation links and the mobile menu button

---

## 8. Possible future upgrades (not needed to launch)

- Real automated confirmation calls via Twilio/Exotel (paid, per-call)
- A true AI-powered chat backend (paid, per-message)
- WhatsApp click-to-chat confirmation button (free — ask me to add it)
- Admission enquiry tracking dashboard
- Real centre photos replacing the gallery placeholders

Never put private API keys or passwords directly inside `script.js` or `index.html` — they are visible to anyone who views the page source.
