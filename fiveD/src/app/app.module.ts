import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ListComponent } from './moment/list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AddComponent } from './moment/add/add.component';
import { EditComponent } from './moment/edit/edit.component';
import { HeaderComponent } from './layout/header/header.component';
import { FontAwesomeModule,FaIconLibrary } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule,HttpClientModule,ToastrModule.forRoot(),BrowserAnimationsModule,FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
