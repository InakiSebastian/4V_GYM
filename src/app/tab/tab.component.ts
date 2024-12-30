import { Component, input } from '@angular/core';
import {UpperCasePipe } from '@angular/common';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-tab',
  imports: [UpperCasePipe,CommonModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {
nameTab = input("nameTab");
srcImage = input("foto.jpg");
withBorder = input(false);
}
