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
  quote: number;
  submitted: boolean = false;
  policyDuration: any;
  age: any;

  

  sexes: any = [
    { value: 'Male', viewValue: "Male" },
    { value: 'Female', viewValue: "Female" }
  ];

  smoker: any = [
    { value: 'Yes', viewValue: "Yes" },
    { value: 'No', viewValue: "No" }
  ];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.todo = this.formBuilder.group({
      // title: ['', Validators.required],
      policyDuration: ['', Validators.compose([
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
    smoke: ['', Validators.required],
    gender: ['', Validators.required]
    });
    
    }

    public calculateAge(birthday) { // birthday is a date
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

    public logout(){
      Auth.signOut().then(res=>{
        this.router.navigate(['']);
      })};


  public gobacktohome(){
    this.router.navigate(['home'])
  }

  getPutPayload() {
    const pk = this.username;
    const sk = "hello again";
    const age = this.age;
    const duration = this.policyDuration;
    const smoke = this.todo.value['smoke'];
    const gender = this.todo.value['gender'];
    return {"pk": pk,
            "sk": sk,
            "age": age,
            "duration": duration,
            "smoke": smoke,
            "gender": gender};
  }
  
   logForm(){
    console.log(this.todo.value);
    this.policyDuration = this.todo.value["policyDuration"] ;
    this.age = this.calculateAge(new Date(this.todo.value["dob"]));

    API.post('writerresource', '/writer', {
      body: this.getPutPayload()}).then(response => {
        console.log(response);
        this.submitted = true;
        this.quote = response.data.quote;
        // this.todo.reset();
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

  ionViewWillEnter(){
    this.submitted = false;
  }
  ionViewWillLeave(){
    this.todo.reset();
  }

}
