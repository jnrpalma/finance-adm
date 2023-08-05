import { LocalstorageService } from './../../services/localstorage.service';
import { ApiService } from './../../services/api.service';
import { Component, Inject, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { FormValidations } from 'src/app/shared/validations/form-validation';
import { RegisterUser } from 'src/app/interfaces/registerUser';
import { PoNotificationService } from '@po-ui/ng-components';
@Component({
  selector: 'app-continuation-register',
  templateUrl: './continuation-register.component.html',
  styleUrls: ['./continuation-register.component.scss']
})
export class ContinuationRegisterComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  preview!: any
  isDefault = true;
  isDefaultImage = '../../../assets/images/default.png'
  destroy$: Subject<boolean> = new Subject<boolean>()
  max: number = 99;
  min: number = 16;
  messageErrorPattern: string = "teste";
  isHideLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private apiService: ApiService,
    private localStorageService: LocalstorageService,
    public poNotification: PoNotificationService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [this.data.data?.name, Validators.required],
      email: [this.data.data?.email, Validators.required],
      age: [this.data.data?.age, [Validators.required]],

      avatar: [null, [Validators.required]],
      password: [null, [Validators.required,]],
      confirmPassword: [null, [Validators.required, FormValidations.equalsTo('password')]],

    })
  }

  onChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.isDefault = false;
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = (e) => (this.preview = reader.result);
      reader.readAsDataURL(file);

      this.form.patchValue({
        avatar: file
      })
    }
  }

  createFormPayload(
    name = this.getValueControl(this.form, 'name'),
    email = this.getValueControl(this.form, 'email'),
    age = this.getValueControl(this.form, 'age'),
    image = this.getValueControl(this.form, 'avatar'),
    password = this.getValueControl(this.form, 'password'),
    confirmPassword = this.getValueControl(this.form, 'confirmPassword')) {

    const payload = {
      name,
      email,
      age,
      image,
      password,
      confirmPassword
    }
    return payload;
  }

  getValueControl(form: FormGroup, control: string) {

    return form.controls[control].value;
  }

  submit() {
    if (this.form.invalid) {
      this.poNotification.error('Preencha todos os campos obrigatórios corretamente.');
      return;
    }
  
    if (this.form.controls['avatar'].value === null) {
      this.poNotification.error('Selecione uma foto de perfil.');
      return;
    }
  
    if (this.isValidForm()) {
      this.apiService.registerUser(this.createFormPayload())
        .pipe(
          takeUntil(this.destroy$)
        ).subscribe((res: RegisterUser) => {
          console.log(res.message);
          this.localStorageService.setLocalStorage('userInfo', JSON.stringify(res.user));
          this.isHideLoading = false;
          this.poNotification.success(res.message);
          this.refreshPage();
        });
    }
  }
  

  isValidForm(): boolean {
    return this.form.valid;
  }

  refreshPage() {
    setTimeout(() => {
      location.reload();
    }, 3000)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
