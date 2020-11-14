import { PunctationMark } from './../../classes/text-data';
import { Color } from './../../constants/colors';
import { colorsToTexts } from './../../static-data/colorsToTexts';
import { TeiConverterService } from './../../services/tei-converter.service';
import { ShowTranslationDialogComponent } from './../../components/dialogs/show-translation-dialog/show-translation-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TextData, Word } from 'src/app/classes/text-data';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text-page',
  templateUrl: './text-page.component.html',
  styleUrls: ['./text-page.component.sass']
})
export class TextPageComponent implements OnInit {
  // Set containing the indices of sentences that should be indented
  // Chose a set instead of an array, due to efficiency and easier API for removing
  indentedSentences: Set<number> = new Set();
  teiText = '';
  colorsToTexts = colorsToTexts;
  textColor: Color;
  textData: TextData = new TextData();
  // Used to change the header color
  // List of all the words that the user wants to memorize
  memorizedWordsList: Set<Word> = new Set();
  textId: string;
  bookId: string;
constructor(
  private dialog: MatDialog,
  private http: HttpClient,
  private route: ActivatedRoute,
  private converter: TeiConverterService) {
    this.textId = this.route.snapshot.paramMap.get('textId');
    this.bookId = this.route.snapshot.paramMap.get('bookId');
    this.textColor = colorsToTexts[parseInt(this.textId, 10) - 1];
    this.http.get(`assets/texts/book_${this.bookId}/text_${this.textId}.xml`, { responseType: 'text' as 'text'}).subscribe(data => {
      this.textData = this.converter.convertTeiToObject(data);
  });
    if (localStorage.getItem(`text_${this.textId}`)){
      const storedWords: Set<Word> = new Set();
      for (const word of JSON.parse(localStorage.getItem(`text_${this.textId}`))){
        storedWords.add(JSON.parse(word));
      }
      this.memorizedWordsList = storedWords;
    }
  }

ngOnInit(): void {
  }
showTranslation(word: Word): void{
    const dialogRef = this.dialog.open(ShowTranslationDialogComponent, { panelClass: 'translation-dialog-container' });
    const instance = dialogRef.componentInstance;

    // Pushing the data into the component
    instance.word = word;
    console.log(word);
    dialogRef.afterClosed().subscribe((result: Word) => {
      // If the dialog component returns a word this word should be memorized
      if (result){
        const newMemorizedWordsList = this.memorizedWordsList.add(result);
        this.memorizedWordsList = new Set(this.memorizedWordsList);
      }
    });
  }
  /**
   * Tests if a sentence is currently indented
   * @param sentenceIndex The index of the sentence that should be tested
   */
  isSentenceIndented(sentenceIndex: number): boolean{
    return this.indentedSentences.has(sentenceIndex);
  }
  indentSentence(sentenceIndex: number): void{
    this.indentedSentences.add(sentenceIndex);
  }
  hideIndention(sentenceIndex: number): void{
    this.indentedSentences.delete(sentenceIndex);
  }
  // Removes a word from the list of memorized words
  removeWordFromList(word: Word): void{
    this.memorizedWordsList.delete(word);
    const wordArray = [];
    for (const singleWord of this.memorizedWordsList){
      wordArray.push(JSON.stringify(singleWord));
    }
    localStorage.setItem(`text_${this.textId}`, JSON.stringify(wordArray));
  }

  testIfWord(wordOrPunctation: Word|PunctationMark): boolean{
    return wordOrPunctation instanceof Word;
  }
}
