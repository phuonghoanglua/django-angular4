import {Component, NgModule, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/index';
import { ToasterService } from 'angular2-toaster'


@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
    model: any = {};
    loading = false;
    error: any = {};
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: ToasterService) { }

    ngOnInit() {
        this.alertService.pop('Welcome to register page !');
    }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.pop('Registration successful !');
                    setTimeout(() =>{
                      this.router.navigate(['/login']);
                    }, 2000)
                },
                error => {
                    this.error = error.json();
                    this.loading = false;
                });
    }
 }


