import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { ContinuationRegisterComponent } from '../continuation-register/continuation-register.component';

import { PoAvatarModule, PoButtonModule, PoContainerModule, PoDividerModule, PoFieldModule, PoLoadingModule, PoTabsModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [
    LoginComponent,
    ContinuationRegisterComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    PoLoadingModule,
    PoButtonModule,
    PoDividerModule,
    PoFieldModule,
    PoTabsModule,
    PoContainerModule,
    PoAvatarModule 
  ]
})
export class LoginModule { }
