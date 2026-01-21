import { inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Character, CharactersResponse } from './model/character';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DragonballService {

  private platformId = inject(PLATFORM_ID);
  private transferState = inject(TransferState);
  private http = inject(HttpClient);
  
  private apiUrl = 'https://dragonball-api.com/api/characters';

  getCharacters(): Observable<Character[]> {
    const stateKey = makeStateKey<Character[]>('characters-data');

    // Si estamos en el navegador, obtener del Transfer State
    if (isPlatformBrowser(this.platformId)) {
      const cachedData = this.transferState.get(stateKey, []);
      console.log('NAVEGADOR: Usando datos del Transfer State');
      this.transferState.remove(stateKey);
      return of(cachedData);
    } else {
      // Estamos en el servidor - hacer petición HTTP y guardar
      console.log('SERVIDOR: Haciendo petición HTTP a Dragon Ball API');
      return this.http.get<CharactersResponse>(this.apiUrl).pipe(
        map((res) => {
          const data = res.items; // Extraemos solo el array de personajes
          console.log('SERVIDOR: Guardando en Transfer State');
          this.transferState.set(stateKey, data);
          return data;
        }),
        catchError(() => of([]))
      );
    }
  }

}
