import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Bracket} from '@shared/models/Bracket';
import {switchMap} from 'rxjs/operators';
import {BracketService} from '@shared/services/bracket/bracket.service';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {

  public bracket$: Observable<Bracket>;

  constructor(private route: ActivatedRoute, private bracketService: BracketService) { }

  ngOnInit() {
    this.bracket$ = this.route.params.pipe(
      switchMap(params => {
        return this.bracketService.getBracket(params['id']);
      })
    );

    this.bracket$.subscribe(console.log);
  }

}
