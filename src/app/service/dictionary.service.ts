import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateResult } from '../dao/translate-result';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  apiKey:string = "dict.1.1.20220509T110240Z.eb7e754cf9c5e4c0.506d5912935f945dbf7537147d8ae7ef62b0fd73";
  apiHost:string = "https://dictionary.yandex.net/api/v1/dicservice.json";
  constructor(private http: HttpClient) { }

  public getAvailableLangs(){
    return this.http.get<string[]>( this.apiHost + "/getLangs?key=" + this.apiKey);
  }

  public lookup(lang:string, word:string){
    return this.http.get<TranslateResult>( this.apiHost + "/lookup?lang=" + lang + "&text=" + word + "&key=" + this.apiKey);
  }
}
