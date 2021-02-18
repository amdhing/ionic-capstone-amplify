import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { API, Auth } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOptions = {
    slidesPerView: 3
  };
  username : string;

  // for My Quotes button
  submitted: boolean = false;
  // for making sure query results are available
  queryLoaded: boolean = false;

  queryItems: any;

  constructor(private router: Router) {
    
  }

  public logout(){
    Auth.signOut().then(res=>{
      this.router.navigate(['']);
    })
  }

  public gotohistory(){
    this.router.navigate(['history'])
  }
  
  public getQuoteHistory(){
    // this.submitted = true;
    if(!this.submitted){

      const myInit = { 
        headers: {},
        response: true,
        queryStringParameters: {
        "Limit":"3"
      }
    };
      API.get('writerresource', `/writer/${this.username}`, myInit).then(response => {
        console.log(response);
        this.queryItems = response.data;
        this.queryLoaded = true;
      }).catch(error => console.log(error));

    }
    
  }

  public gotoform(){
    this.router.navigate(['form']);
  }

  ngOnInit() {
    Auth.currentUserInfo().then(info => {
      this.username = info["attributes"]["email"];
      // console.log(info);
    }).catch(err => console.log(err));
  }

}
