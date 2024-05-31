import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PersonalInfoService } from '../../services/personal-info.service';
import { FamillyInfoService } from '../../services/familly-info.service';
import { EducationInfoService } from '../../services/education-info.service';
import { UserinfoService } from '../../services/userinfo.service';
import { userAgent } from 'next/server';
@Component({
  selector: 'app-brides',
  templateUrl: './brides.component.html',
  styleUrl: './brides.component.css'
})
export class BridesComponent implements OnInit{
  personalInfo: any = [];
  users: any = [];
  educationInfo: any = [];
  familyInfo: any = [];

  constructor(
    private userService: UserinfoService,
    private educationCareerService: EducationInfoService,
    private familyInfoService: FamillyInfoService,
    private personalInfoService: PersonalInfoService,
    private router : Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    personalInfos: this.personalInfoService.getAllPersonalInfo()
    

    forkJoin({
      userInfo: this.userService.getAllUser(), 
      educationCareers: this.educationCareerService.getAllEducation(),
      familyInfos: this.familyInfoService.getAllFamily(),
      personalInfos: this.personalInfoService.getAllPersonalInfo()
    }).subscribe(({ userInfo, educationCareers, familyInfos, personalInfos }) => {
      this.users = userInfo.filter(userInfo => userInfo.gender === 'Female').map(user => {
        console.log(educationCareers)
        const educationCareer = educationCareers.find(ec => ec.registration.rid === user.registration.rid);
        const familyInfo = familyInfos.find(fi => fi.registration.rid === user.registration.rid);
        const personalInfo = personalInfos.find(pi => pi.registration.rid === user.registration.rid);
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          email: user.registration.email,
          educationCareer: {
            educationLevel: educationCareer?.educationLevel || 'Not available',
            educationFiled: educationCareer?.educationFiled || 'Not available'
          },
          familyInfo: {
            familyStatus: familyInfo?.familyStatus || 'Not available',
            familyType: familyInfo?.familyType || 'Not available',
            fatherName: familyInfo?.fatherName || 'Not available'
          },
          personalInfo: personalInfo || null
        };
      });
    });
  }

  viewDetails(user: any): void {
    this.router.navigate(['brides/bride-info'], {
      state: { user }
    });
}
}
