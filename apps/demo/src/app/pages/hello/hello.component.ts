import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '@translate';
@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule, LanguageSwitcherComponent, TranslateModule],
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss'],
})
export class HelloComponent {}
