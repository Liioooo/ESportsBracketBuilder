import {Component, Input, OnInit} from '@angular/core';
import {Game} from '@shared/models/Game';
import {BracketService} from '@shared/services/bracket/bracket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public currentlySettingResult = false;

  public player1Points: number;
  public player2Points: number;

  @Input()
  game: Game;

  constructor(private bracketService: BracketService) { }

  ngOnInit() {
  }

  setResultClick() {
    this.currentlySettingResult = true;
  }

  saveResult() {
    this.bracketService.setGameResult(this.game.id, this.player1Points, this.player2Points);
  }

}
