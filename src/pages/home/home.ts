import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PingProvider } from '../../providers/ping/ping';
import { LoadingProvider } from '../../providers/loading/loading';
import { JoinApiProvider } from '../../providers/join-api/join-api';
import 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isPoweredOn: boolean = false;
  private alive: boolean = false;

  constructor(public navCtrl: NavController, private ping: PingProvider, private load: LoadingProvider, private joinApi: JoinApiProvider) {
  }

  ngOnInit() {
    this.alive = true;
    this.load.show();
    this.checkCpuState();
  }

  checkCpuState() {
    this.ping.ping()
      .subscribe((data) => {
        console.log(data);
        this.isPoweredOn = true;
        this.load.hide();
      },
      err => {
        console.error(err + " - computer is likely not powered on.");
        this.isPoweredOn = false;
        this.load.hide();
    });
  }

  showTraffic() {
    console.log("showing traffic scene");
    this.joinApi.push("traffic%20scene");
  }

  toggleCpu() {
    this.isPoweredOn ? this.turnOn() : this.turnOff();
    console.log(this.isPoweredOn);
  }

  doRefresh(refresher) {
    console.log('refresh called', refresher);
    this.checkCpuState();
    refresher.complete();
  }

  private turnOff() {
    console.log("turning off");
    this.joinApi.push("turn%20off%20computer");
    this.isPoweredOn = false;
  }
  
  private turnOn() {
    console.log("turning on");
    this.joinApi.push("plex%20request");
    this.isPoweredOn = true;
  }

}
