// =====================
// ELEMENT REFERENCES
// =====================
const message = document.getElementById("message");
const fontSelect = document.getElementById("fontSelect");
const textColor = document.getElementById("textColor");
const fontSize = document.getElementById("fontSize");
const letterBox = document.getElementById("letterBox");
const recipient = document.getElementById("recipient");
const sender = document.getElementById("sender");
const emailInput = document.getElementById("email");
const formatSelect = document.getElementById("format");
const title = document.getElementById("title");
const bgMusic = document.getElementById("bgMusic");

const saveDraftBtn = document.getElementById("saveDraft");
const sendBtn = document.getElementById("sendLetterBtn");

// =====================
// AUTO DATE
// =====================
document.getElementById("date").innerText =
  new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

// =====================
// BACKGROUND MUSIC
// =====================
const musicFiles = {
  "Love Letter": "kuped.mp3",
  "Formal Letter": "peynknwite.mp3",
  "Informal Letter": "arizonab.mp3",
  "Birthday Letter": "bdaysmegs.mp3",
  "Invitation Letter": "when.mp3"
};

window.addEventListener("load", () => {
  const type = formatSelect.value;
  bgMusic.src = musicFiles[type] || musicFiles["Love Letter"];
  bgMusic.play().catch(() => {});
});

// =====================
// LETTER STYLES
// =====================
const letterStyles = {
  "Love Letter": { bg: "#8B0000", titleFont: "Pacifico" },
  "Formal Letter": { bg: "#2F4F4F", titleFont: "Playfair Display" },
  "Informal Letter": { bg: "#FFD700", titleFont: "Comic Neue" },
  "Birthday Letter": { bg: "#FF1493", titleFont: "Lobster" },
  "Invitation Letter": { bg: "#663399", titleFont: "Quicksand" }
};

// =====================
// STYLE CONTROLS
// =====================
fontSelect.onchange = () => {
  letterBox.style.fontFamily = fontSelect.value;
};

textColor.oninput = () => {
  letterBox.style.color = textColor.value;
};

fontSize.oninput = () => {
  letterBox.style.fontSize = fontSize.value + "px";
};

formatSelect.onchange = () => {
  const type = formatSelect.value;
  title.innerText = type;
  
  if (musicFiles[type]) {
    bgMusic.src = musicFiles[type];
    bgMusic.play().catch(() => {});
  }
  
  if (letterStyles[type]) {
    document.body.style.background = letterStyles[type].bg;
    title.style.fontFamily = letterStyles[type].titleFont;
  }
};

// =====================
// DARK MODE
// =====================
document.getElementById("darkBtn").onclick = () => {
  document.body.classList.toggle("dark");
};

// =====================
// RESET
// =====================
document.getElementById("resetBtn").onclick = () => {
  localStorage.clear();
  location.reload();
};

// =====================
// SAVE DRAFT
// =====================
saveDraftBtn.addEventListener("click", () => {
  localStorage.setItem("draft", JSON.stringify({
    r: recipient.value,
    m: message.value,
    s: sender.value,
    f: fontSelect.value,
    c: textColor.value,
    sz: fontSize.value,
    type: formatSelect.value,
    date: new Date().toLocaleDateString()
  }));
  alert("Draft saved!");
});

// =====================
// LOAD DRAFT
// =====================
const saved = JSON.parse(localStorage.getItem("draft"));
if (saved) {
  recipient.value = saved.r;
  message.value = saved.m;
  sender.value = saved.s;
  fontSelect.value = saved.f;
  textColor.value = saved.c;
  fontSize.value = saved.sz;
  formatSelect.value = saved.type;
  
  letterBox.style.fontFamily = saved.f;
  letterBox.style.color = saved.c;
  letterBox.style.fontSize = saved.sz + "px";
  title.innerText = saved.type;
  
  if (letterStyles[saved.type]) {
    document.body.style.background = letterStyles[saved.type].bg;
  }
}

// =====================
// SEND LETTER (EMAILJS)
// =====================
sendBtn.addEventListener("click", () => {
  const toEmail = emailInput.value.trim();
  
  if (!toEmail) {
    alert("Please enter the recipient's email.");
    return;
  }
  
  // Build letter payload
  const letterData = {
    recipient_name: recipient.value || "Friend",
    sender_name: sender.value || "Anonymous",
    message_body: message.value,
    letter_type: formatSelect.value,
    font: fontSelect.value,
    color: textColor.value,
    size: fontSize.value,
    date: new Date().toLocaleDateString()
  };
  
  // Encode letter for URL
  const encoded = btoa(JSON.stringify(letterData));
  
  // ✅ FIXED GITHUB PAGES LINK
  const viewLink =
    `https://ben-dover-69.github.io/MULTI_LETTER_GROUP3/view.html?letter=${encoded}`;
  
  // ✅ CORRECT VARIABLE MAPPING (IMPORTANT)
  emailjs.send(
      "service_blwhkvs",
      "template_ka72mdg",
      {
        to_email: toEmail,
        view_link: viewLink // 🔥 THIS FIXES THE ISSUE
      }
    )
    .then(() => {
      alert("Letter sent successfully!");
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Failed to send letter. Please try again.");
    });
});