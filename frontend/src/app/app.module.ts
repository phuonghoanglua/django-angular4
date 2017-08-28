import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent, SafeHtmlPipe } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/guards.component';
import { MyDatePickerModule } from 'mydatepicker';
import { routing }        from './app.routing';
import { FormsModule } from "@angular/forms";
import { BaseRequestOptions, HttpModule} from "@angular/http";
import { AuthenticationService } from "./services/authentication.service";
import { PostService } from "./services/post.service";
import { AlertService } from "./services/alert.service";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from "./services/user.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular2-toaster';


@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    HomeComponent,
    LoginComponent,
    PostsComponent,
    RegisterComponent,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    ToasterModule,
    NgbModule.forRoot(),
    MyDatePickerModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    AlertService,
    UserService,
    AuthenticationService,
    PostService,
    ToasterService,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
