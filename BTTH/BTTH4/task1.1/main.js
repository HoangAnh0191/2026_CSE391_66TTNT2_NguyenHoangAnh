const nameInput = document.getElementById("name");
const gradeInput = document.getElementById("grade");
const buttonPress = document.getElementById("button");
const tableBody = document.getElementById("tableBody");

buttonPress.addEventListener("click", function () {
  const name = nameInput.value.trim();
  const grade = Number(gradeInput.value.trim());

  // Kiểm tra hợp lệ
  if (!name || isNaN(grade) || grade > 10 || grade < 0) {
    if (!name) {
      alert("Vui lòng nhập họ và tên");
    }

    if (isNaN(grade) || grade > 10 || grade < 0) {
      alert("Vui lòng nhập điểm hợp lệ (0-10)");
    }
    return;
  }

  // Tạo hàng mới trong bảng
  const newTr = document.createElement("tr");

  const newSTT = document.createElement("td");
  newSTT.textContent = "";

  const newName = document.createElement("td");
  newName.textContent = name;

  const newGrade = document.createElement("td");
  newGrade.textContent = grade;

  const rank = document.createElement("td");
  rank.textContent = calRank(grade);

  const action = document.createElement("td");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Xóa";

  action.appendChild(deleteBtn);

  newTr.appendChild(newSTT);
  newTr.appendChild(newName);
  newTr.appendChild(newGrade);
  newTr.appendChild(rank);
  newTr.appendChild(action);

  tableBody.appendChild(newTr);

  updateCount();

  nameInput.value = "";
  gradeInput.value = "";

  nameInput.focus();

  deleteBtn.addEventListener("click", function () {
    this.closest("tr").remove();
    updateCount();
  });

  function calRank(grade) {
    if (grade >= 8.5) {
      return "Giỏi";
    } else if (grade >= 7) {
      return "Khá";
    } else if (grade >= 5) {
      return "Trung bình";
    } else {
      newTr.style.backgroundColor = "yellow";
      return "Yếu";
    }
  }
});

function updateCount() {
  const allRows = tableBody.querySelectorAll("tr");
  let total = 0;
  let avg = 0;
  let sum = allRows.length;
  if (sum > 0) {
    for (let i = 0; i < sum; i++) {
      allRows[i].cells[0].textContent = i + 1;
      total += Number(allRows[i].cells[2].textContent);
    }
    avg = total / sum;
  }
  const summary = document.getElementById("summary");
  summary.innerHTML = `Tổng số sinh viên: ${sum}`;

  const average = document.getElementById("average");
  average.innerHTML = `Điểm trung bình: ${avg.toFixed(2)}`;
}

const allInputs = document.querySelectorAll("input");

for (let i = 0; i < allInputs.length; i++) {
  allInputs[i].addEventListener("keydown", function (enter) {
    if (enter.key === "Enter") {
      enter.preventDefault();
      buttonPress.click();
    }
  });
}
