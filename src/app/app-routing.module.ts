import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './userDetails/login/login.component';
import { RegisterComponent } from './userDetails/register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './mainAbout/about/about.component';
import { ForgotpasswordComponent } from './userDetails/forgotpassword/forgotpassword.component';
import { ServiceComponent } from './websiteServices/service/service.component';
import { environment } from '../environments/environment.development';
import { VerifyEmailComponent } from './userDetails/verify-email/verify-email.component';
import { StartingComponent } from './starting/starting.component';
import { LoginButtonComponent } from './userDetails/login-button/login-button.component';
import { UserInfoComponent } from './userDetails/user-info/user-info.component';
import { PersonalInfoComponent } from './userDetails/personal-info/personal-info.component';
import { EduInfoComponent } from './userDetails/edu-info/edu-info.component';
import { FamilyInfoComponent } from './userDetails/family-info/family-info.component';
import { ContactComponent } from './contactt/contact/contact.component';
import { About1Component } from './mainAbout/about1/about1.component';
import { Service1Component } from './websiteServices/service1/service1.component';
import { Contact1Component } from './contactt/contact1/contact1.component';
import { GroomInformationComponent } from './websiteServices/groom-information/groom-information.component';
import { ResetPasswordComponent } from './userDetails/reset-password/reset-password.component';
import { AdminComponent } from './Admin Components/admin/admin.component';
import { LocationBookingComponent } from './location-booking/location-booking.component';
import { GroomsComponent } from './websiteServices/grooms/grooms.component';
import { BridesComponent } from './websiteServices/brides/brides.component';
import { BrideInformationComponent } from './websiteServices/bride-information/bride-information.component';
import { DifferentiatorComponent } from './websiteServices/differentiator/differentiator.component';
import { ChatComponent } from './websiteServices/chat/chat.component';
import { MessageDataComponent } from './Admin Components/message-data/message-data.component';
import { ContactDataComponent } from './Admin Components/contact-data/contact-data.component';
import { RegistrationDataComponent } from './Admin Components/registration-data/registration-data.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginButtonComponent },
  { path: 'home', component: HomeComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'about', component: AboutComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path : 'about1' , component : About1Component},
  { path : 'service1' , component : Service1Component},
  { path : 'contact1' , component : Contact1Component},
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'user/:userName', component: UserInfoComponent },
  { path: 'personal/:userName', component: PersonalInfoComponent },
  { path: 'edu/:userName', component: EduInfoComponent },
  { path: 'family/:userName', component: FamilyInfoComponent },
  { path: 'grooms/groom-info', component: GroomInformationComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'reset/:userName', component: ResetPasswordComponent},
  { path: 'login', redirectTo: '/login', pathMatch: 'full' },
  { path: 'grooms', component: GroomsComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'location-booking', component: LocationBookingComponent},
  { path: 'brides', component: BridesComponent},
  { path: 'brides/bride-info', component: BrideInformationComponent},
  { path: 'page', component: DifferentiatorComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'message', component: MessageDataComponent},
  { path: 'admin/contactinfo', component: ContactDataComponent},
  { path: 'admin/registrationinfo', component: RegistrationDataComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
