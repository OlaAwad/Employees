import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { BehaviorSubject, Observable } from 'rxjs'
import { Employee } from '../employee'

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(public _AngularFirestore: AngularFirestore) {}

  public _employeeOBJData = new BehaviorSubject<Employee>({
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
  })

  public _employeeOBJData$ = this._employeeOBJData.asObservable()

  data: any
  employee: string | undefined
  employeeCode: string = ''
  employeeName: string = ''
  employeeHiringDate: Date | undefined
  employeeNationalID: number | undefined
  employeeEmail: string = ''
  employeeDepartment: string = ''
  employeeManager: string = ''
  employeeMobile: number | undefined

  createNewEmployee(record: any) {
    record.id = this._AngularFirestore.createId()
    return this._AngularFirestore.collection('Employee').add(record)
  }

  getAllEmployees() {
    return this._AngularFirestore.collection('Employee').snapshotChanges()
  }

  deleteEmployee(record: any) {
    return this._AngularFirestore.doc('/Employee/' + record.id).delete()
  }

  getDepartments() {
    return this._AngularFirestore.collection('Departments').snapshotChanges()
  }

  public _employeeData = new BehaviorSubject<any>({
    employeeCode: null,
    employeeName: '',
  })

  public _employeeData$ = this._employeeData.asObservable()

 

  

}
