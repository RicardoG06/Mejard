import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

declare var jQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any ={};
  public usuario : any = {};
  public token : any = '';
  
  constructor(
    private _clienteService:ClienteService,
    private _router:Router) {
      this.token = this._clienteService.getToken();
}

  ngOnInit(): void {
    console.log(this.token);
    if(this.token){
      this._router.navigate(['/']);
    }else{
      //Se mantiene en competencia
    }
  }

  login(loginForm:any){
    if(loginForm.valid){
      console.log(this.user);

      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._clienteService.login_cliente(data).subscribe(
        response=>{
          if(response.data == undefined){
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topCenter',
              message: response.message
            });
          }else{
            this.usuario = response.data;

            localStorage.setItem('token',response.token);
            localStorage.setItem('_id' , response.data._id);

            this._router.navigate(['/']);
          }
        },
        error=>{
          console.log(error);
        }
        )
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topCenter',
        message: 'Los datos del formulario no son validos'
      });
    }
    }
  }

