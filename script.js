// ===== Elements =====
const message = document.getElementById("message");
const fontSelect = document.getElementById("fontSelect");
const textColor = document.getElementById("textColor");
const fontSize = document.getElementById("fontSize");
const letterBox = document.getElementById("letterBox");
const recipient = document.getElementById("recipient");
const sender = document.getElementById("sender");
const emailInput = document.getElementById("email");
const formatSelect = document.getElementById("format");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const title = document.getElementById("title");

// Buttons
const saveDraftBtn = document.getElementById("saveDraft");
const sendBtn = document.getElementById("sendLetterBtn");

// ===== Auto Date =====
document.getElementById("date").innerText = new Date().toLocaleDateString(undefined, { year:"numeric", month:"long", day:"numeric" });

// ===== Background Music =====
const musicFiles = {
  "Love Letter":"kuped.mp3",
  "Formal Letter":"peynknwite.mp3",
  "Informal Letter":"arizonab.mp3",
  "Birthday Letter":"bdaysmegs.mp3",
  "Invitation Letter":"when.mp3"
};

window.addEventListener('load', ()=>{
  const type = formatSelect.value;
  bgMusic.src = musicFiles[type] || musicFiles["Love Letter"];
  bgMusic.play().catch(()=>{});
});

// Music Control
musicBtn.addEventListener("click", ()=>{
  if(bgMusic.paused){ bgMusic.play(); musicBtn.innerText="Pause Music"; } 
  else { bgMusic.pause(); musicBtn.innerText="Play Music"; }
});

// ===== Letter Styles =====
const letterStyles = {
  "Love Letter": { bg:"#8B0000", titleFont:"Pacifico" },
  "Formal Letter": { bg:"#2F4F4F", titleFont:"Playfair Display" },
  "Informal Letter": { bg:"#FFD700", titleFont:"Comic Neue" },
  "Birthday Letter": { bg:"#FF1493", titleFont:"Lobster" },
  "Invitation Letter": { bg:"#663399", titleFont:"Quicksand" }
};

// ===== Apply Styles =====
fontSelect.onchange = ()=> letterBox.style.fontFamily = fontSelect.value;
textColor.oninput = ()=> letterBox.style.color = textColor.value;
fontSize.oninput = ()=> letterBox.style.fontSize = fontSize.value+"px";

formatSelect.onchange = ()=>{
  const type=formatSelect.value;
  title.innerText=type;
  if(musicFiles[type]){ bgMusic.src=musicFiles[type]; bgMusic.play().catch(()=>{}); }
  if(letterStyles[type]){ document.body.style.background=letterStyles[type].bg; title.style.fontFamily=letterStyles[type].titleFont; }
};

// ===== Dark Mode =====
document.getElementById("darkBtn").onclick = ()=> document.body.classList.toggle("dark");

// ===== Reset =====
document.getElementById("resetBtn").onclick = ()=> { localStorage.clear(); location.reload(); };

// ===== Save Draft =====
saveDraftBtn.addEventListener("click", ()=>{
  localStorage.setItem("draft", JSON.stringify({
    r: recipient.value,
    m: message.value,
    s: sender.value,
    f: fontSelect.value,
    c: textColor.value,
    sz: fontSize.value,
    type: formatSelect.value
  }));
  alert("Draft saved!");
});

// Load Draft
const saved = JSON.parse(localStorage.getItem("draft"));
if(saved){
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
  if(letterStyles[saved.type]) document.body.style.background=letterStyles[saved.type].bg;
}

// ===== Send Letter via EmailJS with only "View Letter" link =====
sendBtn.addEventListener("click", ()=>{
  const toEmail=emailInput.value;
  if(!toEmail){ alert("Enter recipient email!"); return; }

  const letterData = {
    recipient_name: recipient.value,
    sender_name: sender.value || "Anonymous",
    message_body: message.value,
    letter_type: formatSelect.value,
    font: fontSelect.value,
    color: textColor.value,
    size: fontSize.value
  };

  const encoded = btoa(JSON.stringify(letterData));
  const viewLink = `https://ben-dover-69.github.io/MULTI_LETTER_GROUP3/view.html?letter=${encoded}`;

  const emailHTML = `
    <p style="text-align:center;">
      <a href="${viewLink}" target="_blank">View Your Letter</a>
    </p>
  `;

  emailjs.send("service_blwhkvs","template_ka72mdg",{
    to_email: toEmail,
    preview_text: "You received a letter! Click 'View Your Letter' to open it.",
    html_content: emailHTML
  })
  .then(()=>{ alert("Letter sent successfully!"); })
  .catch((err)=>{ console.error(err); alert("Failed to send letter."); });
});