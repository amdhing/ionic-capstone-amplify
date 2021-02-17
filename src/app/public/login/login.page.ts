import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { FormFieldTypes } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  title = 'ionic-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  formFields: FormFieldTypes;
  
  constructor(private ref: ChangeDetectorRef,private router: Router) { 
    this.formFields = [
      {
        type: "username",
        label: "Email address",
        placeholder: "capstone@amazon.com",
        required: true,
      },
      {
        type: "email",
        label: "Re-type Email address",
        placeholder: "capstone@amazon.com",
        required: true,
      },
      {
        type: "password",
        label: "Password",
        placeholder: "********",
        required: true,
      }
    ];
  }

  ngOnInit() {

    onAuthUIStateChange((authState, authData) => {
      
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      console.log(authState, this.user);
      if(this.user && this.authState=="signedin"){
        this.router.navigate(['home'])
      }
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }

}
