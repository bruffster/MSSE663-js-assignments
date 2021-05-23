import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  pokemen$!: Observable<any>;
  pokemon:any;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemen$ = this.pokemonService.getAllPokemon();
  }

}
