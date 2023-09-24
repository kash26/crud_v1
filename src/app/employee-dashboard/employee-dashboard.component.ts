import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeModel } from './employee.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  formValue!: FormGroup;
  employee: EmployeeModel = new EmployeeModel();
  data!: any;
  isAddButtonVisible: boolean = false;
  isUpdateButtonVisible: boolean = false;
  action!: string;

  constructor(private _fb: FormBuilder, private _api: ApiService) { }

  ngOnInit(): void {
    this.isAddButtonVisible = false;
    this.isUpdateButtonVisible = false;
    this.action = 'add';

    this.getEmployees();
    this.initForm();
  }

  initForm() {
    this.formValue = this._fb.group({
      id: [null],
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });
  }

  postEmployeeDetails() {
    this.isAddButtonVisible = true;
    this.isUpdateButtonVisible = false;
    this.action = 'add';

    this.employee.firstName = this.formValue.value.firstName;
    this.employee.lastName = this.formValue.value.lastName;
    this.employee.email = this.formValue.value.email;
    this.employee.mobile = this.formValue.value.mobile;
    this.employee.salary = this.formValue.value.salary;

    const employeeData = { ...this.formValue.value };
    delete employeeData.id; // Remove the id property

    this._api.postEmployee(employeeData)
      .subscribe((res: any) => {
        // alert("Employee Added Successfully");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getEmployees();
      },(err: any) => {
        alert("Sth went wrong");
      });
  }

  getEmployees() {
    this._api.getEmployee()
      .subscribe((res: any) => {
        this.data = res;
      });
  }

  deleteEmployee(row: any) {
    // Confirm with the user before deleting the employee.
    if (confirm("Are you sure you want to delete this employee?")) {
      this._api.deleteEmployee(row.id)
        .subscribe((res: any) => {
          alert("Employee Deleted");
          this.getEmployees();
        })
    }
  }

  onEdit(row: any) {
    this.action = 'edit';

    this.employee.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails() {

    this.employee.firstName = this.formValue.value.firstName;
    this.employee.lastName = this.formValue.value.lastName;
    this.employee.email = this.formValue.value.email;
    this.employee.mobile = this.formValue.value.mobile;
    this.employee.salary = this.formValue.value.salary;

    this._api.updateEmployee(this.employee, this.employee.id)
      .subscribe((res: any) => {
        alert("Employee Updated Successfully");
        let ref = document.getElementById('cancel');
        ref?.click();
        
        this.formValue.reset();
        this.getEmployees();
      },(err: any) => {
        alert("Sth went wrong");
      });
  }

  setToAdd() {
    this.formValue.reset();
    this.action = 'add';
  }
}
