import { Course } from './../../model/Course';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})

export class CourseEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  CourseData: Course[];
  CourseProfile: any = ['Web dev','intergiciel','Andriod','Base de donne']

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateCourse();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getCourse(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      module: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('module').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getCourse(id) {
    this.apiService.getCourse(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        module: data['module'],
        description: data['description'],
      });
    });
  }

  updateCourse() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      module: ['', [Validators.required]],
      description: ['', [Validators.required]]
      
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateCourse(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/courses-list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}