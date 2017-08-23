import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../services/index';

@Component({
  moduleId: module.id,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    error: any = {};
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    // ngOnInit() {
    //     // reset login status
    //     this.alertService.success('Welcome', true);
    // }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.error = error.json();
                    this.loading = false;
                });
    }
 }


