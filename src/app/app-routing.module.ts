import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UsersPageComponent } from './features/users-table/users-page/users-page.component';
import { UserDetailsComponent } from './features/users-table/user-details/user-details.component';

const routes: Routes = [
  {path: '', component: UsersPageComponent},
  {path: 'users', component: UsersPageComponent},
  {path: 'users/edit', component: UserDetailsComponent},
  {path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {
}
