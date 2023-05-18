import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  employeeForm !: FormGroup;
  actionBtn: string="save";
  topTitle: string="Add Employee Form";
  constructor(private formBuilder: FormBuilder, 
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef:MatDialogRef<DialogComponent>){

  }
  ngOnInit(): void{
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber:['', Validators.required],
      role:['',Validators.required],
      department:['',Validators.required],
      employment:['',Validators.required],
      salary:['',Validators.required],
      startDate:['', Validators.required]
    })

    if(this.editData){
      this.topTitle="Update Employee Form";
      this.actionBtn="Update";
      this.employeeForm.controls['name'].setValue(this.editData.name);
      this.employeeForm.controls['gender'].setValue(this.editData.gender);
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.employeeForm.controls['role'].setValue(this.editData.role);
      this.employeeForm.controls['department'].setValue(this.editData.department);
      this.employeeForm.controls['employment'].setValue(this.editData.employment);
      this.employeeForm.controls['salary'].setValue(this.editData.salary);
      this.employeeForm.controls['startDate'].setValue(this.editData.startDate);
    }
  }
  addEmployee(){
    if(!this.editData){
      if(this.employeeForm.valid){
        this.api.postEmployee(this.employeeForm.value)
        .subscribe({
          next:(res)=>{
            alert("add data successfully");
            this.employeeForm.reset();
            this.dialogRef.close('save')
          },
          error:()=>{
            alert("error hapend while add the data")
          }
        })
      }
    }
    else{
      this.updateEmployee()
    }
  }
  updateEmployee(){
this.api.putEmployee(this.employeeForm.value,this.editData.id)
.subscribe({
  next:(res)=>{
    alert("update data successfully");
    this.employeeForm.reset();
    this.dialogRef.close('update');
  },error:()=>{
    alert("error while update data")
  }
})
  }
}
