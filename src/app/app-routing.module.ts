import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/tools/settings/settings.component';


const routes: Routes = [
  {path : "", component : HomeComponent},
  {path: "setting",component:SettingsComponent},
  {path : "profile/:id", component : ProfileComponent},

  
  {path : "**", component : HomeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule  { }
