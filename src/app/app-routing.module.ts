import { StartPageComponent } from './pages/start-page/start-page.component';
import { PrintWordsPageComponent } from './pages/print-words-page/print-words-page.component';
import { TextPageComponent } from './pages/text-page/text-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentsPageComponent } from './pages/contents-page/contents-page.component';


const routes: Routes = [
  // The level specifies how "deep" a component is in the website structure-> Used for an appropriate animation
  {path: 'start', component: StartPageComponent, data: {level: '0'}},
  {path: 'contents/:bookId', component: ContentsPageComponent, data: {level: '1'}},
  {path: 'book/:bookId/text/:textId', component: TextPageComponent, data: {level: '2'}},
  {path: 'print/:textId', component: PrintWordsPageComponent},
  {path: '**', redirectTo: '/start'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
