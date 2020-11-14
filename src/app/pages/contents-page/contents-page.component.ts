import { Book, books } from './../../static-data/bookData';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'src/app/constants/colors';
import { TeiConverterService } from 'src/app/services/tei-converter.service';

@Component({
  selector: 'app-contents-page',
  templateUrl: './contents-page.component.html',
  styleUrls: ['./contents-page.component.sass']
})
export class ContentsPageComponent implements OnInit {
  // Used to change the header color
  Color = Color;
  bookData: Book;
  bookId: string;
  textTitles: Array<string>;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private converter: TeiConverterService) {
    this.bookId = this.route.snapshot.params.bookId;
    this.bookData = books[this.bookId];
    this.textTitles = new Array(this.bookData.numberOfTexts)
    console.log(this.bookData);
    for (let i = 1; i <= this.bookData.numberOfTexts; i = i + 1){
      this.http.get(`assets/texts/book_${this.bookId}/text_${i}.xml`, { responseType: 'text' as 'text'}).subscribe(data => {
        this.textTitles[i - 1] = this.converter.convertTeiToObject(data).title;
        console.log(this.textTitles);
      });
    }
  }

  ngOnInit(): void {
  }

}
