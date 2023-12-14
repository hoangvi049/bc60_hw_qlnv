function Validation() {
  this.kiemTraRong = function (value, spanID, errorMess) {
    if (value == "") {
      document.getElementById(spanID).style.display = "block";
      document.getElementById(spanID).innerHTML = errorMess;
      return false;
    }
    document.getElementById(spanID).innerHTML = "";
    return true;
  };

  this.kiemDoDai = function (value, spanID, errorMess, min, max) {
    if (value.trim().length >= min && value.trim().length <= max) {
      document.getElementById(spanID).innerHTML = "";
      return true;
    }

    //false
    document.getElementById(spanID).style.display = "block";

    document.getElementById(spanID).innerHTML = errorMess;
    return false;
  };
  this.kiemTraTen = function (value, spanID, errorMess) {
    const letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      document.getElementById(spanID).innerHTML = "";
      return true;
    }
    document.getElementById(spanID).style.display = "block";
    document.getElementById(spanID).innerHTML = errorMess;
    return false;
  };

  this.kiemTraEmail = function (value, spanID, errorMess) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (value.match(reg)) {
      //true
      document.getElementById(spanID).innerHTML = "";
      return true;
    }

    // false
    document.getElementById(spanID).style.display = "block";
    document.getElementById(spanID).innerHTML = errorMess;
    return false;
  };

  this.kiemTraNumberValue = function (value, spanID, errorMess, min, max) {
    if (Number(value) < min || Number(value) > max) {
      document.getElementById(spanID).style.display = "block";
      document.getElementById(spanID).innerHTML = errorMess;
      return false;
    }
    document.getElementById(spanID).innerHTML = "";
    return true;
  };
  this.kiemTraPassword = function (value, spanID, errorMess) {
    const reg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    if (value.match(reg)) {
      //true
      document.getElementById(spanID).innerHTML = "";
      return true;
    }

    // false
    document.getElementById(spanID).style.display = "block";
    document.getElementById(spanID).innerHTML = errorMess;
    return false;
  };

  this.kiemTraSelect = function (value, spanID, errorMess) {
    if (document.getElementById(value).selectedIndex === 0) {
      document.getElementById(spanID).style.display = "block";
      document.getElementById(spanID).innerHTML = errorMess;
      return false;
    }
    document.getElementById(spanID).innerHTML = "";
    return true;
  };
  this.kiemTraTonTai = function (data, value, spanID, errorMess) {
    var valid = false;
    for (let i = 0; i < data.length; i++) {
      const nv = data[i];
      if (nv.account === value) {
        valid = true;
        break;
      }
    }
    if (valid) {
      document.getElementById(spanID).style.display = "block";

      document.getElementById(spanID).innerHTML = errorMess;
      return false;
    }

    document.getElementById(spanID).innerHTML = "";
    return true;
  };
}
