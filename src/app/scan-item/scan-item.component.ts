import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scan-item',
  templateUrl: './scan-item.component.html',
  styleUrls: ['./scan-item.component.scss']
})
export class ScanItemComponent implements OnInit {

  public loading: Boolean;
  qrResultString: string;

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  constructor() { }

  ngOnInit() {
  }

}
