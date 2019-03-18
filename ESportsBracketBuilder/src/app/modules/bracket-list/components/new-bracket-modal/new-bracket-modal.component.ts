import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-bracket-modal',
  templateUrl: './new-bracket-modal.component.html',
  styleUrls: ['./new-bracket-modal.component.scss']
})
export class NewBracketModalComponent implements OnInit, OnDestroy {

  private newBracketForm: FormGroup;

  private playerAmountSubscription: Subscription;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newBracketForm = this.formBuilder.group({
      name: [''],
      playerAmount: [''],
      players: this.formBuilder.array([])
    });
    this.newBracketForm.controls['playerAmount'].setValue('4');
    this.setPlayerAmount(4);
    this.playerAmountSubscription = this.newBracketForm.controls['playerAmount'].valueChanges.subscribe(val => this.setPlayerAmount(val));
  }

  setPlayerAmount(amount: number) {
    const items = this.newBracketForm.get('players') as FormArray;
    while (items.length !== 0) {
      items.removeAt(0);
    }
    for (let i = 0; i < amount; i++) {
      items.push(this.createPlayerInput());
    }
  }

  private createPlayerInput(): FormGroup {
    return this.formBuilder.group({
      playerName: ['']
    });
  }

  submitForm() {

  }

  ngOnDestroy() {
    this.playerAmountSubscription.unsubscribe();
  }



}
