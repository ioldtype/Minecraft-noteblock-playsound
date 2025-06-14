calculateButton.addEventListener("click", function () {
  const basePlaysound = parseFloat(playsoundInput.value);
  const pitchbend = parseInt(pitchbendInput.value, 10);

  if (isNaN(basePlaysound) || isNaN(pitchbend)) {
    resultDisplay.textContent = "無効な入力です";
    return;
  }

  const newPlaysound = calculatePlaysound(basePlaysound, pitchbend);
  resultDisplay.textContent = `結果: ${newPlaysound.toFixed(9)}`;

  // 履歴アイテムとコピー用ボタンを作成
  const historyItem = document.createElement("li");
  historyItem.textContent = `基準: ${basePlaysound}, Pitchbend: ${pitchbend} → ${newPlaysound.toFixed(9)}`;

  // コピー用ボタン
  const copyBtn = document.createElement("button");
  copyBtn.textContent = "コピー";
  copyBtn.className = "copy-btn";
  copyBtn.style.marginLeft = "8px";
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(historyItem.textContent)
      .then(() => {
        copyBtn.textContent = "コピー済み";
        setTimeout(() => (copyBtn.textContent = "コピー"), 1500);
      })
      .catch(() => {
        alert("コピーに失敗しました");
      });
  });

  historyItem.appendChild(copyBtn);
  historyList.appendChild(historyItem);

  // 最大10件を維持
  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.children[0]);
  }
});
