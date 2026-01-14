import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';

import { User } from './model/user';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  

  private platformId = inject(PLATFORM_ID);
  private transferState = inject(TransferState);
  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    const stateKey = makeStateKey<User[]>('users-data');

    // Si estamos en el navegador, obtener del Transfer State
    if (isPlatformBrowser(this.platformId)) {
      const cachedData = this.transferState.get(stateKey, []);
      console.log('NAVEGADOR: Usando datos del Transfer State');
      this.transferState.remove(stateKey);
      return of(cachedData);
    } else {
      // Estamos en el servidor - hacer petición HTTP y guardar
      console.log('SERVIDOR: Haciendo petición HTTP');
      return this.http.get<any>('https://api.ejemplo.com/users').pipe(
        map((res: any) => {
          const data = ('data' in res ? res.data : res) as User[];
          console.log('SERVIDOR: Guardando en Transfer State');
          this.transferState.set(stateKey, data);
          return data;
        }),
        catchError(() => of([] as User[]))
      );
    }
  }
  }

  
}
