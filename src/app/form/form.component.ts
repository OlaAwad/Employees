import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { EmployeesService } from '../services/employees.service'
import { Employee } from '../../app/employee'
import { initializeApp } from 'firebase/app'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  emptyEmp: Employee = {
    id: '',
    code: '',
    name: '',
    department: '',
    hiringDate: new Date(),
    nationalID: 0,
    email: '',
    manager: '',
    mobile: 0,
    isEditable: false,
  }

  employeeObJ = this.employeesService._employeeOBJData$
  empForm!: FormGroup
  employeeCode: string = ''
  employeeName: any = ''
  employeeHiringDate: Date | undefined
  employeeNationalID: number | undefined
  employeeEmail: string = ''
  employeeDepartment: any
  employeeManager: string = ''
  employeeMobile: number | undefined
  formGroup: any
 

  constructor(
    public employeesService: EmployeesService,
    public _AngularFirestore: AngularFirestore,
    public translate: TranslateService
  ) {
    this.formGroup = new FormGroup({
      dropdown: new FormControl(this.employeeDepartment),
      dropdownM: new FormControl(this.employeeManager),
    })
  }

  app = initializeApp({
    apiKey: 'AIzaSyDJnOb4qfucnWQAtb_RkOV-73eJyUTwQM4',
    authDomain: 'employees-74859.firebaseapp.com',
    projectId: 'employees-74859',
    storageBucket: 'employees-74859.appspot.com',
    messagingSenderId: '68625372643',
    appId: '1:68625372643:web:2b24d059b9a7e6d90cbcd6',
    measurementId: 'G-MD4TC9WP30',
  })

  //Department Dropdown:
  select(value: string) {
    this.formGroup.get('dropdown')?.setValue(value)
    this.employeeDepartment = value
  }

  //Manager Dropdown:
  selectManager(val: string) {
    this.formGroup.get('dropdownM')?.setValue(val)
    this.employeeManager = val
  }

 
  createRecord() {
    let record: any = {}
    record['code'] = this.empForm.controls['employeeCode'].value
    record['name'] = this.empForm.controls['employeeName'].value
    record['department'] = this.empForm.controls['employeeDepartment'].value
    record['hiringDate'] = this.empForm.controls['employeeHiringDate'].value
    record['nationalID'] = this.empForm.controls['employeeNationalID'].value
    record['email'] = this.empForm.controls['employeeEmail'].value
    record['manager'] = this.empForm.controls['employeeManager'].value
    record['mobile'] = this.empForm.controls['employeeMobile'].value

    console.log('empForm', this.empForm.controls['employeeDepartment'].value)
    console.log('record', record)
    this.employeesService.createNewEmployee(record).then((res) => {
        this.resetForm()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  resetForm() {
    this.employeesService._employeeOBJData.next(this.emptyEmp)
    this.empForm.markAsUntouched();

  }

 
  //Update record:
  emp: AngularFirestoreDocument<any>
  updateRecord(record: any) {
    this.emp = this._AngularFirestore.doc('Employee')
    this.emp.update({
      code: this.empForm.controls['employeeCode'].value,
      name: this.empForm.controls['employeeName'].value,
      department: this.empForm.controls['employeeDepartment'].value,
      hiringDate: this.empForm.controls['employeeHiringDate'].value,
      nationalID: this.empForm.controls['employeeNationalID'].value,
      email: this.empForm.controls['employeeEmail'].value,
      manager: this.empForm.controls['employeeManager'].value,
      mobile: this.empForm.controls['employeeMobile'].value,
  })
  }

  ngOnInit(): void {
    console.log(this.employeeObJ)

    // Get managers:
    this.employeesService.getAllEmployees().subscribe((data) => {
      this.employeeName = data.map((e: any) => {
        return {
          employeeName: e.payload.doc.data()['name'],
        }
      })
      console.log('emplayee name ', this.employeeName)
    })

    //Get departments:
    this.employeesService.getDepartments().subscribe((depts) => {
      this.employeeDepartment = depts.map((e: any) => {
        return {
          id: e.payload.doc.id,
          department: e.payload.doc.data()['department'],
        }
      })
      console.log(typeof this.employeeDepartment)
    })

    this.empForm = new FormGroup({
      employeeCode: new FormControl('', Validators.required),
      employeeName: new FormControl('', Validators.required),
      employeeHiringDate: new FormControl('', Validators.required),
      employeeNationalID: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{14}$'),
      ]),
      employeeEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
      ]),
      employeeDepartment: new FormControl('', Validators.required),
      employeeManager: new FormControl('', Validators.required),
      employeeMobile: new FormControl('', Validators.required),
    })
  }
}
