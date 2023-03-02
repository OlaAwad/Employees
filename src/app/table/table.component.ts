import { Component, Input, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { TranslateService } from '@ngx-translate/core'
import { EmployeesService } from '../services/employees.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  employee: any
  employeeCode: string = ''
  employeeName: string = ''
  employeeHiringDate: Date | undefined
  employeeNationalID: number | undefined
  employeeEmail: string = ''
  employeeDepartment: string = ''
  employeeManager: string = ''
  employeeMobile: number | undefined
  msg: string = ''
  formGroup: any

  constructor(public employeesService: EmployeesService,
              public translate: TranslateService,
              public _AngularFirestore: AngularFirestore) {}

  ngOnInit(): void {
   
    this.employeesService.getAllEmployees().subscribe((data) => {
      this.employee = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          code: e.payload.doc.data()['code'],
          name: e.payload.doc.data()['name'],
          department: e.payload.doc.data()['department'],
          hiringDate: e.payload.doc.data()['hiringDate'],
          nationalID: e.payload.doc.data()['nationalID'],
          email: e.payload.doc.data()['email'],
          manager: e.payload.doc.data()['manager'],
          mobile: e.payload.doc.data()['mobile'],
          isEditable: false
        }
      })
    })
  }

  deleteRecord(record: any) {
    if (
      window.confirm('Are you sure you want to delete ' + record.name + '?')
    ) {
      this.employeesService.deleteEmployee(record)
    }
  }

 
  updateRecord(record: any) {
    record.isEditable = true
    this.employeesService._employeeOBJData.next(record)
    this.employeesService.deleteEmployee(record)
  }
}
