import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  pokemen: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
    this.pokemen = ["Charizard", "Squirtle", "Bulbasaur"];
  }

}
