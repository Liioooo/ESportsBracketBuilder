import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBracketComponent } from './single-bracket.component';

describe('SingleBracketComponent', () => {
  let component: SingleBracketComponent;
  let fixture: ComponentFixture<SingleBracketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBracketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
