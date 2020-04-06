import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/slides/slides.module').then( m => m.SlidesPageModule)},
   { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},  {
    path: 'modal-info',
    loadChildren: () => import('./pages/modal-info/modal-info.module').then( m => m.ModalInfoPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
