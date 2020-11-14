import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-container',
  templateUrl: './book-container.component.html',
  styleUrls: ['./book-container.component.sass']
})
export class BookContainerComponent implements OnInit {
  @Input() title = '';
  @Input() bookIcon = '';
  constructor() { }

  ngOnInit(): void {
  }

}
