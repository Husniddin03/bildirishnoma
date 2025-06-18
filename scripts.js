let qsnLines = [];
let ansLines = [];
const seenQuestions = new Set();  // Track already notified questions
let dataLoaded = false;           // Track if files loaded

// Normalize function: lowercase, remove punctuation, collapse spaces, remove repeated letters
function normalize(text) {
  return text.toLowerCase()
      .replace(/[^\w\s]/g, '')    // remove punctuation
      .replace(/\s+/g, ' ')       // collapse multiple spaces
      .replace(/(\w)\1+/g, '$1')  // reduce repeated letters
      .trim();
}

// Process the hardcoded question-answer data
function parseMatn() {


  const blocks = inputText
    .split("++++")
    .map((b) => b.trim())
    .filter((b) => b);

  blocks.forEach((block) => {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l);

    const savolIndex = lines.findIndex((l) => l === "====");
    if (savolIndex !== -1 && lines[savolIndex + 1]) {
      const savol = lines.slice(0, savolIndex).join(" ");
      const javob = lines[savolIndex + 1];
      qsnLines.push(normalize(savol));
      ansLines.push(javob);
    }
  });
  
  dataLoaded = true;
}

// Initialize by parsing the data when the script loads
parseMatn();

function sendNotification(title, message) {
  const options = {
    body: message,
    icon: 'kun.jpg'  // or full URL
  };
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, options);
      }
    });
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkQuestions() {
  if (!dataLoaded) {
    console.warn('Data not loaded yet, please wait.');
    return;
  }

  const inputText = document.getElementById('textInput').value;
  const delayInput = document.getElementById('delayInput').value.trim();
  const userDelay = parseInt(delayInput, 10);
  const delayTime = (Number.isInteger(userDelay) && userDelay > 0) ? userDelay : 5000;

  const pattern = /\d+\..*?(?=\d+\.\s*|$)/gs;
  const matches = inputText.match(pattern);
  if (!matches) return;

  for (const fragmentRaw of matches) {
    const fragment = normalize(fragmentRaw.trim());

    for (let i = 0; i < qsnLines.length; i++) {
      const q = qsnLines[i];
      if (q.length < 5 || !fragment.includes(q)) continue;

      const numMatch = fragmentRaw.match(/^(\d+)\./);
      const num = numMatch ? numMatch[1] : (i + 1).toString();

      if (seenQuestions.has(num)) break;

      const ans = ansLines[i] || 'no answer :(';
      sendNotification(`Kun.uz - O'zbekiston va dunyo yangiliklari`, `${num} - ${ans}`);
      seenQuestions.add(num);

      await delay(delayTime); // <-- Use dynamic delay
      break;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
    const oneIdLink = document.getElementById('oneIdLink');
    if (oneIdLink) {
        oneIdLink.addEventListener('dblclick', () => {
            window.location.href = 'scroll.html';
        });
    }
});