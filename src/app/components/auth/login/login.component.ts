import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /*---------- Define - Modal - Error credentials ----------*/
  @ViewChild('modalError', { static: false }) modalError: any;
  modalErrorRef?: NgbModalRef;

  /*---------- Define - Login form ----------*/
  public loginForm: FormGroup = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  });

  lang: any;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public translate: TranslateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    /*---------- Detect active session ----------*/
    if (localStorage.getItem('Token')) {
      this.router.navigate(['home']);
    }

    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    } else {
      this.lang = 'es';
    }
  }

  /*---------- Change Lang ----------*/
  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  /*---------- Login form observable ----------*/
  get loginFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.loginForm.controls;
  }

  /*---------- Set Login ----------*/
  login() {
    /*---------- Validate credentials ----------*/
    if (
      this.loginFormControls['UserName'].value == 'patata' &&
      this.loginFormControls['Password'].value == 'MrPotat0'
    ) {
      this.authService.login(this.loginForm.value).subscribe((res) => {
        let dataUser: any = res;
        localStorage.setItem('Token', dataUser.Token);
        this.router.navigate(['home']);
      });
    } else {
      this.openModalError();
    }
  }

  /*---------- Open - Modal - Error credentials ----------*/
  openModalError() {
    this.modalErrorRef = this.modalService.open(this.modalError, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
  }
}
