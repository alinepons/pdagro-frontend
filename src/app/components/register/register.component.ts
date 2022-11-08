import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { FullUser } from 'src/app/models/full-user';
import { UserService } from 'src/app/services/user.service';

export const confirmPasswordValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value ? null : { passwordsNotMatched: true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;

  faEnvelope = faEnvelope
  faLock = faLock
  faCheck = faCheck
  faUser = faUser

  model: FormGroup = this.fb.group({
    fullName: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]],
  }, { validators: confirmPasswordValidatior });

  get fullName(): AbstractControl { return this.model.get('fullName')! };
  get email(): AbstractControl { return this.model.get('email')! };
  get password(): AbstractControl { return this.model.get('password')! };
  get confirmPassword(): AbstractControl { return this.model.get('confirmPassword')! };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
    private userService: UserService) {}

  ngOnInit(): void {
  }

  insertUser() {
    this.submitted = true;

    if(!this.model.valid)
      return;

    this.userService.insert(new FullUser({
      fullName: this.model.get('fullName')?.value,
      username: this.model.get('email')?.value,
      email: this.model.get('email')?.value,
      password: this.model.get('password')?.value
    })).subscribe(() => {
      this.toast.success('Usuário registrado com sucesso.', 'Sucesso!');
      this.router.navigate(['auth/login']);
    });
  }

  goLogin() {
    this.router.navigate(['auth/login'])
  }

}
