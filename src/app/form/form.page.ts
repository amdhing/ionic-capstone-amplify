import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, API } from 'aws-amplify';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})


export class FormPage implements OnInit {

  todo : FormGroup;
  username : string;
  smoke: boolean ;
  quote: number;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      age: ['', Validators.compose([
        Validators.nullValidator,
        Validators.required,
        Validators.pattern("^[0-9]+$"),
        Validators.min(3),
        Validators.max(121)
      ])],
      dob: [Date,Validators.compose([
      Validators.required,
      Validators.nullValidator,
    ])],
    smoker: this.smoke
    });
    this.smoke = false;
    }


   public notify() {
    if (this.smoke) {this.smoke = false}
    else { this.smoke = true };
    console.log("Toggled: "+ this.smoke ); 
  }
  public gobacktohome(){
    this.router.navigate(['home'])
  }

  getpksk() {
    const pk = this.username;
    const sk = "hello again";
    
    return {"pk": pk, "sk": sk};
  }
  
   logForm(){
    console.log(this.todo.value);
    const foo = API.post('writerresource', '/writer', {
      body: this.getpksk()}).then(response => {
        console.log(response);
        // Add your code here
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  
  ngOnInit() {
    Auth.currentUserInfo().then(info => {
      this.username = info["attributes"]["email"];
      console.log(info);
    }).catch(err => console.log(err));
  }

}
