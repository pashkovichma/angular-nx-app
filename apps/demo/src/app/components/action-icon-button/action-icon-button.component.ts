import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-action-icon-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './action-icon-button.component.html',
})
export class ActionIconButtonComponent {
  readonly icon = input<string>();
}
