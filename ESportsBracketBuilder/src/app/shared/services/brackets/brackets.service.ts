import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {Bracket} from '@shared/models/Bracket';

@Injectable({
  providedIn: 'root'
})
export class BracketsService {

  private bracketListTriggerSubject = new Subject();

  constructor(private http: HttpClient) { }

  public createBracket(name: string, players: string[]): Observable<string> {
    const playersMapped = players.map(player => {
      return {name: player};
    });

    return this.http.post('/api/', {
        apiAction: 'createBracket',
        params: {
          bracketName: name,
          players: playersMapped
        }
    }).pipe(
        map(resp => resp['response']['error'])
    );
  }

  public allBrackets(): Observable<{id: number, name: string}[]> {
    return this.bracketListTriggerSubject.pipe(
        switchMap(_ => {
          return this.http.post('/api/', {
            apiAction: 'getBrackets',
            params: {}
          }).pipe(
              map(resp => resp['response']['brackets'])
          );
        })
    );
  }

  public updateBracketList() {
    this.bracketListTriggerSubject.next();
  }
}
