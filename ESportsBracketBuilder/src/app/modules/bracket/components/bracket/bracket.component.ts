import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Bracket} from '@shared/models/Bracket';
import {switchMap} from 'rxjs/operators';
import {BracketService} from '@shared/services/bracket/bracket.service';
import {AuthService} from '@shared/services/auth/auth.service';
import {ThemingService} from '@shared/services/theming/theming.service';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {

  public bracket$: Observable<Bracket>;

  constructor(
      private route: ActivatedRoute,
      private bracketService: BracketService,
      private authService: AuthService,
      public themeService: ThemingService
  ) { }

  ngOnInit() {
    this.bracket$ = this.route.params.pipe(
      switchMap(params => {
        return this.bracketService.getBracket(params['id']);
      })
    );
  }

  logoutClick() {
    this.authService.logout();
  }

  calculateGridXPos(roundInBracket: number, positionInRound: number): number {
    return (roundInBracket === 0 ? 1 : (2 ** roundInBracket)) * (positionInRound * 2 + 1);
  }

}
