import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bracket} from '@shared/models/Bracket';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BracketService {

  constructor(private http: HttpClient) { }

  public getBracket(bracketId: number): Observable<Bracket> {
    return this.http.post('/api/', {
        apiAction: 'getBracket',
        params: {
            bracketId
        }
    }).pipe(
        map(resp => resp['response'])
    );
  }
}
