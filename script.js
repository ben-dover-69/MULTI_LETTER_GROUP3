// Elements
const body = document.body;
const title = document.getElementById("title");
const format = document.getElementById("format");
const letterBox = document.getElementById("letterBox");

const fontSelect = document.getElementById("fontSelect");
const textColor = document.getElementById("textColor");
const fontSize = document.getElementById("fontSize");

const recipient = document.getElementById("recipient");
const sender = document.getElementById("sender");
const message = document.getElementById("message");
const email = document.getElementById("email");

const bgMusic = document.getElementById("bgMusic");
const playPauseBtn = document.getElementById("playPauseBtn");
let playing = false;

// Letter themes with music
const themes = {
  love: ["Love Letter","Pacifico","#800020","music/kuped.mp3"],
  formal: ["Formal Letter","Playfair Display","#1f3b4d","music/peynknwite.mp3"],
  informal: ["Informal Letter","Comic Neue","#fff0d6","music/arizonab.mp3"],
  birthday: ["Birthday Letter","Pacifico","#ff8acb","music/bdaysmegs.mp3"],
  invitation: ["Invitation Letter","Quicksand","#6a5acd","music/when.mp3"]
};

// Set today's date
const today = new Date().toLocaleDateString(undefined, { year:"numeric", month:"long", day:"numeric" });
document.getElementById("date").innerText = today;

// ======= SWITCH LETTER =======
format.onchange = () => {
  const [t,f,bg,musicSrc] = themes[format.value];
  title.innerText = t;
  letterBox.style.fontFamily = f;
  body.className = format.value;
  bgMusic.src = musicSrc;
  if(playing){ bgMusic.play(); }
};

// ======= STYLE CONTROLS =======
fontSelect.onchange = () => letterBox.style.fontFamily = fontSelect.value;
textColor.oninput = () => letterBox.style.color = textColor.value;
fontSize.oninput = () => letterBox.style.fontSize = fontSize.value+"px";

// ======= MUSIC PLAY/PAUSE =======
playPauseBtn.onclick = () => {
  if(!playing){
    bgMusic.play();
    playPauseBtn.className="pause";
  } else {
    bgMusic.pause();
    playPauseBtn.className="play";
  }
  playing=!playing;
};

// ======= SAVE DRAFT =======
document.getElementById("saveDraft").onclick = () => {
  localStorage.setItem("draft", JSON.stringify({
    r:recipient.value,
    s:sender.value,
    m:message.value,
    f:fontSelect.value,
    c:textColor.value,
    z:fontSize.value,
    type: format.value
  }));
  alert("Draft saved");
};

// Load draft
const saved = JSON.parse(localStorage.getItem("draft"));
if(saved){
  recipient.value = saved.r;
  sender.value = saved.s;
  message.value = saved.m;
  fontSelect.value = saved.f;
  textColor.value = saved.c;
  fontSize.value = saved.z;
  format.value = saved.type;
  const [t,f,bg,musicSrc] = themes[format.value];
  title.innerText = t;
  letterBox.style.fontFamily = f;
  letterBox.style.color = saved.c;
  letterBox.style.fontSize = saved.z+"px";
  body.className = format.value;
  bgMusic.src = musicSrc;
}

// ======= SEND EMAIL VIA EMAILJS =======
document.getElementById("sendBtn").onclick = () => {
  if(!email.value){ alert("Enter recipient email"); return; }

  const letterData = {
    title:title.innerText,
    recipient:recipient.value,
    sender:sender.value || "Anonymous",
    message:message.value,
    font:letterBox.style.fontFamily,
    color:letterBox.style.color,
    size:letterBox.style.fontSize,
    date:today,
    type: format.value
  };

  const encoded = btoa(JSON.stringify(letterData));
  const viewLink = `https://ben-dover-69.github.io/MULTI_LETTER_GROUP3/view.html?data=${encoded}`;

  emailjs.send("service_blwhkvs","template_ka72mdg",{
    email: email.value,
    view_link: viewLink
  }).then(()=>alert("Letter sent 💌"))
    .catch(err=>{ console.error(err); alert("Failed to send"); });
};