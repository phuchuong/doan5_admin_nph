import { ApiService } from './../../../core/services/api.service';
import {
  AfterViewInit,
  Component,
  Injector,
  OnInit,
  Renderer2,
} from '@angular/core';

import { BaseComponent } from 'src/app/core/common/base-component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

// data={}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  [x: string]: any;

  val = {
    MaDT: null,
    TenDT: '',
    IDLoaiDT: '',
    AnhDT: 'no.npg',
    MoTa: '',
    Sale: 0,
    TenMS: '',
    SoLuong: 0,
    Gia: 0,
  };
  public list_item: any;

  PhotoName = '';
  PhotoPath = environment.PHOTO_API;
  file: any;
  photofilename = 'no.png';

  constructor(
    injector: Injector,
    private _api: ApiService,
    private http: HttpClient
  ) {
    super(injector);
  }
  //
  formHeader = '';
  page: number = 1;
  totalLength: any;
  // TenSP!: string;

  ngOnInit(): void {
    this.showModal();
  }

  Search() {
    if (this.val.TenDT == '') {
      this.ngOnInit();
    } else {
      this.list_item = this.list_item.filter((res: any) => {
        return res.TenDT.toLocaleLowerCase().match(
          this.val.TenDT.toLocaleLowerCase()
        );
      });
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.photofilename = event.target.files[0].name;
  }
  onUpload() {
    var formData = new FormData();
    formData.append('file', this.file, this.file.name);
    this.http
      .post('http://localhost:5093/api/DienThoai/Upload', formData)
      .subscribe((data: any) => {
        this.photofilename = data.toString();
        console.log(data);
        console.log(this.photofilename);
      });
  }

  showModal() {
    this._api.get('/api/DienThoai').subscribe((res) => {
      this.list_item = res;
      this.totalLength = this.list_item.length;
      console.log(this.list_item);

      setTimeout(() => {
        this.loadScripts(
          'assets/js/hide_menu.js',
          'assets/js/slide_show.js',
          'assets/js/vendor.min.js',
          // 'assets/libs/peity/jquery.peity.min.js',
          // 'assets/libs/apexcharts/apexcharts.min.js',
          // 'assets/libs/jquery-vectormap/jquery-jvectormap-1.2.2.min.js',
          // 'assets/libs/jquery-vectormap/jquery-jvectormap-us-merc-en.js',
          // 'assets/js/pages/dashboard-1.init.js',
          // 'assets/js/app.min.js',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js '
        );
      });
    });
  }

  ngAfterViewInit() {
    this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
  }

  deleteproduct(id: any) {
    let x = confirm('Bạn muốn xóa điện thoại?');
    if (x == true) {
      this._api.delete('api/DienThoai/' + id).subscribe((res) => {
        this.showModal();
      });
      alert(`xoa thành công!`);
    }
  }

  // delClick(id: number, tenlsp: string) {
  //   let cfm = confirm(`Bạn muốn xóa ${tenlsp}?`)
  //   if (cfm == true) {
  //     this.service.deleteLoai(id).subscribe(data => {
  //       this.toastr.warning('Đã xóa', 'thành công')
  //       this.lamMoiDL();
  //     })
  //   }
  // }
  editproduct(a: any) {
    this.formHeader = 'Sửa sản phẩm';
    this.val.MaDT = a.MaDT;
    this.val.TenDT = a.TenDT;
    this.val.IDLoaiDT = a.IDLoaiDT;
    this.val.AnhDT = a.AnhDT;
    this.val.MoTa = a.MoTa;
    this.val.Sale = a.Sale;
    this.val.TenMS = a.TenMS;
    this.val.SoLuong = a.SoLuong;
    this.val.Gia = a.Gia;
  }
  creat() {
    this.formHeader = 'Thêm sản phẩm';
    this.val = {
      MaDT: null,
      TenDT: '',
      IDLoaiDT: '',
      AnhDT: 'no.npg',
      MoTa: '',
      Sale: 0,
      TenMS: '',
      SoLuong: 0,
      Gia: 0,
    };
  }

  save(nut: any) {
    this.val.AnhDT = this.photofilename;

    if (nut == 'Thêm sản phẩm') {
      this.http
        .post('http://localhost:5093/api/DienThoai', this.val)
        .subscribe((data: any) => {
          if (this.file != null) {
            this.onUpload();
          }
          this.val = {
            MaDT: null,
            TenDT: '',
            IDLoaiDT: '',
            AnhDT: 'no.npg',
            MoTa: '',
            Sale: 0,
            TenMS: '',
            SoLuong: 0,
            Gia: 0,
          };
          this.showModal();
        });
    } else {
      //sửa sản phẩm
      console.log(this.val);
      this._api.put('/api/DienThoai', this.val);
      this._api
        .put(`/api/DienThoai/?madt=${this.val.MaDT}`, this.val)
        .subscribe((data: any) => {
          if (this.file != null) {
            this.onUpload();
          }
          this.val = {
            MaDT: null,
            TenDT: '',
            IDLoaiDT: '',
            AnhDT: 'no.npg',
            MoTa: '',
            Sale: 0,
            TenMS: '',
            SoLuong: 0,
            Gia: 0,
          };

          let x = confirm('Bạn muốn chỉnh sửa sản phẩm?');
          if (x == true) {
            alert(`Sửa thành công!`);
          }

          this.showModal();
        });
    }
  }
}
