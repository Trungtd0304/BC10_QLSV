// tạo đối tượng dssv từ lớp đối tượng DanhSachSinhVien
var dssv = new DanhSachSinhVien();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
  // tạo hàm rút gon phần document.getElementById
}

/**
 * lấy data từ localStorage show ra ngoài table
 */

getLocalStorage();
/**
 * Thêm sinh viên
 */
// getEle("btnAdd").onclick = function () {
//   console.log(123);
// };
function layDuLieuDauVao(isAdd) {
  //   lấy thông tin từ user nhập vào thông qua các thẻ input
  var _maSV = getEle("txtMaSV").value;
  var _tenSV = getEle("txtTenSV").value;
  var _email = getEle("txtEmail").value;
  var _matKhau = getEle("txtPass").value;
  var _ngaySinh = getEle("txtNgaySinh").value;
  var _khoaHoc = getEle("khSV").value;
  var _diemToan = getEle("txtDiemToan").value;
  var _diemLy = getEle("txtDiemLy").value;
  var _diemHoa = getEle("txtDiemHoa").value;

  // isValid là true => thêm sinh vien vào mảng
  var isValid = true;
  if (isAdd) {
    // Kiểm tra Validation cho input Msv
    isValid &=
      validation.kiemTraRong(
        _maSV,
        "divMaErr",
        "(*)Mã sinh viên không được trống"
      ) &&
      validation.kiemDoDaiKyTu(
        _maSV,
        "divMaErr",
        "(*)Độ dài ký tự từ 4-10",
        4,
        10
      ) &&
      validation.kiemTraMaTrung(
        _maSV,
        "divMaErr",
        "(*)Mã sinh viên đã tồn tại",
        dssv.list
      );
  }
  // Kiểm tra Validation cho input tên sv
  isValid &=
    validation.kiemTraRong(
      _tenSV,
      "divTenErr",
      "(*)Tên sinh viên không được trống"
    ) &&
    validation.kiemTraKyTuChuoi(
      _tenSV,
      "divTenErr",
      "(*)Tên sinh viên phải là chữ"
    );
  // Kiểm tra Validation cho input email
  isValid &=
    validation.kiemTraRong(
      _email,
      "divEmailErr",
      "(*)Email không được trống"
    ) && validation.kiemTraEmail(_email, "divEmailErr", "Email không đúng");
  // Kiểm tra Validation cho input ngày sinh
  isValid &=
    validation.kiemTraRong(
      _ngaySinh,
      "divNgaySinhErr",
      "(*)Ngày sinh không được trống"
    ) &&
    validation.kiemTraNgaySinh(
      _ngaySinh,
      "divNgaySinhErr",
      "(*)Ngày sinh không đúng định dạng"
    );
  // Kiểm tra Validation cho input mật khẩu
  isValid &=
    validation.kiemTraRong(
      _matKhau,
      "divMatKhauErr",
      "(*)Mật khẩu không được trống"
    ) &&
    validation.kiemTraMatKhau(
      _matKhau,
      "divMatKhauErr",
      "(*)Mật khẩu không đúng định dạng"
    );
  // Kiểm tra Validation cho input điểm toán
  isValid &=
    validation.kiemTraRong(
      _diemToan,
      "divToanErr",
      "(*)Điểm Toán không được trống"
    ) && validation.kiemTraSo(_diemToan, "divToanErr", "(*)Vui lòng nhập số");
  // Kiểm tra Validation cho input điểm lý
  isValid &=
    validation.kiemTraRong(
      _diemLy,
      "divLyErr",
      "(*)Điểm Lý không được trống"
    ) && validation.kiemTraSo(_diemLy, "divLyErr", "(*)Vui lòng nhập số");
  // Kiểm tra Validation cho input điểm hoá
  isValid &=
    validation.kiemTraRong(
      _diemHoa,
      "divHoaErr",
      "(*)Điểm Hoá không được trống"
    ) && validation.kiemTraSo(_diemHoa, "divHoaErr", "(*)Vui lòng nhập số");
  isValid &= validation.kiemTraKhoaHoc(
    "khSV",
    "divKHErr",
    "(*)Vui lòng chọn khoá học"
  );

  if (isValid) {
    var sinhVien = new SinhVien(
      _maSV,
      _tenSV,
      _email,
      _ngaySinh,
      _matKhau,
      _khoaHoc,
      _diemToan,
      _diemLy,
      _diemHoa
    );
    return sinhVien;
  }
  return null;
}

// callback function tham số của 1 hàm, là 1 hàm khác
getEle("btnAdd").addEventListener("click", function (event) {
  //chặn trnag load lại
  event.preventDefault();
  var sinhVien = layDuLieuDauVao(true);

  //kiểm tra nếu như hợp lệ => Thêm
  if (sinhVien) {
    // Thực thi phương thức tínhDTB()
    sinhVien.tinhDTB();
    dssv.themSinhVien(sinhVien);
    taoBang(dssv.list);

    //lưu mảng list
    setLocalStorage();
  }
});

