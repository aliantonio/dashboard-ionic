import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastProvider } from '../../providers/toast/toast';

@Injectable()
export class JoinApiProvider {

  constructor(public http: HttpClient, private toast: ToastProvider) { }

  push(param: string, args?: any) {
    let deviceId = 'f70f80282ea741f190b8d80d9388f460'; // pixel 3
    let apiKey = '36daccd47ff14aa385a36d425ab4bc13';
    if (args == undefined || args == "" || args == "undefined") {
      args = "";
    }
    console.log('https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?text=' + param + args + '&deviceId=' + deviceId + '&apikey=' + apiKey);
    this.http.get('https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?text=' + param + args + '&deviceId=' + deviceId + '&apikey=' + apiKey)
    .subscribe(
    // Successful responses call the first callback.
    data => {
      console.log(data);
    },
    // Errors will call this callback instead:
    err => {
      console.error(err);
      this.toast.showToast('Something went wrong. Try again later.');
    });
  
  }

}
