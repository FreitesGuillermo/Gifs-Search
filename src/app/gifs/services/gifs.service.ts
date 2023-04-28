import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';



@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList:Gif[] = [];

  private _tagsHistory : string[] = [];

  private apiKey: string = "nAfC2Bi400iSS6sBzRGFRhsg0zSfPkmx";
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';


  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('gifs servicse ready');
  }

  get tagHistory () {
    return [...this._tagsHistory];
  }
  private organizeHistory (tag :string){
    tag = tag.toLowerCase();
    if ( this._tagsHistory.includes(tag) ){
      this._tagsHistory= this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    // en el codigo anterior se filtra si un elelento esta repetido

    this._tagsHistory.unshift(tag);
    // se agrega el tag selecionado al pricipio
    this._tagsHistory = this.tagHistory.splice(0,9);
    //se mantienen 10 elemntos
    this.saveLocalStorage();

  }

   searchtag ( tag:string ):void{
  // async searchtag ( tag:string ): Promise <void>{
  if (tag.length ===0 ) return;
    this.organizeHistory(tag);
    // forma 1 de hacer peticiones a un servidor
/*
    fetch('http://api.giphy.com/v1/gifs/search?api_key=nAfC2Bi400iSS6sBzRGFRhsg0zSfPkmx&q=valorant&limit=10')
     .then ( resp => resp.json() )
      .then (data => console.log(data)); */

    // forma 2 de pedir peticiones a un servidor

/*     const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=nAfC2Bi400iSS6sBzRGFRhsg0zSfPkmx&q=valorant&limit=10')
    const data = await resp.json();
      console.log(data) */

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('q', tag)
      .set('limit','10')

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe(resp  => {
        this.gifList =resp.data
        // console.log({gifs: this.gifList});
      });



    }
    private saveLocalStorage():void {
      localStorage.setItem('history',JSON.stringify(this._tagsHistory));
    }
    private loadLocalStorage():void{
      if(!localStorage.getItem('history')) return

     this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
     if(this._tagsHistory.length === 0) return;

      this.searchtag(this._tagsHistory[0]);

    }

}


