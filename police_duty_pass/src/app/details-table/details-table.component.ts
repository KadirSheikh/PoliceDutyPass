import { Component, Input, OnInit } from '@angular/core';
import {MatDialog , MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { ChooseComponent } from '../choose/choose.component';
import { EditPassComponent } from '../edit-pass/edit-pass.component';

import { GeneratePassService } from '../services/generate-pass.service';

@Component({
  selector: 'app-details-table',
  templateUrl: './details-table.component.html',
  styleUrls: ['./details-table.component.css']
})
export class DetailsTableComponent implements OnInit {

  @Input() public getData : Array <any> = [];
  response :any;
  id:any;
  showVenue:boolean=false;
  
  
  dtOptions: DataTables.Settings = {};
  constructor(private dialog:MatDialog , private _generatePass : GeneratePassService) { }

  ngOnInit(): void {

    this.dtOptions = {
   
      paging:false
    };
  
    console.log('Table Compopnent called')
    this.getData = [{
      duty_place : ""
    }]

   
    

    this._generatePass.passList().then(res => {
      res.subscribe(response => {
        this.response = response
        
        this.getData = this.response.userData;
        console.log(this.getData)
      },
        error => { console.log(error); throw error }
      )
    })
    
    
    
  }

  heck(){
    console.log(this.getData)
  }

  

  openChooseDialog():void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
   
    const dialogRef = this.dialog.open(ChooseComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  

  clickEdit(e){
    console.log(e);
    
    this.id = e;
    // console.log(this.id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.data = {
      "id":e.id,
      "pass_color":e.pass_color,
      "pass_size":e.pass_size,
      "pass_type":e.pass_type,
      "lineup":e.lineup,
      "proximity":e.proximity,
      "photo_url":e.photo
    }
   
    const dialogRef = this.dialog.open(EditPassComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

 
  }


