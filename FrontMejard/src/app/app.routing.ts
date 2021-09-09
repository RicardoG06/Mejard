import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders} from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistroComponent } from "./components/login/registro/registro.component";

const appRoute : Routes =[
    {path: '', redirectTo : 'inicio',pathMatch: 'full'},
    {path: 'inicio', component: InicioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'login/registro', component: RegistroComponent}
]

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);