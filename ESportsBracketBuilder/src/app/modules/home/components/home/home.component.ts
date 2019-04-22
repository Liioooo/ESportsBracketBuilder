import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {ThemingService} from '@shared/services/theming/theming.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('loginRegister', [
        transition('loginDesktop <=> registerDesktop, loginMobile => registerDesktop, registerMobile => loginDesktop', [
            query(':enter, :leave', style({ position: 'absolute', opacity: 1, width: '600px' })),
            group([
                query(':enter', [
                    style({ opacity: 0 }),
                    animate('300ms ease-in-out', style({ opacity: 1 }))
                ]),
                query(':leave', [
                    style({ opacity: 1 }),
                    animate('300ms ease-in-out', style({ opacity: 0 }))
                ]),
            ])
        ]),
        transition('loginMobile <=> registerMobile, loginDesktop => registerMobile, registerDesktop => loginMobile', [
            query(':enter, :leave', style({ position: 'absolute', opacity: 1, width: 'calc(100% - 32px)' })),
            group([
                query(':enter', [
                    style({ opacity: 0 }),
                    animate('300ms ease-in-out', style({ opacity: 1 }))
                ]),
                query(':leave', [
                    style({ opacity: 1 }),
                    animate('300ms ease-in-out', style({ opacity: 0 }))
                ]),
            ])
        ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  public loginRegister = 'login';
  public loginRegisterAnimationState = 'loginDesktop';

  @ViewChild('loginBox') loginBox: ElementRef<HTMLMainElement>;

  constructor(public themingService: ThemingService) { }

  ngOnInit() {
  }

  loginRegisterStateChanged(state: string) {
      this.loginRegister = state;
      if (this.loginBox.nativeElement.offsetWidth <= 589) {
          this.loginRegisterAnimationState = state + 'Mobile';
      } else {
        this.loginRegisterAnimationState = state + 'Desktop';
      }
  }

}
