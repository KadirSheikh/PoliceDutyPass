import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {GeneratePassService} from "../services/generate-pass.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output() public passData = new EventEmitter<any>();
  
  venues:any = [];
  data :any = [];
  allVenues:any =[];
  passPeopleData:any=[];
  set:boolean=true;
 
  constructor(private _generate:GeneratePassService,private router: Router) { }

  ngOnInit(): void {
this._generate.getVenue().then(res => {
  res.subscribe(response => {
    
    this.venues = response;
    this.allVenues = this.venues.data;

    console.log(this.allVenues);
    
    
  })
})



    
  }

  allPasses(){
    this._generate.passList().then(res => {
      res.subscribe(response => {
        this.data = response;
        
        this.passPeopleData = this.data.userData;
        window.location.reload();
        console.log(this.passPeopleData);
        
        
      })
    })
  }

  

  showTable(e){
    
    console.log(e);

    this._generate.getVenuePeople(e).then(res => {
      res.subscribe(response => {
        this.data = response;
        
        this.passPeopleData = this.data.userData;
        
        console.log(this.passPeopleData);
        
        
      })
    })
    
    
    
    this.passData.emit(this.passPeopleData);
    
  }

}
