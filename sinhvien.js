//tạo lớp đối tượng sinh viên
function SinhVien(
  _maSV,
  _tenSV,
  _email,
  _ngaySinh,
  _matKhau,
  _khoaHoc,
  _diemToan,
  _diemLy,
  _diemHoa
) {
  //Hàm khởi tạo thuộc tính và phương tính
  this.maSV = _maSV;
  this.tenSV = _tenSV;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngaySinh = _ngaySinh;
  this.khoaHoc = _khoaHoc;
  this.diemToan = _diemToan;
  this.diemLy = _diemLy;
  this.diemHoa = _diemHoa;
  this.diemTB = 0;

  this.tinhDTB = function () {
    this.diemTB =
      (parseFloat(this.diemToan) +
        parseFloat(this.diemLy) +
        parseFloat(this.diemHoa)) /
      3;
    return this.diemTB;
  };
}