function taoBang(arr) {
  // reset tbody
  getEle("tbodySinhVien").innerHTML = "";
  for (var i = 0; i < arr.length; i++) {
    // Tạo dòng tr
    var tagTR = document.createElement("tr");

    // Tạo cột td - 6 cột
    var tagTD_MaSV = document.createElement("td");
    var tagTD_TenSV = document.createElement("td");
    var tagTD_Email = document.createElement("td");
    var tagTD_NgaySinh = document.createElement("td");
    var tagTD_KhoaHoc = document.createElement("td");
    var tagTD_DTB = document.createElement("td");
    var tagTD_Button_Edit = document.createElement("td");
    var tagTD_Button_Delete = document.createElement("td");

    // Tạo nội dung cho 6 cột
    tagTD_MaSV.innerHTML = arr[i].maSV;
    tagTD_TenSV.innerHTML = arr[i].tenSV;
    tagTD_Email.innerHTML = arr[i].email;
    tagTD_NgaySinh.innerHTML = arr[i].ngaySinh;
    tagTD_KhoaHoc.innerHTML = arr[i].khoaHoc;
    tagTD_DTB.innerHTML = arr[i].diemTB;
    tagTD_Button_Edit.innerHTML =
      '<button onclick="suaSinhVien(' +
      arr[i].maSV +
      ')" class="btn btn-info">Sửa</button>';
    tagTD_Button_Delete.innerHTML =
      "<button onclick=\"xoaSinhVien('" +
      arr[i].maSV +
      '\')" class="btn btn-danger">Xóa</button>';

    // appendChild 6 cột vào dòng
    tagTR.appendChild(tagTD_MaSV);
    tagTR.appendChild(tagTD_TenSV);
    tagTR.appendChild(tagTD_Email);
    tagTR.appendChild(tagTD_NgaySinh);
    tagTR.appendChild(tagTD_KhoaHoc);
    tagTR.appendChild(tagTD_DTB);
    tagTR.appendChild(tagTD_Button_Edit);
    tagTR.appendChild(tagTD_Button_Delete);

    // appendChild dòng vào tbody
    getEle("tbodySinhVien").appendChild(tagTR);
  }
}
function xoaSinhVien(maSV) {
  console.log(maSV);
  dssv._xoaSinhVien(maSV);
  taoBang(dssv.list);
  setLocalStorage();
}
//Sửa sinh viên
function suaSinhVien(maSV) {
  var sinhVien = dssv.layThongTinSinhVien(maSV);

  //mở lại nút cập nhật
  getEle("btnUpdate").style.display = "inline-block";

  // dom tới HTML
  getEle("txtMaSV").value = sinhVien.maSV;
  getEle("txtMaSV").disabled = true;
  getEle("txtTenSV").value = sinhVien.tenSV;
  getEle("txtEmail").value = sinhVien.email;
  getEle("txtPass").value = sinhVien.matKhau;
  getEle("txtNgaySinh").value = sinhVien.ngaySinh;
  getEle("khSV").value = sinhVien.khoaHoc;
  getEle("txtDiemToan").value = sinhVien.diemToan;
  getEle("txtDiemLy").value = sinhVien.diemLy;
  getEle("txtDiemHoa").value = sinhVien.diemHoa;
}
// hàm lưu lại mảng đã có
function setLocalStorage() {
  // chuyển kiểu json sang kiểu string (JSON.stringify)
  var arrString = JSON.stringify(dssv.list);
  localStorage.setItem("DSSV", arrString);
}

//Show mảng đang có
function getLocalStorage() {
  if (localStorage.getItem("DSSV")) {
    var data = localStorage.getItem("DSSV");
    dssv.list = JSON.parse(data);
    // chuyển từ kiểu stringify => Json
    taoBang(dssv.list);
  }
}
/**
 * cập nhật sinh viên
 */
getEle("btnUpdate").addEventListener("click", function () {
  var sinhVien = layDuLieuDauVao(false);
  sinhVien.tinhDTB();
  dssv.capNhatSinhVien(sinhVien);
  taoBang(dssv.list);
  setLocalStorage();
});

/**
 * Reset
 */
getEle("btnReset").addEventListener("click", function () {
  //Dom tới các thẻ input gán value lại rỗng hết
  getEle("formSV").reset();
  getEle("btnUpdate").style.display = "none";
  getEle("txtMaSV").disabled = false;

  //dom tới các thẻ dip reset
});

// tìm sinh viên
getEle("txtSearch").addEventListener("keyup", function () {
  var keyWord = getEle("txtSearch").value;
  var mangTimKiem = dssv.timKiemSinhVien(keyWord);
  taoBang(mangTimKiem);
});
