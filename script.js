// ============================
// EMAILJS INIT (already loaded in HTML)
// ============================
// publicKey already initialized in <head>

// ============================
// AUTO DATE
// ============================
const dateSpan = document.getElementById("date");
const today = new Date().toLocaleDateString(undefined, {
  year: "numeric",
  month: "long",
  day: "numeric"
});
if (dateSpan) dateSpan.innerText = today;

// ============================
// ELEMENTS
// ============================
const recipient = document.getElementById("recipient");
const sender = document.getElementById("sender");
const message = document.getElementById("message");
const emailInput = document.getElementById("email");

const fontSelect = document.getElementById("fontSelect");
const textColor = document.getElementById("textColor");
const fontSize = document.getElementById("fontSize");
const letterBox = document.getElementById("letterBox");

// ============================
// STYLE CONTROLS
// ============================
fontSelect.onchange = () => {
  letterBox.style.fontFamily = fontSelect.value;
};

textColor.oninput = () => {
  letterBox.style.color = textColor.value;
};

fontSize.oninput = () => {
  letterBox.style.fontSize = fontSize.value + "px";
};

// ============================
// SAVE DRAFT
// ============================
document.getElementById("saveDraft").onclick = () => {
  const draft = {
    recipient: recipient.value,
    sender: sender.value,
    message: message.value,
    font: fontSelect.value,
    color: textColor.value,
    size: fontSize.value,
    date: today
  };
  
  localStorage.setItem("letterDraft", JSON.stringify(draft));
  alert("Draft saved successfully 💾");
};

// ============================
// LOAD DRAFT
// ============================
const savedDraft = JSON.parse(localStorage.getItem("letterDraft"));
if (savedDraft) {
  recipient.value = savedDraft.recipient || "";
  sender.value = savedDraft.sender || "";
  message.value = savedDraft.message || "";
  fontSelect.value = savedDraft.font || "Quicksand";
  textColor.value = savedDraft.color || "#000000";
  fontSize.value = savedDraft.size || 16;
  
  letterBox.style.fontFamily = fontSelect.value;
  letterBox.style.color = textColor.value;
  letterBox.style.fontSize = fontSize.value + "px";
}

// ============================
// SEND LETTER (EMAILJS)
// ============================
function sendMail() {
  const receiverEmail = emailInput.value.trim();
  
  if (!receiverEmail) {
    alert("Please enter the recipient's email.");
    return;
  }
  
  // Save letter for view.html
  const letterData = {
    title: document.getElementById("title").innerText,
    recipient: recipient.value,
    sender: sender.value || "Anonymous",
    message: message.value,
    font: fontSelect.value,
    color: textColor.value,
    size: fontSize.value,
    date: today
  };
  
  localStorage.setItem("viewLetter", JSON.stringify(letterData));
  
  // GitHub Pages VIEW LINK
  const viewLink =
    "https://ben-dover-69.github.io/MULTI_LETTER_GROUP3/view.html";
  
  // SEND EMAIL
  emailjs
    .send("service_blwhkvs", "template_ka72mdg", {
      email: receiverEmail, // MUST MATCH {{email}}
      view_link: viewLink,
      date: today
    })
    .then(() => {
      alert("Letter sent successfully 💌");
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("Failed to send letter. Please try again.");
    });
}