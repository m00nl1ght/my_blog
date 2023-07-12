import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs';
import {
  UserData,
  UserService,
} from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  filterValue: string = '';
  dataSource: UserData | null = null;
  displayedColums: string[] = ['id', 'name', 'username', 'email', 'role'];
  pageEvent: PageEvent | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.userService
      .findAll(1, 10)
      .pipe(map((userData: UserData) => (this.dataSource = userData)))
      .subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    if (!this.filterValue) {
      page = page + 1;

      this.userService
        .findAll(page, size)
        .pipe(map((userData: UserData) => (this.dataSource = userData)))
        .subscribe();
    } else {
      this.userService
        .paginateByName(page, size, this.filterValue)
        .pipe(map((userData: UserData) => (this.dataSource = userData)))
        .subscribe();
    }
  }

  findByName(username: string) {
    this.userService
      .paginateByName(0, 10, username)
      .pipe(map((userData: UserData) => (this.dataSource = userData)))
      .subscribe();
  }
}
