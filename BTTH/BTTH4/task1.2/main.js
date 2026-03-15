const nameInput = document.getElementById("name");
const gradeInput = document.getElementById("grade");
const buttonPress = document.getElementById("button");
const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");
const allInputs = document.getElementsByClassName("input");
const searchBtn = document.getElementById("searchBtn");
const alertInfo = document.getElementById("alert");
const table = document.getElementById("table");
const select = document.getElementById("select");

let students = [];
let filteredStudents = [];
let sortOrder = null; // null, "asc", "desc"

alertInfo.style.display = "none";

// Thêm sinh viên
buttonPress.addEventListener("click", function () {
  const name = nameInput.value.trim();
  const grade = Number(gradeInput.value.trim());

  if (!name) {
    alert("Vui lòng nhập họ và tên");
    return;
  }

  if (isNaN(grade) || grade > 10 || grade < 0) {
    alert("Vui lòng nhập điểm hợp lệ (0-10)");
    return;
  }

  students.push({ name: name, grade: grade, rank: calRank(grade) });

  renderTable(students);
  updateTotal(students);

  nameInput.value = "";
  gradeInput.value = "";
  nameInput.focus();
});

// Hàm vẽ lại toàn bộ bảng
function renderTable(arr) {
  alertInfo.style.display = "none";
  tableBody.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    const newTr = document.createElement("tr");

    if (arr[i].grade < 5) {
      newTr.style.backgroundColor = "yellow";
    }

    newTr.innerHTML =
      "<td>" +
      (i + 1) +
      "</td>" +
      "<td>" +
      arr[i].name +
      "</td>" +
      "<td>" +
      arr[i].grade +
      "</td>" +
      "<td>" +
      arr[i].rank +
      "</td>" +
      "<td><button data-index='" +
      i +
      "'>Xóa</button></td>";

    tableBody.appendChild(newTr);
  }
}

function updateTotal(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i].grade;
  }

  const sum = arr.length;
  let avg = 0;

  if (sum > 0) {
    avg = total / sum;
  }

  document.getElementById("summary").textContent = "Tổng số sinh viên: " + sum;
  document.getElementById("average").textContent =
    "Điểm trung bình: " + avg.toFixed(2);
}

// Hàm xếp loại
function calRank(grade) {
  if (grade >= 8.5) {
    return "Giỏi";
  } else if (grade >= 7) {
    return "Khá";
  } else if (grade >= 5) {
    return "Trung bình";
  } else {
    return "Yếu";
  }
}

// Xóa sinh viên (Event Delegation)
tableBody.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const index = Number(event.target.dataset.index);
    students.splice(index, 1);
    renderTable(students);
    updateTotal(students);
  }
});

// Enter để thêm sinh viên
for (let i = 0; i < allInputs.length; i++) {
  allInputs[i].addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      buttonPress.click();
    }
  });
}

// Hàm lọc + sắp xếp + vẽ bảng
function applyFilters() {
  const keyword = search.value.toLowerCase();
  const rank = select.value;

  filteredStudents = students.filter(function (s) {
    const matchName = s.name.toLowerCase().includes(keyword);
    const matchRank = rank === "all" || s.rank === rank;
    return matchName && matchRank;
  });

  if (sortOrder === "asc") {
    filteredStudents.sort(function (a, b) {
      return a.grade - b.grade;
    });
  } else if (sortOrder === "desc") {
    filteredStudents.sort(function (a, b) {
      return b.grade - a.grade;
    });
  }

  renderTable(filteredStudents);
}

// Search theo input
search.addEventListener("input", applyFilters);

// Search bằng button
searchBtn.addEventListener("click", applyFilters);

// Lọc theo xếp loại
select.addEventListener("change", applyFilters);

// Sắp xếp theo cột Điểm
const gradeHeader = document.getElementById("gradeHeader");
gradeHeader.addEventListener("click", function () {
  if (sortOrder === "asc") {
    sortOrder = "desc";
    gradeHeader.textContent = "Điểm ▼";
  } else {
    sortOrder = "asc";
    gradeHeader.textContent = "Điểm ▲";
  }
  applyFilters();
});
