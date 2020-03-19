import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-scan-item',
  templateUrl: './scan-item.component.html',
  styleUrls: ['./scan-item.component.scss']
})
export class ScanItemComponent implements OnInit {

  public loading: Boolean;
  chosenCameraSubject = new Subject();

  decodedOutput($event: string) {
    console.log('Decoded', $event);
  }

  listCameras($event: MediaDeviceInfo[]) {
    console.log('MediaDeviceInfo', $event);
    this.chosenCameraSubject.next($event.filter(device => device.kind === 'videoinput')[0])
  }
  
  constructor() { }

  ngOnInit() {
  }

}
