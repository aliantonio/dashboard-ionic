import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PingProvider } from '../../providers/ping/ping';
import { LoadingProvider } from '../../providers/loading/loading';
import { JoinApiProvider } from '../../providers/join-api/join-api';
import { CheckMaintStatusProvider } from '../../providers/check-maint-status/check-maint-status';
import { Http, Jsonp, Response, RequestOptions, Headers  } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isPoweredOn: boolean = false;
  private alive: boolean = false;
  isVpnConnected: string = localStorage.getItem('isVpnConnected');
  isUnderMaintenance: boolean = false;
  datax: any;

  constructor(public navCtrl: NavController, private ping: PingProvider, private load: LoadingProvider, private joinApi: JoinApiProvider,
      private http: Http, private maintStatus: CheckMaintStatusProvider, private toast: ToastProvider) {
  }

  ngOnInit() {
    this.alive = true;
    this.load.show();
    this.checkCpuState();
    this.checkMaintStatus();
  }

  acconzoCameras() {
    this.toast.showToast('Attempting to open Amcrest Cloud app...')
    console.log('opening amcrest cloud application');
    this.joinApi.push("acconzo cameras");
  }

  private callMaintStatus(body, options) {
    return this.http.post('https://asliantonio.com/plex/php/togglestatus.php', body, options)
      .timeout(10000)
      .do(this.logResponse)
      .catch(this.catchError);
  }

  checkCpuState() {
    this.ping.ping()
      .subscribe((data) => {
        console.log(data);
        if (data.status == "success") {
          this.isPoweredOn = true;
        } else {
          console.error("Successful call but couldn't connect to port. Computer is likely turned off.");
          this.isPoweredOn = false;
        }
        this.load.hide();
      },
      err => {
        console.error(err + " - computer is likely not powered on.");
        this.isPoweredOn = false;
        this.load.hide();
    });
  }

  checkMaintStatus() {
    this.maintStatus.maintStatus()
      .subscribe(
        data => {
          console.log(data);
          data[0].STAT_DESC == 'ACTIVE' ? this.isUnderMaintenance = false : this.isUnderMaintenance = true;
        },
        err => {
          console.error(err);
        }
      )
  }

  private connectVpn() {
    this.toast.showToast('Connecting to VPN...');
    console.log('connecting to vpn');
    this.joinApi.push("vpn%20on");
    localStorage.setItem('isVpnConnected', 'true');
  }

  czechCameras() {
    this.toast.showToast('Attempting to open Amcrest View app...')
    console.log('opening amcrest view application');
    this.joinApi.push("czech cameras");
  }

  private disconnectVpn() {
    this.toast.showToast('Disconnecting from VPN...');
    console.log('disconnecting from vpn');
    this.joinApi.push("vpn%20off");
    localStorage.setItem('isVpnConnected', 'false');
  }

  doRefresh(refresher) {
    console.log('refresh called', refresher);
    this.checkCpuState();
    this.checkMaintStatus();
    refresher.complete();
  }

  openTautulli() {
    window.open('http://asliantonio.dyndns.org:8181/home', '_system', 'location=yes')
  }

  showTraffic() {
    this.toast.showToast('Opening aerial map view...');
    console.log("showing traffic scene");
    this.joinApi.push("traffic%20scene");
  }

  toggleCpu() {
    this.isPoweredOn ? this.turnOn() : this.turnOff();
    console.log(this.isPoweredOn);
  }

  toggleVpn() {
    this.isVpnConnected ? this.connectVpn() : this.disconnectVpn();
    console.log(this.isVpnConnected);
  }

  toggleMaintenanceMsg(status: string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.set('STATUS', status);
    let body = urlSearchParams.toString();
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'}); 
    let options = new RequestOptions({ headers: headers });

    this.callMaintStatus(body, options)
      .subscribe(
        data => {
          this.load.hide();
          this.isUnderMaintenance ? this.isUnderMaintenance = true : this.isUnderMaintenance = false;
          this.toast.showToast('Toggled successfully..');
        },
        err => {
          console.error(err);
          this.toast.showToast("Something went wrong. Check logs.");
          this.load.hide();
        }
      )
  }

  private toggleMaintStatus() {
    this.load.show();
    this.isUnderMaintenance ? this.toggleMaintenanceMsg('UNDER_MAINT') : this.toggleMaintenanceMsg('ACTIVE');
  }

  private turnOff() {
    this.toast.showToast('Turning off computer..');
    console.log("turning off");
    this.joinApi.push("plexOff");
    this.isPoweredOn = false;
  }
  
  private turnOn() {
    this.toast.showToast('Turning on computer...');
    console.log("turning on");
    this.joinApi.push("plex%20request");
    this.isPoweredOn = true;
  }

  viewSecurityCameras() {
    this.toast.showToast('Opening TinyCam app...');
    console.log('opening tiny cam application');
    this.joinApi.push("view%20cameras");
  }

  private logResponse(res: Response) {
    console.log(res);
  }

  private catchError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Server error.");
  }

}
