import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { login } from '../../../../core/interfaces/login.interface';
import { GetChangesService } from '../../../../core/services/get-changes.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NzInputModule, NzButtonModule, NzIconModule, NzFormModule, NzCheckboxModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrected to styleUrls
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  passwordVisible = false;
  userForm!: FormGroup;
  fusuario!: string;
  froles!: string;
  fpassword!: string;
  ftoken!: string;
  remember!: boolean;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private consultaGetChanges: GetChangesService,
    private cookieService: CookieService,
    private message: NzMessageService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3),
      // cambio 1 para los criterios de login
      this.noEmailValidator()
      ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [this.remember]
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    sessionStorage.clear();
    this.getRememberUser()
  }

    // CAMBIO 2 para recharzar correos de al login
  noEmailValidator() {
    return (control: any) => {
      const value = control.value;
      if (!value) return null;
      
      // aqui detecto el @ aveces funciona aveces no
      if (value.includes('@')) {
        return { email: true };
      }
      return null;
    };
  }
  // tunki

  setRememberUser(): void {
    const { username, password, remember } = this.userForm.value;

    if (remember) {
      this.cookieService.set('username', username, 30);
    } else {
      this.cookieService.delete('username');
    }
  }

  getRememberUser(): void {
    const userCookie = this.cookieService.get('username');

    if (userCookie) {
      this.userForm.patchValue({
        username: userCookie,
        remember: true
      });
    } else {
      this.userForm.patchValue({
        username: '',
        remember: false
      });
    }
  }


  login() {
    // Valido que sea valido antes de enviar el uusario
    if (this.userForm.invalid) {
      if (this.userForm.get('username')?.hasError('email')) {
        this.message.error('Por favor ingrese su usuario de red, NO su correo haga caso');
        return;
      }
      this.message.error('Por favor');
      return;
    }
    //
    const { username, password, remember } = this.userForm.value;
    const login: login = {
      domain_user: username,
      domain_passwd: password
    };
    this.setRememberUser()
    this.consultaGetChanges.postlogin(login).subscribe({
      next: (response) => {
        response.forEach(obj => {
          this.froles = obj.roles
          this.ftoken = obj.token
        });
        if (this.froles.length > 1) {
          sessionStorage.clear();
          sessionStorage.setItem("fusuario", JSON.stringify(username));
          sessionStorage.setItem("fpassword", JSON.stringify(password));
          sessionStorage.setItem("froles", JSON.stringify(this.froles));
          sessionStorage.setItem("ftoken", JSON.stringify(this.ftoken));
          this.router.navigateByUrl('/homePage');
        }
      },
      error: (e) => {
        this.message.error(e.error.details)
      }
    });
  }
}
