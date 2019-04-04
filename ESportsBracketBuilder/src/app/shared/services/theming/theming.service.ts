import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {

  private html: HTMLHtmlElement = document.querySelector('html');
  private currentTheme: 'dark' | 'light' = 'dark';

  constructor() { }

  public switchTheme() {
    if (this.currentTheme === 'dark') {
      this.currentTheme = 'light';
      this.html.classList.remove('dark-theme');
      this.html.classList.add('light-theme');
    } else {
      this.currentTheme = 'dark';
      this.html.classList.remove('light-theme');
      this.html.classList.add('dark-theme');
    }
  }

  public get themeToSwichtTo(): string {
    if (this.currentTheme === 'dark') {
      return 'Light';
    } else {
      return 'Dark';
    }
  }
}
