import { Component, Input } from '@angular/core';
import {UpperCasePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [UpperCasePipe,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() organization: string = '';
  @Input() nameBusiness: string = '';
}
