import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentsPageComponent } from './pages/contents-page/contents-page.component';
import { TextPageComponent } from './pages/text-page/text-page.component';
import { HeaderComponent } from './components/structure/header/header.component';
// Used to display the dialogs to show the translation of words
import {MatDialogModule} from '@angular/material/dialog';
// Used for buttons
import {MatButtonModule} from '@angular/material/button';
// Used to display material icons
import {MatIconModule} from '@angular/material/icon';
import { ShowTranslationDialogComponent } from './components/dialogs/show-translation-dialog/show-translation-dialog.component';
import { WordListComponent } from './components/content/word-list/word-list.component';
import { PrintWordsPageComponent } from './pages/print-words-page/print-words-page.component';
import { HttpClientModule } from '@angular/common/http';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { BookContainerComponent } from './components/content/book-container/book-container.component';
@NgModule({
  declarations: [
    AppComponent,
    ContentsPageComponent,
    TextPageComponent,
    HeaderComponent,
    ShowTranslationDialogComponent,
    TextPageComponent,
    WordListComponent,
    PrintWordsPageComponent,
    StartPageComponent,
    BookContainerComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
