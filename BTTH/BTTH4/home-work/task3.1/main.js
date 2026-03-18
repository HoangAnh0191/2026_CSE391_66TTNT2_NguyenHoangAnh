function showError(id, message) {
  document.getElementById("err-" + id).textContent = message;
  const input = document.getElementById(id);
  if (input) input.classList.add("error-input");
}

function clearError(id) {
  document.getElementById("err-" + id).textContent = "";
  const input = document.getElementById(id);
  if (input) input.classList.remove("error-input");
}

function validateFullname() {
  const value = document.getElementById("fullname").value.trim();
  if (value === "") {
    showError("fullname", "Họ và tên không được để trống");
    return false;
  }
  if (value.length < 3) {
    showError("fullname", "Họ và tên phải có ít nhất 3 ký tự");
    return false;
  }
  if (/[0-9!@#$%^&*]/.test(value)) {
    showError("fullname", "Họ và tên chỉ được chứa chữ cái và khoảng trắng");
    return false;
  }
  clearError("fullname");
  return true;
}

function validateEmail() {
  const value = document.getElementById("email").value.trim();
  if (value === "") {
    showError("email", "Email không được để trống");
    return false;
  }
  if (!value.includes("@") || !value.includes(".")) {
    showError("email", "Email không đúng định dạng (vd: name@domain.com)");
    return false;
  }
  clearError("email");
  return true;
}

function validatePhone() {
  const value = document.getElementById("phone").value.trim();
  if (value === "") {
    showError("phone", "Số điện thoại không được để trống");
    return false;
  }
  if (value.length !== 10 || value[0] !== "0") {
    showError("phone", "Số điện thoại phải có 10 chữ số và bắt đầu bằng 0");
    return false;
  }
  clearError("phone");
  return true;
}

function validatePassword() {
  const value = document.getElementById("password").value;
  if (value === "") {
    showError("password", "Mật khẩu không được để trống");
    return false;
  }
  if (value.length < 8) {
    showError("password", "Mật khẩu phải có ít nhất 8 ký tự");
    return false;
  }
  if (!/[A-Z]/.test(value)) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ hoa");
    return false;
  }
  if (!/[a-z]/.test(value)) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ thường");
    return false;
  }
  if (!/[0-9]/.test(value)) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ số");
    return false;
  }
  clearError("password");
  return true;
}

function validateConfirm() {
  const value = document.getElementById("confirm").value;
  const password = document.getElementById("password").value;
  if (value === "") {
    showError("confirm", "Vui lòng xác nhận mật khẩu");
    return false;
  }
  if (value !== password) {
    showError("confirm", "Mật khẩu xác nhận không khớp");
    return false;
  }
  clearError("confirm");
  return true;
}

function validateGender() {
  const checked = document.querySelector("input[name='gender']:checked");
  if (!checked) {
    document.getElementById("err-gender").textContent =
      "Vui lòng chọn giới tính";
    return false;
  }
  document.getElementById("err-gender").textContent = "";
  return true;
}

function validateTerms() {
  const checked = document.getElementById("terms").checked;
  if (!checked) {
    document.getElementById("err-terms").textContent =
      "Bạn phải đồng ý với điều khoản";
    return false;
  }
  document.getElementById("err-terms").textContent = "";
  return true;
}

function updateCharCount() {
  const count = document.getElementById("fullname").value.length;
  document.getElementById("charCount").textContent = count;
}

function updatePasswordStrength() {
  const password = document.getElementById("password").value;
  const text = document.getElementById("strengthText");

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;

  if (score <= 2) {
    text.textContent = "Yếu";
    text.style.color = "#e74c3c";
  } else if (score <= 4) {
    text.textContent = "Trung bình";
    text.style.color = "#f39c12";
  } else {
    text.textContent = "Mạnh";
    text.style.color = "#27ae60";
  }
}

function togglePassword() {
  const input = document.getElementById("password");
  const btn = document.getElementById("toggleBtn");
  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "Ẩn";
  } else {
    input.type = "password";
    btn.textContent = "Hiện";
  }
}

document.getElementById("fullname").addEventListener("blur", validateFullname);
document.getElementById("fullname").addEventListener("input", updateCharCount);
document
  .getElementById("fullname")
  .addEventListener("input", () => clearError("fullname"));

document.getElementById("email").addEventListener("blur", validateEmail);
document
  .getElementById("email")
  .addEventListener("input", () => clearError("email"));

document.getElementById("phone").addEventListener("blur", validatePhone);
document
  .getElementById("phone")
  .addEventListener("input", () => clearError("phone"));

document.getElementById("password").addEventListener("blur", validatePassword);
document
  .getElementById("password")
  .addEventListener("input", updatePasswordStrength);
document
  .getElementById("password")
  .addEventListener("input", () => clearError("password"));

document.getElementById("confirm").addEventListener("blur", validateConfirm);
document
  .getElementById("confirm")
  .addEventListener("input", () => clearError("confirm"));

document.getElementById("toggleBtn").addEventListener("click", (e) => {
  e.preventDefault();
  togglePassword();
});

const radios = document.querySelectorAll("input[name='gender']");
for (let i = 0; i < radios.length; i++) {
  radios[i].addEventListener("change", validateGender);
}

document.getElementById("terms").addEventListener("change", validateTerms);

document.getElementById("btnSubmit").addEventListener("click", function () {
  const isValid =
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirm() &
    validateGender() &
    validateTerms();

  if (!isValid) return;

  const name = document.getElementById("fullname").value.trim();
  document.getElementById("formBox").style.display = "none";
  document.getElementById("successName").textContent = name;
  document.getElementById("successBox").style.display = "block";
});
