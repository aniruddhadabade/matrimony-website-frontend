// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-userinfo-list',
//   templateUrl: './userinfo-list.component.html',
//   styleUrl: './userinfo-list.component.css'
// })
// export class UserinfoListComponent {

// }


import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../../services/userinfo.service';
import { UserInfo } from '../../models/user-info.model';

@Component({
  selector: 'app-userinfo-list',
  templateUrl: './userinfo-list.component.html',
  styleUrls: ['./userinfo-list.component.css']
})
export class UserinfoListComponent implements OnInit {

  users: UserInfo[] = [];

  constructor(private userInfoService: UserinfoService) { }

  ngOnInit(): void {
    this.userInfoService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }
}