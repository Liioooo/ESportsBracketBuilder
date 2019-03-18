import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {BracketsService} from '@shared/services/brackets/brackets.service';

@Component({
  selector: 'app-new-bracket-modal',
  templateUrl: './new-bracket-modal.component.html',
  styleUrls: ['./new-bracket-modal.component.scss']
})
export class NewBracketModalComponent implements OnInit, OnDestroy {

  private hasSubmitted = false;
  private newBracketForm: FormGroup;

  private playerAmountSubscription: Subscription;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private bracketsService: BracketsService) { }

  ngOnInit() {
    this.newBracketForm = this.formBuilder.group({
      name: ['', Validators.required],
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
      items.push(this.formBuilder.control('', Validators.required));
    }
  }

  submitForm() {
    this.hasSubmitted = true;
    if (this.newBracketForm.invalid) {
      return;
    }
    const name = this.newBracketForm.controls.name.value;

    const playerNamesFormArray = this.newBracketForm.get('players') as FormArray;
    const playerNames = [];
    playerNamesFormArray.controls.forEach(playerControl => playerNames.push(playerControl.value));

    this.bracketsService.createBracket(name, playerNames).subscribe(error => {
      if (error) {
        this.newBracketForm.controls.name.setErrors({hasBracketWithName: true});
      } else {
        this.activeModal.close('added');
      }
    });
  }

  ngOnDestroy() {
    this.playerAmountSubscription.unsubscribe();
  }



}
