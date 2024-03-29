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
  selector: 'app-loaisp',
  templateUrl: './loaisp.component.html',
  styleUrls: ['./loaisp.component.scss'],
})
export class LoaispComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  list_NPH= {
    IDLoaiDT: null,
    TenLoaiDT: '',
  };

  public list_item: any;

  constructor(injector: Injector, private Api_NPH: ApiService) {
    super(injector);
  }

  formHeader = '';
  // TenSP!: string;

  ngOnInit(): void {
    this.showModal();
  }

  showModal() {
    this.Api_NPH.get('/api/LoaiDT').subscribe((res) => {
      this.list_item = res;

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
    this.Api_NPH.delete('api/LoaiDT/' + id).subscribe((res) => {
      this.showModal();
    });
  }

  creat() {
    this.formHeader = 'Thêm loại điện thoại';
    this.list_NPH = {
      IDLoaiDT: null,
      TenLoaiDT: '',
    };
  }
  editproduct(a: any) {
    this.formHeader = 'Sửa loại điện thoại';

    this.list_NPH.IDLoaiDT = a.IDLoaiDT;
    this.list_NPH.TenLoaiDT = a.TenLoaiDT;
  }


  save(nut: any) {
    if (nut == 'Thêm loại điện thoại') {
      this.Api_NPH.post('/api/LoaiDT', this.list_NPH).subscribe((data: any) => {
        this.list_NPH = {
          IDLoaiDT: null,
          TenLoaiDT: '',
        };
        this.showModal();
      });
    } else {
      //sửa sản phẩm
      console.log(this.list_NPH);
      this.Api_NPH.put('/api/LoaiDT', this.list_NPH);

      this.Api_NPH
        .put(`/api/LoaiDT/?maloaidt=${this.list_NPH.IDLoaiDT}`, this.list_NPH)
        .subscribe((data: any) => {
          this.list_NPH = {
            IDLoaiDT: null,
            TenLoaiDT: '',
          };

          this.showModal();
        });
    }
  }
  Search() {
    if (this.list_NPH.TenLoaiDT == '') {
      this.ngOnInit();
    } else {
      this.list_item = this.list_item.filter((res: any) => {
        return res.TenLoai.toLocaleLowerCase().match(
          this.list_NPH.TenLoaiDT.toLocaleLowerCase()
        );
      });
    }
  }
}


