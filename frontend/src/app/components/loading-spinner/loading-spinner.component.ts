import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  @Input() loading: boolean = false;

  faRotateRight = faRotateRight;
}
