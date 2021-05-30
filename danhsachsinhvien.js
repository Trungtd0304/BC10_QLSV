function DanhSachSinhVien() {
  this.list = [];
  this.themSinhVien = function (sv) {
    this.list.push(sv);
  };
  this._timViTri = function (maSV) {
    /**
     * tìm vị trí maSV muốn xoá thông qua mảng list
     * 1. duyệt mảng this.list
     * 2. nếu item.maSV == maSV => xoá index(i)
     * 3. splice (index,i)
     */
    var index = -1;
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].maSV == maSV) {
        index = i;
        break;
      }
    }
    return index;
  };
  this._xoaSinhVien = function (maSV) {
    var index = this._timViTri(maSV);
    // Xoá sinh vien
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  };
  this.layThongTinSinhVien = function (maSV) {
    //lấy vị trí
    var index = this._timViTri(maSV);
    if (index !== -1) {
      return this.list[index];
    }
  };
  this.capNhatSinhVien = function (sinhVien) {
    // lấy vị trí
    var index = this._timViTri(sinhVien.maSV);
    if (index !== -1) {
      this.list[index] = sinhVien;
    }
  };
  // this.timKimSinhVien = function (keyWord) {};
}

DanhSachSinhVien.prototype.timKimSinhVien = function () {
  /**
   * 0. tạo mangtimkim =[]
   * 1 duyệt mảng list
   * 2. nếu keyWord trùng với sinvien.tenSV
   * => tìm thấy: thêm vào mangtimkim
   * 3. trả về mảng
   */
  var mangTimKiem = [];
  for (var i = 0; i < this.list.length; i++) {
    if (
      this.list[i].tenSV.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1
    ) {
      mangTimKiem.push(this.list[i]);
    }
  }
  return mangTimKiem;
};
