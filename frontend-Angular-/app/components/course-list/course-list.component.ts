import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})

export class CourseListComponent implements OnInit {
  
  Course:any = [];

  constructor(private apiService: ApiService) { 
    this.readCourse();
  }

  ngOnInit() {}

  readCourse(){
    this.apiService.getCourses().subscribe((data) => {
     this.Course = data;
    })    
  }

  removeCourse(course, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteCourse(course._id).subscribe((data) => {
          this.Course.splice(index, 1);
        }
      )    
    }
  }

}