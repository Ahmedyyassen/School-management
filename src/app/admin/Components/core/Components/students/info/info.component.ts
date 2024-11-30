import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../Services/Students/student.service';
import { student } from '../../../../../../Shared/Interface/interface';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit{

  student! : student;

  constructor(private activeRouter : ActivatedRoute, private studentServices :StudentService ){}
  ngOnInit(): void {
    this.getStudent();
  }

  get studentID(): any {
    return this.activeRouter.snapshot.paramMap.get('id');
  }

  
  private getStudent(): void{
    console.log(this.studentID);

    this.studentServices.getById(this.studentID).subscribe(data =>{
      this.student = data;
    })
  }

}
