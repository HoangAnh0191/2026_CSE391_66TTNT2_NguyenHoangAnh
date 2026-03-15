//  Tiện ích

function showError(id, message) {
  document.getElementById("err-" + id).textContent = message;
  var input = document.getElementById(id);
  if (input) input.classList.add("error-input");
}

function clearError(id) {
  document.getElementById("err-" + id).textContent = "";
  var input = document.getElementById(id);
  if (input) input.classList.remove("error-input");
}

//  Validate từng trường

function validateFullname() {
  var value = document.getElementById("fullname").value.trim();
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
  var value = document.getElementById("email").value.trim();
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
  var value = document.getElementById("phone").value.trim();
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
  var value = document.getElementById("password").value;
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
  var value = document.getElementById("confirm").value;
  var password = document.getElementById("password").value;
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
  var checked = document.querySelector("input[name='gender']:checked");
  if (!checked) {
    document.getElementById("err-gender").textContent =
      "Vui lòng chọn giới tính";
    return false;
  }
  document.getElementById("err-gender").textContent = "";
  return true;
}

function validateTerms() {
  var checked = document.getElementById("terms").checked;
  if (!checked) {
    document.getElementById("err-terms").textContent =
      "Bạn phải đồng ý với điều khoản";
    return false;
  }
  document.getElementById("err-terms").textContent = "";
  return true;
}

//  Sự kiện blur – validate khi rời ô

document.getElementById("fullname").addEventListener("blur", validateFullname);
document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("phone").addEventListener("blur", validatePhone);
document.getElementById("password").addEventListener("blur", validatePassword);
document.getElementById("confirm").addEventListener("blur", validateConfirm);

var radios = document.querySelectorAll("input[name='gender']");
for (var i = 0; i < radios.length; i++) {
  radios[i].addEventListener("change", validateGender);
}

document.getElementById("terms").addEventListener("change", validateTerms);

//  Sự kiện input – xóa lỗi khi gõ lại

var inputIds = ["fullname", "email", "phone", "password", "confirm"];
for (var j = 0; j < inputIds.length; j++) {
  (function (id) {
    document.getElementById(id).addEventListener("input", function () {
      clearError(id);
    });
  })(inputIds[j]);
}

//  Xử lý submit

document.getElementById("btnSubmit").addEventListener("click", function () {
  // Dùng & thay vì && để tất cả hàm đều được gọi (không dừng sớm)
  var isValid =
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirm() &
    validateGender() &
    validateTerms();

  if (!isValid) return;

  var name = document.getElementById("fullname").value.trim();
  document.getElementById("formBox").style.display = "none";
  document.getElementById("successName").textContent = name;
  document.getElementById("successBox").style.display = "block";
});
