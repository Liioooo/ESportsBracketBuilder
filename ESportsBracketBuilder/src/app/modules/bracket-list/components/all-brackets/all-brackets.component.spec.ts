import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBracketsComponent } from './all-brackets.component';

describe('AllBracketsComponent', () => {
  let component: AllBracketsComponent;
  let fixture: ComponentFixture<AllBracketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBracketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBracketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
