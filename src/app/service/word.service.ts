import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SynonymResult } from '../dao/synonimresult';
//this api is only for english synonyms
@Injectable({
  providedIn: 'root'
})
export class WordService {

  private apiKey:string = "e73096dfbamsh93b2cdc86d0622cp149a24jsndb89116b2339";
  private apiHost:string = "https://wordsapiv1.p.rapidapi.com";
  private httpHeader:HttpHeaders;
  

  constructor(private http: HttpClient) { 
    this.httpHeader = new HttpHeaders();
    
    this.httpHeader = this.httpHeader.append("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");
    this.httpHeader = this.httpHeader.append("X-RapidAPI-Key", this.apiKey);
    this.httpHeader = this.httpHeader.append("x-RapidAPI-ua", "RapidAPI-Playground");
  }

  public async getSynonymsAsync(word:string) {
    const response = await this.http.get<SynonymResult>(this.apiHost + "/words/" + word + "/synonyms", {headers: this.httpHeader, responseType: 'json',}).toPromise();
    return response;
  }

  public getSynonyms(word:string) {
    return this.http.get<SynonymResult>(this.apiHost + "/words/" + word + "/synonyms", {headers: this.httpHeader, responseType: 'json',});
  }
}
