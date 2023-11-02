import { Component, OnInit } from '@angular/core';
import { GetCharactersService } from '../services/characters.service';
import { Character } from '../interfaces/character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit{

  characterData: any;
  characters: Character[] = [];
  totalCharacters: number = 0;

  throttle = 500;
  distance = 2;
  page = 1;

  constructor(public charactersService: GetCharactersService){}


  ngOnInit(): void {
    this.charactersService.getCharacters(this.page)
    .subscribe(response => {
      this.characterData = response;
      this.totalCharacters = this.characterData.info.count;
      this.characters = this.characterData.results;

    })

  }


  onScroll(): void {

    if(this.characters.length < this.totalCharacters){
      
      this.charactersService.getCharacters(++this.page)
      .subscribe((response: any) => {
        const newCharacters = response.results;
        this.characters.push(...newCharacters);

      })
    }
  }



}
