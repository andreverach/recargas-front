import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/login/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formData!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) { 
    this.buildForm();
  }



  ngOnInit(): void {
  }
  
  private buildForm(){
    this.formData = this.formBuilder.group({
      fullname: ['',
        [
          Validators.required          
        ]
      ],
      password: ['',
        [
          Validators.required
        ]
      ]
    });    
  }
  //usuario: gamer
  //clave: gamer21.

  get fullnameField(){
    //return this.formData.get('fullname');
    return this.formData.controls['fullname'];
  }
  get passwordField(){
    //return this.formData.get('password');
    return this.formData.controls['password'];
  }
  /*login(event: Event) {
    event.preventDefault();
    const value = this.formData.value;
    //if(value.fullname=="gamer" && value.password=="gamer21."){
      if(this.formData.valid){
      this.authService.login(value.fullname, value.password)
      .then(() => {
        this.router.navigate(['/admin/inicio']);
      })
      .catch(() => {
        alert('no es valido');
      });
      }
  } 
  */
login(event: Event) {
    event.preventDefault();
    const value = this.formData.value;
    if(value.fullname=="gamer" && value.password=="gamer21."){
      this.router.navigate(['/admin/inicio']);
      console.log("accseso concedido");
      console.log(value.fullname);
    }
    else{
      console.log(value.fullname);
      alert("Credenciales invalidas");
    }
  }
}
