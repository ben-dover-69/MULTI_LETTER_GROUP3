// DATE
const today = new Date().toLocaleDateString(undefined, {
  year:"numeric", month:"long", day:"numeric"
});
document.getElementById("date").innerText = today;

// ELEMENTS
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

// MUSIC
const bgMusic = document.getElementById("bgMusic");
const playPauseBtn = document.getElementById("playPauseBtn");
let playing = false;

// LETTER THEMES + MUSIC
const themes = {
  love: ["Love Letter","Pacifico","music/kuped.mp3"],
  formal: ["Formal Letter","Playfair Display","music/peynknwite.mp3"],
  informal: ["Informal Letter","Comic Neue","music/arizonab.mp3"],
  birthday: ["Birthday Letter","Pacifico","music/bdaysmegs.mp3"],
  invitation: ["Invitation Letter","Playfair Display","music/when.mp3"]
};

format.onchange = () => {
  const [t,f,m] = themes[format.value];
  body.className = format.value;
  title.innerText = t;
  letterBox.style.fontFamily = f;
  bgMusic.src = m;
  if(playing){ bgMusic.play(); }
};

// STYLE CONTROLS
fontSelect.onchange = () => letterBox.style.fontFamily = fontSelect.value;
textColor.oninput = () => letterBox.style.color = textColor.value;
fontSize.oninput = () => letterBox.style.fontSize = fontSize.value+"px";

// PLAY / PAUSE
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

// SAVE DRAFT
document.getElementById("saveDraft").onclick = () => {
  localStorage.setItem("draft", JSON.stringify({
    r:recipient.value, s:sender.value, m:message.value,
    f:fontSelect.value, c:textColor.value, z:fontSize.value
  }));
  alert("Draft saved");
};

// SEND
function sendMail(){
  if(!email.value){ alert("Enter recipient email"); return; }

  localStorage.setItem("viewLetter", JSON.stringify({
    title:title.innerText,
    recipient:recipient.value,
    sender:sender.value||"Anonymous",
    message:message.value,
    font:letterBox.style.fontFamily,
    color:letterBox.style.color,
    size:letterBox.style.fontSize,
    date:today
  }));

  emailjs.send("service_blwhkvs","template_ka72mdg",{
    email: email.value,
    view_link:"https://ben-dover-69.github.io/MULTI_LETTER_GROUP3/view.html"
  }).then(()=>alert("Letter sent 💌"));
}