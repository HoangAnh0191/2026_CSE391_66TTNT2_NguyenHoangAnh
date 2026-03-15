//  Giá sản phẩm
var prices = {
  Áo: 150000,
  Quần: 200000,
  Giày: 350000,
  Mũ: 80000,
};

//  Hiện / xóa lỗi
function showError(id, msg) {
  document.getElementById("err-" + id).textContent = msg;
}
function clearError(id) {
  document.getElementById("err-" + id).textContent = "";
}

//  Tính tổng tiền
function tinhTong() {
  var product = document.getElementById("product").value;
  var quantity = parseInt(document.getElementById("quantity").value);
  var display = document.getElementById("totalDisplay");

  if (prices[product] && quantity > 0) {
    display.textContent =
      (prices[product] * quantity).toLocaleString("vi-VN") + "₫";
  } else {
    display.textContent = "—";
  }
}

//  Đếm ký tự ghi chú
function demKyTu() {
  var len = document.getElementById("note").value.length;
  var el = document.getElementById("charCount");
  el.textContent = len + "/200";
  el.style.color = len > 200 ? "red" : "#888";
}

//  Validate
function validateProduct() {
  if (document.getElementById("product").value === "") {
    showError("product", "Vui lòng chọn sản phẩm");
    return false;
  }
  clearError("product");
  return true;
}

function validateQuantity() {
  var num = parseInt(document.getElementById("quantity").value);
  if (!num) {
    showError("quantity", "Số lượng không được để trống");
    return false;
  }
  if (num < 1 || num > 99) {
    showError("quantity", "Số lượng từ 1 đến 99");
    return false;
  }
  clearError("quantity");
  return true;
}

function validateDelivery() {
  var value = document.getElementById("delivery").value;
  if (!value) {
    showError("delivery", "Vui lòng chọn ngày giao hàng");
    return false;
  }

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var selected = new Date(value);
  var maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  if (selected < today) {
    showError("delivery", "Không được chọn ngày trong quá khứ");
    return false;
  }
  if (selected > maxDate) {
    showError("delivery", "Không được quá 30 ngày từ hôm nay");
    return false;
  }
  clearError("delivery");
  return true;
}

function validateAddress() {
  var val = document.getElementById("address").value.trim();
  if (val === "") {
    showError("address", "Địa chỉ không được để trống");
    return false;
  }
  if (val.length < 10) {
    showError("address", "Địa chỉ phải có ít nhất 10 ký tự");
    return false;
  }
  clearError("address");
  return true;
}

function validateNote() {
  if (document.getElementById("note").value.length > 200) {
    showError("note", "Ghi chú không được quá 200 ký tự");
    return false;
  }
  clearError("note");
  return true;
}

function validatePayment() {
  if (!document.querySelector("input[name='payment']:checked")) {
    showError("payment", "Vui lòng chọn phương thức thanh toán");
    return false;
  }
  clearError("payment");
  return true;
}

//  Blur – validate từng trường khi rời ô
document.getElementById("product").addEventListener("blur", validateProduct);
document.getElementById("quantity").addEventListener("blur", validateQuantity);
document.getElementById("delivery").addEventListener("blur", validateDelivery);
document.getElementById("address").addEventListener("blur", validateAddress);

var radios = document.querySelectorAll("input[name='payment']");
for (var i = 0; i < radios.length; i++) {
  radios[i].addEventListener("change", validatePayment);
}

//  Input – xóa lỗi khi gõ lại
document.getElementById("quantity").addEventListener("input", function () {
  clearError("quantity");
});
document.getElementById("delivery").addEventListener("change", function () {
  clearError("delivery");
});
document.getElementById("address").addEventListener("input", function () {
  clearError("address");
});
document.getElementById("note").addEventListener("input", function () {
  clearError("note");
});

//  Realtime: tổng tiền + đếm ký tự
document.getElementById("product").addEventListener("change", function () {
  clearError("product");
  tinhTong();
});
document.getElementById("quantity").addEventListener("input", tinhTong);
document.getElementById("note").addEventListener("input", demKyTu);

//  Nút Đặt hàng
function handleOrder() {
  var ok =
    validateProduct() &
    validateQuantity() &
    validateDelivery() &
    validateAddress() &
    validateNote() &
    validatePayment();

  if (!ok) return;

  var product = document.getElementById("product").value;
  var quantity = document.getElementById("quantity").value;
  var delivery = document.getElementById("delivery").value;
  var address = document.getElementById("address").value.trim();
  var payment = document.querySelector("input[name='payment']:checked").value;
  var total =
    (prices[product] * parseInt(quantity)).toLocaleString("vi-VN") + "₫";

  document.getElementById("confirmInfo").innerHTML =
    "<b>Sản phẩm:</b> " +
    product +
    "<br>" +
    "<b>Số lượng:</b> " +
    quantity +
    "<br>" +
    "<b>Tổng tiền:</b> " +
    total +
    "<br>" +
    "<b>Ngày giao:</b> " +
    delivery +
    "<br>" +
    "<b>Địa chỉ:</b> " +
    address +
    "<br>" +
    "<b>Thanh toán:</b> " +
    payment;

  document.getElementById("formBox").style.display = "none";
  document.getElementById("confirmBox").style.display = "block";
}

//  Nút Xác nhận
function handleConfirm() {
  document.getElementById("confirmBox").style.display = "none";
  document.getElementById("successBox").style.display = "block";
}

//  Nút Hủy
function handleCancel() {
  document.getElementById("confirmBox").style.display = "none";
  document.getElementById("formBox").style.display = "block";
}
