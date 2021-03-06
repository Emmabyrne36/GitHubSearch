import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { GitUsers } from './git-users';
import { HttpClient } from '@angular/common/http';
//import { toPromise } from 'rxjs/operators';
//import 'rxjs/add/operator/toPromise';

@Injectable()
export class GitSearchService {
  cachedValues: Array<{
    [query: string]: GitSearch
    }> = [];

    // Create a second cached values for the user search
    cachedValues2: Array<{
      [query: string]: GitSearch
      }> = [];
  constructor(private http: HttpClient) {
    //this.http = http;
   }

  gitSearch = (query: string) => { 
    let promise = new Promise<GitSearch>((resolve,reject) => {
        if (this.cachedValues[query]){
          resolve(this.cachedValues[query]) 
          /* This will check the array for cached values with the same search query as what is being currently searched.
          This will get returned immediately without querying the API */
        }
        else {
          this.http.get('https://api.github.com/search/repositories?q=' + query)
          .toPromise()
          .then( (response) => {
            resolve(response as GitSearch)
          }, (error) => {
            reject(error);
          })
        }
    })
    return promise;
  }

  gitUsers = (query: string) => {
    let promise = new Promise<GitUsers>((resolve,reject) => {
        if (this.cachedValues2[query]){
            resolve(this.cachedValues2[query])
        }
        else {
            this.http.get('https://api.github.com/search/users?q=' + query)
            .toPromise()
            .then( (response) => {
                resolve(response as GitUsers)
            }, (error) => {
                reject(error);
            })
        }
    })
    return promise;
  }

}
