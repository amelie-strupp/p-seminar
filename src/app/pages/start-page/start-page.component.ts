import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/constants/colors';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.sass']
})
export class StartPageComponent implements OnInit {
  // Used to change the header color
  Color = Color;
  constructor() { }

  ngOnInit(): void {
  }

}
