import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})

export class CourseCreateComponent implements OnInit {  
  submitted = false;
  courseForm: FormGroup;
  CourseProfile:any = ['Web dev','intergiciel','Andriod','Base de donne']
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      module: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  // Choose module with select dropdown
  updateProfile(e){
    this.courseForm.get('module').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.courseForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.courseForm.valid) {
      return false;
    } else {
      this.apiService.createCourse(this.courseForm.value).subscribe(
        (res) => {
          console.log('Course successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/courses-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}