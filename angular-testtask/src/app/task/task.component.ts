// @ts-check

import {
  Component,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @ViewChild('passwordInput', { static: true })
  passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChildren('section') sections!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('redSection') redSection!: ElementRef<HTMLElement>;
  @ViewChild('yellowSection') yellowSection!: ElementRef<HTMLElement>;
  @ViewChild('greenSection') greenSection!: ElementRef<HTMLElement>;

  //

  input: HTMLInputElement | null = document.getElementById(
    'password'
  ) as HTMLInputElement;

  handleCheckPasswordStrength(): void {
    // const password = this.input.value;
    const password = this.passwordInput.nativeElement.value;
    const passwordStrength = this.calculatePasswordStrength(password);

    /**
  |============================
  | 1st option with single choose
  |============================
*/

    // switch (passwordStrength) {
    //   case 'easy':
    //     this.redSection.nativeElement.classList.add('red');
    //     break;
    //   case 'medium':
    //     this.yellowSection.nativeElement.classList.add('yellow');
    //     break;
    //   case 'strong':
    //     this.greenSection.nativeElement.classList.add('green');
    //     break;
    //   default:
    //     this.redSection.nativeElement.classList.remove('red');
    //     this.yellowSection.nativeElement.classList.remove('yellow');
    //     this.greenSection.nativeElement.classList.remove('green');
    //     break;
    // }

    /**
      |============================
      | 2sd option with multiple choose
      |============================
    */

    this.sections.forEach((section: ElementRef<HTMLElement>, index: number) => {
      const sectionElement = section.nativeElement;
      sectionElement.classList.remove('red', 'yellow', 'green');

      /**
  |============================
  | 1st option with multiple
  |============================
*/

      // Apply class based on password strength
      // switch (passwordStrength) {
      //   case 'easy':
      //     sectionElement.classList.add('red');
      //     break;
      //   case 'medium':
      //     sectionElement.classList.add('yellow');
      //     break;
      //   case 'strong':
      //     sectionElement.classList.add('green');
      //     break;
      //   default:
      //     break;
      // }

      /**
  |============================
  | 2nd option with multiple
  |============================
*/

      if (password.length < 8) {
        this.sections.forEach((section: ElementRef<HTMLElement>) => {
          const sectionElement = section.nativeElement;
          sectionElement.classList.add('red');
        });
      } else {
        switch (passwordStrength) {
          case 'easy':
            if (index === 0) {
              sectionElement.classList.add('red');
            }
            break;
          case 'medium':
            if (index <= 1) {
              sectionElement.classList.add('yellow');
            }
            break;
          case 'strong':
            sectionElement.classList.add('green');
            break;
          default:
            break;
        }
      }
    });
  }

  /**
    |============================
    | Choose strength - logic
    |============================
  */

  calculatePasswordStrength(
    password: string | number
  ): 'easy' | 'medium' | 'strong' | 'unknown' {
    const passwordString = password.toString();

    const hasLetters = /[a-zA-Z]/.test(passwordString);
    const hasDigits = /[0-9]/.test(passwordString);
    const hasSymbols = /[^a-zA-Z0-9]/.test(passwordString);

    if (
      (hasLetters && !hasDigits && !hasSymbols) ||
      (hasDigits && !hasLetters && !hasSymbols) ||
      (hasSymbols && !hasLetters && !hasDigits)
    ) {
      return 'easy';
    } else if (
      (hasLetters && !hasDigits && hasSymbols) ||
      (hasLetters && hasDigits && !hasSymbols) ||
      (!hasLetters && hasDigits && hasSymbols)
    ) {
      return 'medium';
    } else if (hasLetters && hasDigits && hasSymbols) {
      return 'strong';
    }

    return 'unknown';
  }
}
