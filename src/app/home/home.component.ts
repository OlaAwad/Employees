import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { TranslateService } from '@ngx-translate/core'
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  getCountFromServer,
} from 'firebase/firestore'
import { EmployeesService } from '../services/employees.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public _AngularFirestore: AngularFirestore,
    public employeesService: EmployeesService,
    public translate: TranslateService
  ) {}

  db = getFirestore()
  colRef = collection(this.db, 'Employee')
  countDocs: number = 0
  countNew: number = 0
  sales: number = 0
  employee: any

  ngOnInit(): void {
    this.countDocuments()
    this.countNewHiring()
    this.countSales()

    // this.employeesService.getAllEmployees().subscribe(data => {
    //   this.employee = data.map((e:any)=> {
    //     return{
    //       hiringDate: e.payload.doc.data()['hiringDate']
    //     }
    //   })
    //   //console.log(this.employee[0].hiringDate.slice(0,4))
    //   //console.log(this.employee[0].hiringDate)
    // })
  }

  //Count Employees:
  countDocuments() {
    this._AngularFirestore
      .collection('Employee')
      .get()
      .toPromise()
      .then((querySnapshot: any) => {
        // console.log(querySnapshot.size);
        this.countDocs = querySnapshot.size
      })
  }

  //Count New hiring (By current year):
  async countNewHiring() {
    const q = query(this.colRef, where('hiringDate', '>=', '2023-01-01'))
    const snapshot = await getCountFromServer(q)
    this.countNew = snapshot.data().count
    // console.log(this.countNew)
  }

  //Count Sales:
  async countSales() {
    const q = query(this.colRef, where('department', '==', 'Sales'))
    const snapshot = await getCountFromServer(q)
    this.sales = snapshot.data().count
  }
}
