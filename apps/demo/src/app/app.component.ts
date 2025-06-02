import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  imports: [
    NxWelcomeComponent,
    CommonModule,
    MatButtonModule
  ],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'demo';
}
