function NhanVien(
  _account,
  _name,
  _email,
  _password,
  _date,
  _salary,
  _position,
  _hours
) {
  this.account = _account;
  this.name = _name;
  this.email = _email;
  this.password = _password;
  this.date = _date;
  this.position = _position;
  this.hours = _hours;
  this.salary = _salary;
  this.income = 0;
  this.condition = "";

  this.tinhLuong = function () {
    let salary = Number(this.salary);
    switch (this.position) {
      case "Sếp":
        this.income = salary * 3;
        break;
      case "Trưởng phòng":
        this.income = salary * 3;
        break;
      case "Nhân viên":
        this.income = salary;
    }
  };

  this.xepLoai = function () {
    let hours = Number(this.hours);
    if (hours < 160) {
      this.condition = "Trung Bình";
    } else if (hours >= 160 && hours < 176) {
      this.condition = "Khá";
    } else if (hours >= 176 && hours < 192) {
      this.condition = "Tốt";
    } else {
      this.condition = "Xuất Sắc";
    }
  };
}
