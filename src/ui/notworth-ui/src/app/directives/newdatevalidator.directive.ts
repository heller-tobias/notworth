import { Directive, forwardRef, Input } from '@angular/core';
import {
  Validator,
  NG_VALIDATORS,
  ValidatorFn,
  FormControl,
} from '@angular/forms';

@Directive({
  selector: '[appNewDateValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NewDateValidatorDirective),
      multi: true,
    },
  ],
})
export class NewDateValidatorDirective implements Validator {
  validator: ValidatorFn;

  @Input('appNewDateValidator') forbiddenDates: any = [];
  set setter(state: any) {
    this.forbiddenDates = state;
  }

  constructor() {
    this.validator = this.dateValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  dateValidator(): ValidatorFn {
    return (control: any) => {
      if (control.value != null && control.value !== '') {
        if (!this.forbiddenDates.includes(control.value)) {
          return null;
        } else {
          return { newdatevalidator: { valid: false } };
        }
      } else {
        return null;
      }
    };
  }
}
