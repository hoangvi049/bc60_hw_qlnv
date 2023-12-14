const dsnv = new DSNV();
const validation = new Validation();

function layThongTinNV(isAdd) {
  const _account = document.getElementById("tknv").value;
  const _name = document.getElementById("name").value;
  const _email = document.getElementById("email").value;
  const _password = document.getElementById("password").value;
  const _date = document.getElementById("datepicker").value;
  const _salary = document.getElementById("luongCB").value;
  const _position = document.getElementById("chucvu").value;
  const _hours = document.getElementById("gioLam").value;

  var isValid = true;
  if (isAdd) {
    isValid &=
      validation.kiemTraRong(
        _account,
        "tbTKNV",
        "(*)Vui lòng không để trống"
      ) &&
      validation.kiemDoDai(
        _account,
        "tbTKNV",
        "(*)Tài Khoản cần dài 4-6 ký số",
        4,
        6
      ) &&
      validation.kiemTraTonTai(
        dsnv.arrayNV,
        _account,
        "tbTKNV",
        "(*)Nhân viên đã tồn tại"
      );
  }
  isValid &=
    validation.kiemTraRong(_name, "tbTen", "(*)Vui lòng không để trống") &&
    validation.kiemTraTen(_name, "tbTen", "(*)Tên không hợp lệ");

  isValid &=
    validation.kiemTraRong(_email, "tbEmail", "(*)Vui lòng không để trống") &&
    validation.kiemTraEmail(_email, "tbEmail", "(*) Email không hợp lệ");

  isValid &=
    validation.kiemTraRong(
      _password,
      "tbMatKhau",
      "(*)Vui lòng không để trống"
    ) &&
    validation.kiemTraPassword(
      _password,
      "tbMatKhau",
      "(*)Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );

  isValid &= validation.kiemTraSelect(
    "chucvu",
    "tbChucVu",
    "(*)Vui lòng chọn chức vụ"
  );

  isValid &=
    validation.kiemTraRong(
      _salary,
      "tbLuongCB",
      "(*)Vui lòng không để trống"
    ) &&
    validation.kiemTraNumberValue(
      _salary,
      "tbLuongCB",
      "Lương cơ bản 1 000 000 - 20 000 000",
      1000000,
      2000000
    );

  isValid &=
    validation.kiemTraRong(_hours, "tbGiolam", "(*)Vui lòng không để trống") &&
    validation.kiemTraNumberValue(
      _hours,
      "tbGiolam",
      "Số giờ làm trong tháng 80 - 200 giờ",
      80,
      200
    );

  if (!isValid) return;

  const nv = new NhanVien(
    _account,
    _name,
    _email,
    _password,
    _date,
    _salary,
    _position,
    _hours
  );
  nv.tinhLuong();
  nv.xepLoai();

  return nv;
}

document.getElementById("btnThem").onclick = function () {
  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("tknv").value = "";
  document.getElementById("tknv").disabled = false;
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
};
function renderDSNV(data) {
  var content = "";
  for (let i = 0; i < data.length; i++) {
    const nv = data[i];
    content += `<tr>
        <td>  ${nv.account}</td>
        <td> ${nv.name} </td>
        <td> ${nv.email} </td>
        <td> ${nv.date} </td>
        <td>  ${nv.position} </td>
        <td> ${nv.income}  </td>
        <td> ${nv.condition}  </td>
        <td> <button class="btn btn-danger" onclick="handleXoaNV('${nv.account}')">Delete</button>  </td>
        <td> <button class="btn btn-info" data-toggle="modal" data-target="#myModal"  onclick="handleEdit('${nv.account}')">Edit</button>  </td>
        </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

function handelThemNV() {
  const nv = layThongTinNV(true);
  if (!nv) return;
  dsnv.themNV(nv);

  renderDSNV(dsnv.arrayNV);
  setToLocalStorage();
}
function handleEdit(id) {
  const nv = dsnv.layThongTinNV(id);

  if (nv) {
    document.getElementById("tknv").value = nv.account;
    document.getElementById("tknv").disabled = true;
    document.getElementById("name").value = nv.name;
    document.getElementById("email").value = nv.email;
    document.getElementById("password").value = nv.password;
    document.getElementById("datepicker").value = nv.date;
    document.getElementById("luongCB").value = nv.salary;
    document.getElementById("chucvu").value = nv.position;
    document.getElementById("gioLam").value = nv.hours;
  }
}

function handldUpdate() {
  const nv = layThongTinNV(false);
  console.log(nv);
  dsnv.capNhatNV(nv);
  renderDSNV(dsnv.arrayNV);
  setToLocalStorage();
}

function handleXoaNV(id) {
  dsnv.xoaNV(id);
  renderDSNV(dsnv.arrayNV);
  setToLocalStorage();
}

function setToLocalStorage() {
  const dataString = JSON.stringify(dsnv.arrayNV);

  //lưu xuống localStorage

  localStorage.setItem("DSNV", dataString);
}

function getFromLocalStorage() {
  const DSNV = localStorage.getItem("DSNV");
  if (!DSNV == true) return;
  const dataJSON = JSON.parse(DSNV);
  dsnv.arrayNV = dataJSON;

  renderDSNV(dsnv.arrayNV);
}
getFromLocalStorage();
//** Tìm kiếm NV*/
document.getElementById("searchName").addEventListener("keyup", function () {
  const keyword = document.getElementById("searchName").value;
  const arrayTimKiem = dsnv.timKiemNV(keyword);

  renderDSNV(arrayTimKiem);
});
