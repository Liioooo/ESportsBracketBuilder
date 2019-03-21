import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';

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

  public updateBracketName(bracketId: number, newName: string): Observable<any> {
      return this.http.post('/api/', {
          apiAction: 'changeBracketName',
          params: {
              bracketId,
              newName
          }
      }).pipe(
          map(resp => resp['response']),
          filter(resp => !resp['error'])
      );
  }

  public deleteBracket(bracketId: number): Observable<any> {
      return this.http.post('/api/', {
          apiAction: 'deleteBracket',
          params: {
              bracketId,
          }
      }).pipe(
          map(resp => resp['response']),
          filter(resp => !resp['error'])
      );
  }

  public updateBracketList() {
    this.bracketListTriggerSubject.next();
  }
}
