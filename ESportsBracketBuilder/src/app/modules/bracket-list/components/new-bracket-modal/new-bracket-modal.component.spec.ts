import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBracketModalComponent } from './new-bracket-modal.component';

describe('NewBracketModalComponent', () => {
  let component: NewBracketModalComponent;
  let fixture: ComponentFixture<NewBracketModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBracketModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBracketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
