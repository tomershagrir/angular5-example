import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from  'rxjs';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor(private http: HttpClient) { }

  title = 'app';
  showWarning:boolean=false;;
  items=[];

  oninputchange($event){
    this.setItemsToQuery($event.target.value);
  }

  setItemsToQuery(val:string){
    this.http.get('http://localhost:8081/api/calc?num='+val).map(response  => response).subscribe((s: any) => {

      console.log(s) ;
       this.items=s;
       this.showWarning=s.options.length==0;
       });
  }

  ngOnInit() {
    this.setItemsToQuery('');
  }
}
