import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast:any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public cliente : any = {};

  constructor(
    private _clienteService: ClienteService,
    private _router: Router
  ) { 
    
  }

  ngOnInit(): void {
  }

  registro(registroForm:any) {
    if(registroForm.valid) {
      console.log(this.cliente);
      this._clienteService.registro_cliente(this.cliente).subscribe(
        response => {
          
          console.log(response);
          if(response.data == undefined){
            iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-success',
            position: 'topCenter',
            message: response.message
            });
          }else{
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topCenter',
              message: 'Se registro correctamente'
              });

            this._router.navigate(['/login']);

            }
        },
        error=>{
          console.log(error);
        }  
      );
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
