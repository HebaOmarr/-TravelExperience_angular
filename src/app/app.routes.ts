import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MockhomeComponent } from './components/mockhome/mockhome.component';
import { authGuard } from './Core/guards/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    {
        path:'home',
        component:MockhomeComponent,
        canActivate:[authGuard]
    },
{
    path:'register',
    component:RegisterComponent
},
{
path:'login',
    component:LoginComponent
},
{
path:'about',
    component:AboutComponent
},
{
path:'contact',
    component:ContactComponent
},
{
    path: '**',
    component: MockhomeComponent
  },

];
