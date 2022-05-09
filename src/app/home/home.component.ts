import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { WordService } from '../service/word.service';
import { SynonymResult } from '../dao/synonimresult';
import { DictionaryService } from '../service/dictionary.service';
import { TranslateResult } from '../dao/translate-result';
import {MatSnackBar} from '@angular/material/snack-bar';
import { InternationalSynonymsService } from '../service/international-synonyms.service';
import { IntSynonym } from '../dao/int-synonym';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private intSynServ:InternationalSynonymsService ,private wordService:WordService, private dictionary:DictionaryService, private _snackBar: MatSnackBar) { }
  wordInput?:string;
  synonymsSource?:SynonymResult;
  synonymsResult?:SynonymResult;
  availaibleTranslations?:string[];
  langs:string[] = [];
  sourceLang:string;
  targetLang:string;
  translateResult:TranslateResult;
  durationInSeconds:number = 5;


  ngOnInit(): void {
    
    this.dictionary.getAvailableLangs().subscribe((data:string[]) => {
      this.availaibleTranslations = data;
      this.availaibleTranslations.forEach(transl => {
        let twoLang:string[] = transl.split("-");
        twoLang.forEach(lang => {
          if (this.langs.indexOf(lang) === -1) {
            this.langs.push(lang);
          }
        });
      });
      console.log(this.langs);
    });
  
  }

  public getSynonymSource(){
    this.wordService.getSynonyms(this.wordInput).subscribe((data:SynonymResult) => this.synonymsSource = data)
  }

  clear(){
    this.wordInput = "";
    this.translateResult = null;
    this.synonymsResult = null;
    this.synonymsSource = null
  }

  execute(){
    this.translateResult = null;
    this.synonymsResult = null;
    this.synonymsSource = null;
    this.translate();
    if(this.sourceLang == "en"){
      this.getSynonymSource();
    }else {
      this.getIntSynonym(this.wordInput,this.sourceLang);
    }
  }

  translate(){
    
    let lang = this.sourceLang + "-" + this.targetLang;
    if(this.availaibleTranslations.indexOf(lang) === -1){
      this.openSnackBar("This language translation is not available");
      return;
    }

    this.dictionary.lookup(lang,this.wordInput).subscribe((data:TranslateResult) => {
      this.translateResult = data;
    }, err => this.openSnackBar(err));
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "OK",{duration: this.durationInSeconds * 1000});
  }
  getIntSynonym(word:string, lang:string){
    this.intSynServ.getSynonym(word,lang + "_" + lang.toUpperCase()).subscribe((data:IntSynonym) => {
      console.log("yes")
      let syns = [];
      data.response.forEach(list => {
        let group:string[] = list.list.synonyms.split("|")
        group.forEach(syn => {
          console.log(syn)
          if(syn != "" && syn != null)
          syns.push(syn);
        });
      });
      let synSour = new SynonymResult()
      synSour.synonyms = syns;
      this.synonymsSource = synSour;
    });
    
  }
}
