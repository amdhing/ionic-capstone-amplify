import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { API, Auth } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username : string;
  constructor(private router: Router) {}

  public logout(){
    Auth.signOut().then(res=>{
      this.router.navigate(['']);
    })
  }

  public getQuoteHistory(){
    const myInit = { 
      response: true,
      queryStringParameters: {
      'pk': 'byPrice'
    }
  };
    API.get('writerresource', '/writer', myInit).then(response => {
      console.log(response);
    }).catch(error => console.log(error));
  }

  public gotoform(){
    this.router.navigate(['form']);
  }

  ngOnInit() {
    Auth.currentUserInfo().then(info => {
      this.username = info["attributes"]["email"];
      console.log(info);
    }).catch(err => console.log(err));
  }

}
