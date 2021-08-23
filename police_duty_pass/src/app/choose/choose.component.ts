import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneratePassComponent } from '../generate-pass/generate-pass.component';
import {MatDialog , MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { UploadExcelComponent } from '../upload-excel/upload-excel.component';
import { ChooseBulkComponent } from '../choose-bulk/choose-bulk.component';
@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {
  chooseformdata: FormGroup;
  PassType:any = [
    "Duty Pass",
    "Security Pass"
  ]

  PassColor:any = [
    "blue",
    "yellow"
  ]

  PassSize:any = [
    "b3",
    "b4"
  ]



  showCustom:boolean=false;
  pass_color:any;

  constructor(private formBuilder: FormBuilder,private dialog:MatDialog,private dialogRef: MatDialogRef<ChooseComponent>) { }

  ngOnInit(): void {

      this.chooseformdata = this.formBuilder.group({
        pass_type: [null, [Validators.required]],
        paper_size: [null, [Validators.required]],
        custom_color: [''],
        color_code: [null]
      });
    
  
  }

  onChange(e){
   
    if(e.target.checked){
      this.showCustom = true;
      
    }else{
      this.showCustom = false;
      
    }
    
    
    
  }

  // public onSubmit() {
  //   this.chooseformdata.value.color_code;
  // }

  public onSubmit():void{
  //  console.log(this.chooseformdata.value);
  if(this.showCustom){
    this.pass_color = this.chooseformdata.value.custom_color;
  }else{
    this.pass_color = this.chooseformdata.value.color_code;
  }
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.data = {
      "passType":this.chooseformdata.value.pass_type,
      "passColor":this.pass_color,
      "passSize":this.chooseformdata.value.paper_size
    }
   
    const dialogRef = this.dialog.open(GeneratePassComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
    this.dialogRef.close();
  }

  bulkData(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '70%';
   
    const dialogRef = this.dialog.open(ChooseBulkComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
    this.dialogRef.close();
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
