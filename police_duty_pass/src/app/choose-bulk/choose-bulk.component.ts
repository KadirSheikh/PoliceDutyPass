import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog , MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { ChooseComponent } from '../choose/choose.component';
import { GeneratePassService } from '../services/generate-pass.service';
import { UploadExcelComponent } from '../upload-excel/upload-excel.component';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-choose-bulk',
  templateUrl: './choose-bulk.component.html',
  styleUrls: ['./choose-bulk.component.css']
})
export class ChooseBulkComponent implements OnInit {

  choosebulkformdata: FormGroup;
  PassSize:any = [
    "b3",
    "b4"
  ]

  zipName:any;
  response:any;

  constructor(private formBuilder: FormBuilder,private dialog:MatDialog,private _generate:GeneratePassService,private dialogRef: MatDialogRef<ChooseBulkComponent>) { }

  ngOnInit(): void {

    this.choosebulkformdata = this.formBuilder.group({
       paper_size: [null, [Validators.required]],
       zip:['', [ 
        RxwebValidators.extension({extensions:["zip"]})
        ]]
    });

  }

  uploadZip(event){
    if(event.target.files.length > 0){
      const fileName = event.target.files[0]
      this.zipName = fileName;
      
    }

   }

  public onSubmit():void{
    var form_data = new FormData();
    form_data.append("zip", this.zipName,this.zipName.fileName);

  
    this._generate.uploadZip(form_data).then(res => {
      res.subscribe(response => {
        this.response = response
        console.log(this.response)
        
      },
        error => { console.log(error); throw error }
      )
    })
    
// console.log(this.choosebulkformdata.value.paper_size);

    //  console.log(this.choosebulkformdata.value);

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '70%';
      dialogConfig.height = '90%';
      dialogConfig.data = {
        "passSize":this.choosebulkformdata.value.paper_size
      }
     
      const dialogRef = this.dialog.open(UploadExcelComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
      });
      this.dialogRef.close();
    }

    backToSingle(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '70%';
      dialogConfig.height = '90%';
      dialogConfig.data = {
        "passSize":this.choosebulkformdata.value.paper_size
      }
     
      const dialogRef = this.dialog.open(ChooseComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
      });
      this.dialogRef.close();
    }
     

    closeDialog(){
      this.dialogRef.close();
    }

}
