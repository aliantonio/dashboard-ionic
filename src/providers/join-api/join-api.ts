import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastProvider } from '../../providers/toast/toast';

@Injectable()
export class JoinApiProvider {

  constructor(public http: HttpClient, private toast: ToastProvider) { }

  push(param: string) {
    let deviceId = 'bcd262084a55405aa591c6c378b48f19'; // pixel 2
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
