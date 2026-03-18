const btnNext = document.getElementsByClassName("btn-next");
const btnBack = document.getElementsByClassName("btn-back");
const btnSubmit = document.getElementsByClassName("btn-submit");
const toggleBtn = document.getElementById("toggle");
const personalInfor = document.getElementById("step1");
const accountInfor = document.getElementById("step2");
const confirmInfor = document.getElementById("step3");

const nameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const birthdayInput = document.getElementById("birthday");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");

toggleBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.textContent = "Ẩn";
  } else {
    passwordInput.type = "password";
    toggleBtn.textContent = "Hiện";
  }
});

let person = {
  fullname: "",
  birthday: "",
  gender: "",
  email: "",
};

btnNext[0].addEventListener("click", function () {
  if (validPersonalInfor()) {
    person.fullname = nameInput.value.trim();
    person.birthday = birthdayInput.value;
    let genderChecked = document.querySelector("input[name='gender']:checked");
    person.gender = genderChecked.value;

    personalInfor.style.display = "none";
    accountInfor.style.display = "block";
    updateProgressBar(2);
  }
});

btnBack[0].addEventListener("click", function () {
  personalInfor.style.display = "block";
  accountInfor.style.display = "none";
  updateProgressBar(1);
});

btnNext[1].addEventListener("click", function () {
  if (validAccountInfor()) {
    person.email = emailInput.value.trim();
    displayConfirmInfo();

    accountInfor.style.display = "none";
    confirmInfor.style.display = "block";
    updateProgressBar(3);
  }
});

btnBack[1].addEventListener("click", function () {
  accountInfor.style.display = "block";
  confirmInfor.style.display = "none";
  updateProgressBar(2);
});

btnSubmit[0].addEventListener("click", function () {
  alert("Đăng ký thành công! Chào mừng " + person.fullname);
  console.log(person);
});

function showError(id, errorMessage) {
  document.getElementById("err-" + id).textContent = errorMessage;
}

function clearError(id) {
  document.getElementById("err-" + id).textContent = "";
}

function validateFullname() {
  let name = nameInput.value.trim();
  if (name === "") {
    showError("fullname", "Vui lòng nhập họ và tên!");
    return false;
  } else if (/[0-9!@#$%^&*]/.test(name)) {
    showError("fullname", "Vui lòng nhập họ tên hợp lệ!");
    return false;
  } else if (name.length < 3) {
    showError("fullname", "Họ và tên phải có ít nhất 3 kí tự!");
    return false;
  } else {
    clearError("fullname");
    return true;
  }
}

function validateBirthday() {
  let birthday = birthdayInput.value;

  if (birthday === "") {
    showError("birthday", "Vui lòng chọn ngày sinh!");
    return false;
  }

  let birthDate = new Date(birthday);
  let today = new Date();

  if (birthDate >= today) {
    showError("birthday", "Ngày sinh phải trước ngày hôm nay!");
    return false;
  }

  clearError("birthday");
  return true;
}

function validateEmail() {
  let email = emailInput.value.trim();
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    showError("email", "Vui lòng nhập email!");
    return false;
  } else if (!emailRegex.test(email)) {
    showError("email", "Email không hợp lệ!");
    return false;
  } else {
    clearError("email");
    return true;
  }
}

function validateConfirm() {
  let confirm = confirmInput.value;
  let password = passwordInput.value;

  if (confirm === "") {
    showError("confirm", "Vui lòng xác nhận mật khẩu!");
    return false;
  } else if (confirm !== password) {
    showError("confirm", "Mật khẩu không trùng khớp!");
    return false;
  } else {
    clearError("confirm");
    return true;
  }
}

function validatePassword() {
  let password = passwordInput.value;

  if (password === "") {
    showError("password", "Vui lòng nhập mật khẩu!");
    return false;
  }

  if (password.length < 8) {
    showError("password", "Mật khẩu tối thiểu 8 ký tự!");
    return false;
  }

  if (!/[A-Z]/.test(password)) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ hoa (A-Z)!");
    return false;
  }

  if (!/[a-z]/.test(password)) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ thường (a-z)!");
    return false;
  }

  if (!/[0-9]/.test(password)) {
    showError("password", "Mật khẩu phải có ít nhất 1 số (0-9)!");
    return false;
  }

  if (!/[!@#$%^&*]/.test(password)) {
    showError(
      "password",
      "Mật khẩu phải có ít nhất 1 ký tự đặc biệt (!@#$%^&*)!",
    );
    return false;
  }

  clearError("password");
  return true;
}

function validateGender() {
  const checked = document.querySelector("input[name='gender']:checked");
  if (!checked) {
    showError("gender", "Vui lòng chọn giới tính!");
    return false;
  }
  clearError("gender");
  return true;
}

function validPersonalInfor() {
  const isValid = validateFullname() & validateBirthday() & validateGender();
  return isValid;
}

function validAccountInfor() {
  const isValid = validateEmail() & validatePassword() & validateConfirm();
  return isValid;
}

function updateProgressBar(step) {
  let progressBar = document.querySelector(".progress-bar");
  let stepText = document.getElementById("step-text");
  let widths = ["33%", "66%", "100%"];
  progressBar.style.width = widths[step - 1];
  stepText.textContent = "Bước " + step + "/3";
}

function displayConfirmInfo() {
  document.getElementById("confirm-fullname").textContent = person.fullname;
  document.getElementById("confirm-birthday").textContent = person.birthday;
  document.getElementById("confirm-gender").textContent = person.gender;
  document.getElementById("confirm-email").textContent = person.email;
}
