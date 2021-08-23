import { Component, OnInit } from '@angular/core';
import { GeneratePassService } from '../services/generate-pass.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [DatePipe]
})
export class HistoryComponent implements OnInit {
  response :any;
  // dtOptions: any = {
  //   paging:false
  // };
  getData:any = [];
  myDate :any = new Date();
  constructor(private _generatePass : GeneratePassService,private datePipe: DatePipe) {
  
   }

  ngOnInit(): void {
    this._generatePass.history().then(res => {
      res.subscribe(response => {
        this.response = response
        
        this.getData = this.response.userData;
        console.log(this.getData)
      },
        error => { console.log(error); throw error }
      )
    });

    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.myDate);

 
    this._generatePass.expirePass(this.myDate).then(res => {
      res.subscribe(response=>{
        console.log(response);
        
      })
    })
    

  }

}
