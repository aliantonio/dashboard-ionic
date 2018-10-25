import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastProvider } from '../../providers/toast/toast';

@Injectable()
export class JoinApiProvider {

  constructor(public http: HttpClient, private toast: ToastProvider) { }

  push(param: string) {
    let deviceId = 'f70f80282ea741f190b8d80d9388f460'; // pixel 3
    let apiKey = '36daccd47ff14aa385a36d425ab4bc13';
    console.log('https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?text=' + param + '&deviceId=' + deviceId + '&apikey=' + apiKey);
    this.http.get('https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?text=' + param + '&deviceId=' + deviceId + '&apikey=' + apiKey)
    .subscribe(
    // Successful responses call the first callback.
    data => {
      console.log(data);
      if (param == "plex%20request") {
        this.toast.showToast('Turning on computer...');
      } else if (param == "traffic%20scene") {
        this.toast.showToast('Opening aerial map view...');
      } else if (param == "turn%20off%20computer") {
        this.toast.showToast('Turning off computer..');
      } else if (param == "vpn%20on") {
        this.toast.showToast('Connecting to VPN...');
      } else if (param == "vpn%20off") {
        this.toast.showToast('Disconnecting from VPN...');
      } else if (param == "view%20cameras") {
        this.toast.showToast('Viewing security cameras...');
      } else {
        this.toast.showToast('Something went wrong. Try again later.');
      }
    },
    // Errors will call this callback instead:
    err => {
      console.error(err);
    });
  
  }

}
