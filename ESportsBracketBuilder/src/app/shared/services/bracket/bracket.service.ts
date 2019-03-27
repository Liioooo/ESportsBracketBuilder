import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Bracket} from '@shared/models/Bracket';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BracketService {

  private currentBracketId: number;
  private currentBracket = new BehaviorSubject<Bracket>(null);

  constructor(private http: HttpClient) { }

  public getBracket(bracketId: number): Observable<Bracket> {
    this.currentBracket.next(null);
    this.currentBracketId = bracketId;
    this.http.post('/api/', {
        apiAction: 'getBracket',
        params: {
            bracketId
        }
    }).pipe(
        map(resp => resp['response'])
    ).subscribe(resp => this.currentBracket.next(resp));
    return this.currentBracket;
  }

  public setGameResult(gameId: number, player1Points: number, player2Points: number) {
      this.http.post('/api/', {
          apiAction: 'setGameResult',
          params: {
              bracketId: this.currentBracketId,
              gameId,
              player1Points,
              player2Points
          }
      }).pipe(
          map(resp => resp['response'])
      ).subscribe(resp => this.currentBracket.next(resp));
  }
}
