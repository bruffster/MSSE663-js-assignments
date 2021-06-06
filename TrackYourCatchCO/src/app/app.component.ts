import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TrackYourCatchCO';
  public loading = true;
  constructor() {
  }

  async ngOnInit(): Promise<void> {
  }
}
