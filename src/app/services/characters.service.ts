import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class GetCharactersService {

  baseUrl = 'https://rickandmortyapi.com/api/character/?page=';

  constructor(private httpClient: HttpClient) { }


  getCharacters(page: number): Observable<Character[]>{

    return this.httpClient.get(this.baseUrl + page.toString()) as Observable<Character[]>;
  }


}
