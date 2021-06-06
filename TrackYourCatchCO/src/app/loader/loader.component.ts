import { Component, Input, OnInit } from '@angular/core';  
  
@Component({  
    selector: 'app-loader',  
    templateUrl: './loader.component.html'  
})  
  
export class LoaderComponent implements OnInit  {  
    @Input() loader:boolean = false;  
  
    constructor ()  {}  
  
    ngOnInit() { }  
}