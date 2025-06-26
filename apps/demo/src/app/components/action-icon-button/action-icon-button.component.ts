import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-action-icon-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './action-icon-button.component.html',
  styleUrls: ['./action-icon-button.component.scss'],
})
export class ActionIconButtonComponent {
  @Input({ required: true }) icon!: string;
}
