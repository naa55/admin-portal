import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  venuesArray: any;
  officers: any;
  officersLength: number;
  venuesLength: number;
  courtList: any;
  courtListLength: number;
  caseList: any;
  caseListLength: number;
  familyLawyerList: any;
  familyLawyerLength: any;
  ImamLength: number;
  ImamList: any;
  glossaryList: any;
  glossaryLength: any;
  


  constructor(private auth: AuthService) { }


  ngOnInit(): void {
    $.getScript("./assets/js/deafult-dashboard.js")
    this.getAllOfficers();
    this.getVenues();
    this.getAllCourts();
    this.getAllCases();
    this.getAllFamilyLawyers();
    this.getImamList();
    this.getGlossaryList()
  }



  getAllOfficers() {
    this.auth.get('/admin/marriage-officers/all').subscribe({
      next: (response) => {
        this.officers = response['officers']
        this.officersLength = response['officers'].length
        console.log("officers", this.officersLength)
      },
      error: (result) => {
        console.log(result)
      }
    })
  }

  getVenues() {
    this.auth.get('/admin/venues/all').subscribe({
      next: (response) => {
        this.venuesArray = response['venues'];
        this.venuesLength = response['venues'].length
        console.log(this.venuesLength)
      },
      error: (result) => {
        console.log(result);
      },
    });
  }


  getAllCourts() {
    this.auth.get('/admin/courts/all').subscribe({
      next: (response) => {
        this.courtList = response['courts'];
        this.courtListLength = response['courts'].length;
        console.log(response)
      },
      error: (result) => {
        console.log(result)
      }
    })
  }
  getAllCases() {
    this.auth.get('/admin/case-law/all').subscribe({
      next: (response) => {
        this.caseList = response['case_laws'];
        this.caseListLength = response['case_laws'].length;
        console.log(this.caseListLength)
      },
      error: (result) => {
        console.log(result)
      }
    })
  }
  getAllFamilyLawyers() {
    this.auth.get('/admin/lawyers/all').subscribe({
      next: (response) => {
        this.familyLawyerList = response['lawyers'];
        this.familyLawyerLength = response['lawyers'].length;
        console.log(this.familyLawyerLength)
      },
      error: (result) => {
        console.log(result)
      }
    })
  }

  getImamList() {
    const category = "muslim";
    this.auth.get(`/admin/marriage-officers/all?type=${category}`).subscribe({
      next: (response) => {
        console.log(response)
        this.ImamList = response['officers'];
        this.ImamLength = response['officers'].length;
        console.log(this.ImamLength)
      },
      error: (result) => {
        console.log(result)
      }
    })
  }
  getGlossaryList() {
    this.auth.get('/admin/glossary/all').subscribe({
      next: (response) => {
        console.log(response)
        this.glossaryList = response['words'];
        this.glossaryLength = response['words'].length;

     
      },
      error: (result) => {
        console.log(result)
      }
    })
  }


}
