// 履歴をローカルストレージから取得
let history = JSON.parse(localStorage.getItem("playsound_history")) || [];

function calculate() {
  let base = parseFloat(document.getElementById("base").value);
  let pitch = parseFloat(document.getElementById("pitch").value);

  if (isNaN(base) || isNaN(pitch)) {
    document.getElementById("result").innerText = "⚠️ 数値を入力してください";
    return;
  }

  // pitch_bend = 683 → 0.529731547 を満たす式
  let result = base * Math.pow(2, pitch / 288);
  let resultFormatted = result.toFixed(9);
  let command = `/playsound minecraft:block.note_block.harp record @p ~ ~ ~ ${resultFormatted}`;

  document.getElementById("result").innerText = command;

  let entry = `基準値: ${base}, Pitch Bend: ${pitch} → ${resultFormatted}`;
  history.unshift(entry);
  if (history.length > 10) {
    history.pop();
  }

  saveHistory();
  updateHistory();
}

function saveHistory() {
  localStorage.setItem("playsound_history", JSON.stringify(history));
}

function updateHistory() {
  let historyList = document.getElementById("history");
  historyList.innerHTML = "";
  history.forEach(entry => {
    let li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function clearHistory() {
  history = [];
  localStorage.removeItem("playsound_history");
  updateHistory();
}

function copyResult() {
  const text = document.getElementById("result").innerText;
  navigator.clipboard.writeText(text).then(() => {
    document.getElementById("copyBtn").innerText = "✅ コピーしました";
    setTimeout(() => {
      document.getElementById("copyBtn").innerText = "コピー";
    }, 1500);
  });
}

window.onload = updateHistory;
