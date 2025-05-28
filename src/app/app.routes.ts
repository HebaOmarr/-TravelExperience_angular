import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeMoviesComponent } from './home-movies/home-movies.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SearchComponent } from './search/search.component';

import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { authGuard } from './guards/auth.guard';
import { loggedGuard } from './guards/logged.guard';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TvShowComponent } from './tv-show/tv-show.component';
import { AddMovieComponent } from './DashBoard/add-movie/add-movie.component';
import { EditComponentComponent } from './DashBoard/edit-component/edit-component.component';
import { MovieManagerComponent } from './DashBoard/movie-manager/movie-manager.component';


export const routes: Routes = [

  {path: '' , component:AuthLayoutComponent, canActivate:[loggedGuard] ,children:[
    {path : '', redirectTo:'movies', pathMatch:'full'},
    {path : 'movies', component:MovieListComponent},
    {path :'login', component:LoginComponent},
    {path : 'register', component:RegisterComponent},
    {path:'forgetPassword', component:ForgetPasswordComponent}
  ]},
  {path: '', component:BlankLayoutComponent,canActivate:[authGuard], children:[
    {path : '', redirectTo:'home', pathMatch:'full'},
    {path:'home', component:HomeMoviesComponent},
    {path:'wishlist', component:WishlistComponent},
    {path:'search', component:SearchComponent},
    { path: 'movie-details/:id', component: MovieDetailsComponent } ,
    
    {path:'tv', component:TvShowComponent},
    {path: 'tv-details/:id', component: MovieDetailsComponent } ,

  ]},
{path: 'AddMovie', component: AddMovieComponent}, 
{path: 'EditMovie/:id', component: EditComponentComponent}, 
{path: 'AdminDashboard', component: MovieManagerComponent}, 
  {path:'**', component:NotFoundComponent}
];