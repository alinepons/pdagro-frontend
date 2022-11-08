import { Component, OnInit } from '@angular/core';
import { faBriefcase, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FullUser } from 'src/app/models/full-user';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enterprise-register',
  templateUrl: './enterprise-register.component.html',
  styleUrls: ['./enterprise-register.component.css']
})
export class EnterpriseRegisterComponent implements OnInit {
  
  submitted: boolean = false;

  faBriefcase = faBriefcase;
  faCheck = faCheck;
  
  model: FormGroup = this.fb.group({
    fullName: [null, [Validators.required]],
  });

  get fullName(): AbstractControl { return this.model.get('fullName')! };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
    private userService: UserService) {}


  ngOnInit(): void {
  }

  insertEnterprise() {
    this.submitted = true;

    if(!this.model.valid)
      return;
    
    this.userService.insert(new FullUser({
      fullName: this.model.get('fullName')?.value
    })).subscribe(() => {
      this.toast.success('Empresa registrada com sucesso.','Sucesso!');
      this.router.navigate(['auth/']);
    });
  }

}
