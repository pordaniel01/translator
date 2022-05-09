import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IntSynonym } from '../dao/int-synonym';

@Injectable({
  providedIn: 'root'
})
export class InternationalSynonymsService {

  apiUrl:string = "http://thesaurus.altervista.org/thesaurus/v1";
  apiKey:string = "fIzzKCs9ZJKu4pZihJIX";
  constructor(private http:HttpClient) { }

  public getSynonym(word:string, lang:string){
    return this.http.get<IntSynonym>(this.apiUrl + "?word=" + word + "&language=" + lang + "&output=json" + "&key=" + this.apiKey);
  }
}
