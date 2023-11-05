import { Component, HostListener, Inject, OnInit, inject } from '@angular/core';
import { GetCharactersService } from '../services/characters.service';
import { Character } from '../interfaces/character';
import { DOCUMENT } from '@angular/common';

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

  seachKeyword: string = "";
  searchResults: Character[] = [];
  showResults: boolean = false;

  showButton = false; 
  scrollHeight = 500;

  constructor(public charactersService: GetCharactersService, @Inject(DOCUMENT) private document: Document){}


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


  searchCharacter(){

    if(this.seachKeyword.trim() !== ''){
      const searchedWord = this.seachKeyword.toLowerCase();
      this.searchResults = this.characters.filter((char) => char.name?.toLowerCase().includes(searchedWord));
      console.log(this.searchResults)
      this.showResults = true;

    }else {
      this.showResults = false;
    }
  }


  colorStatus(status?: string){
    switch(status){
      case "Alive":
        return 'lime';
      case "Dead":
        return 'red';
      case "unknown":
        return 'gray';
      default:
        return 'white';
    }
  }
  
  
  @HostListener('window:scroll')
  onWindowScroll():void {
    const yOffSet = window.scrollY;
    const scrollTop = this.document.documentElement.scrollTop
    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

}
