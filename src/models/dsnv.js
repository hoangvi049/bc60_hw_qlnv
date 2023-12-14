function DSNV() {
  this.arrayNV = [];
  this.themNV = function (nv) {
    this.arrayNV.push(nv);
    alert("Đã thêm nhân viên");
  };
  this.timIndexNV = function (id) {
    let index;
    for (let i = 0; i < this.arrayNV.length; i++) {
      if (this.arrayNV[i].account == id) {
        index = i;
        break;
      }
    }
    return index;
  };

  this.layThongTinNV = function (id) {
    const index = this.timIndexNV(id);
    if (index !== -1) {
      return this.arrayNV[index];
    }
    return null;
  };

  this.capNhatNV = function (nv) {
    const index = this.timIndexNV(nv.account);
    if (index !== -1) {
      this.arrayNV[index] = nv;
    }
  };
  this.xoaNV = function (id) {
    let text = "Bạn muốn xóa nhân viên này?";
    const index = this.timIndexNV(id);
    if (index !== -1) {
      if (confirm(text) == true) {
        this.arrayNV.splice(index, 1);
      }
    }
  };

  this.timKiemNV = function (keyword) {
    var arrayTimKiem = [];

    for (let i = 0; i < this.arrayNV.length; i++) {
      const nv = this.arrayNV[i];
      const keywordLower = keyword.toLowerCase();

      const tenLower = nv.condition.toLowerCase();

      const indexLower = tenLower.indexOf(keywordLower);
      if (indexLower !== -1) {
        arrayTimKiem.push(this.arrayNV[i]);
      }
    }
    return arrayTimKiem;
  };
}
