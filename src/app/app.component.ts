import { Component, OnInit } from '@angular/core';
import { GitSearchService } from './git-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GitSearchService]
})
export class AppComponent implements OnInit {
  constructor(private GitSearchService: GitSearchService) {

  }
  ngOnInit(){

  }
  // ngOnInit() {
  //   this.GitSearchService.gitSearch('angular').then( (response) => {
  //     alert("Total Libraries Found: " + response.total_count)
  //   }, (error) => {
  //     alert("Error: " + error.statusText)
  //   })
  // }

  getAngular(language: string){
    console.log(language);
    this.GitSearchService.gitSearch(language).then( (response) => {
      alert("Total Libraries Found: " + response.total_count)
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  callSearch(userName: string) {
    console.log(userName);
    this.GitSearchService.gitUsers(userName).then( (response) => {
      alert("Total Users with the name " + userName + " Found: " + response.total_count)
  }, (error) => {
    alert("Error: " + error.statusText)
  })
  }

  title = 'GitHub Browser';
}