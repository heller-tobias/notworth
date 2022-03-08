import { Directive } from '@angular/core';
import {
  Validator,
  NG_VALIDATORS,
  ValidatorFn,
  FormControl,
} from '@angular/forms';

@Directive({
  selector: '[appNoFutureDateValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: NoFutureDateValidatorDirective,
      multi: true,
    },
  ],
})
export class NoFutureDateValidatorDirective implements Validator {
  validator: ValidatorFn;
  constructor() {
    this.validator = this.dateValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  dateValidator(): ValidatorFn {
    return (control: any) => {
      if (control.value != null && control.value !== '') {
        const maxDate = new Date();
        maxDate.setHours(24, 0, 0, 0);
        if (new Date(control.value) < maxDate) {
          return null;
        } else {
          return { nofuturedatevalidator: { valid: false } };
        }
      } else {
        return null;
      }
    };
  }
}
