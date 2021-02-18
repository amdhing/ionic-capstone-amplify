import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { API, Auth } from 'aws-amplify';
import { time } from 'console';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  username: any;
  queryLoaded: boolean = false;
  submitted: boolean = false;
  queryItems: any;
  slideOptions = {
    slidesPerView: 3
  };

  constructor(private router: Router, public toastController: ToastController) { 
    // setTimeout(() => {this.gethistory()}, 3000);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Oops! Looks like you had no previous quotes. If you did, please go home and visit this page agin.",
      duration: 3000
    });
    toast.present();
  }

  public gobacktohome(){
    this.router.navigate(['home'])
  }

  public logout(){
    Auth.signOut().then(res => {
      this.router.navigate(['']);
    })
  }

  // public callgethistoryagain(){this.gethistory();}
  public gethistory(){

    
    const myInit = { 
      headers: {},
      response: true,
      queryStringParameters: {
      "Limit":"6"
    }
  }
    API.get('writerresource', `/writer/${this.username}`, myInit).then(response => {
      console.log(response);
      if(response.data.length != 0) {
        this.queryItems = response.data;
        this.queryLoaded = true
      }
      else this.presentToast();

    }).catch(error => console.log(error));
  }

  ngOnInit() {
    Auth.currentUserInfo().then(info => {
      this.username = info.attributes.email;
      console.log(info);
    }).catch(err => console.log(err));
  }

  ionViewWillEnter(){
    setTimeout(() => {}, 3000);
  }
  ionViewDidEnter(){
    this.gethistory();
  }
  
}
