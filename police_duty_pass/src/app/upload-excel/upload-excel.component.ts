import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { GeneratePassComponent } from '../generate-pass/generate-pass.component';
import * as XLSX from 'xlsx';
import {GeneratePassService} from '../services/generate-pass.service';
import html2PDF from 'jspdf-html2canvas';
import { ChooseComponent } from '../choose/choose.component';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css']
})
export class UploadExcelComponent implements OnInit {
  
  fileName = "";
  file : File;
  arrayBuffer:any;
  bulkData:any = [];
  finalPushArray:any = [];
  response:any;
  error: String = '';
  message: String = '';
  passSize:any;
  pdfArray:any;
  show:boolean=true;
  showDownloadBtn:boolean=false;
  showUploadBtn:boolean = false;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<UploadExcelComponent> , private _generate:GeneratePassService,@Inject(MAT_DIALOG_DATA) public data: any) {
       this.pdfArray = [];
   }

  ngOnInit(): void {
    this.passSize = this.data.passSize;
    console.log(this.passSize);
    
  }

  showFileName(event) {
    this.showUploadBtn = true;
    this.fileName = event.target.files[0].name;

    this.file= event.target.files[0];     
    let fileReader = new FileReader();    
    fileReader.readAsArrayBuffer(this.file);     
    fileReader.onload = (e) => {    
        this.arrayBuffer = fileReader.result;    
        var data = new Uint8Array(this.arrayBuffer);    
        var arr = new Array();    
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
        var bstr = arr.join("");    
        var workbook = XLSX.read(bstr, {type:"binary"});    
        var first_sheet_name = workbook.SheetNames[0];    
        var worksheet = workbook.Sheets[first_sheet_name];      
          var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
            
          this.bulkData.push(arraylist); 

          // console.log(this.bulkData);
          
                  
      
    }
  }

  uploadDB(){


    this.pdfArray = this.bulkData[0];
    // console.log(this.pdfArray);
    this.show=false;
    this.showDownloadBtn = true;
    
    

    let array = this.bulkData[0].map((obj) => {
      obj.pass_size = this.passSize;
      return obj;
  })
  
     
    this.finalPushArray = array.map(
      obj => Object.values(obj)
      );;
    
    
    console.log(this.finalPushArray);

    this._generate.excelUpload(this.finalPushArray).then(res => {
      res.subscribe(response => {
        this.response = response
        console.log(this.response)
        if (!this.response.status) {
          this.error = this.response.message;
          this.message = '';
        }

        else {
          this.message = "Excel Uploaded Successfully.Please Download Pass PDF"
          this.error = ''
        }
      },
        error => { console.log(error); throw error }
      )
    });
  }

  downloadExcelPdf(){
    var page = document.getElementById('page');
    html2PDF(page, {
      html2canvas: {
        scrollX: 0,
        scrollY: 0,
        useCORS: true
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      jsPDF: {
        format: this.passSize,
      },
      
      imageType: 'image/jpeg',
      output: 'passes.pdf'
    });
  }


  toggleCard() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';

    const dialogRef = this.dialog.open(ChooseComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });

    this.dialogRef.close();
  }

  closeDialog(){
    this.dialogRef.close();
    window.location.reload();
  }

}
