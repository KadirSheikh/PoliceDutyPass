import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog , MatDialogConfig, MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UploadExcelComponent } from '../upload-excel/upload-excel.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {GeneratePassService} from '../services/generate-pass.service';
import html2PDF from 'jspdf-html2canvas';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-generate-pass',
  templateUrl: './generate-pass.component.html',
  styleUrls: ['./generate-pass.component.css']
})
export class GeneratePassComponent implements OnInit {

  passGenerationForm: FormGroup;
  error: String = '';
  message: String = '';
  response: any;
  passData : any;
  showForm : Boolean = true;
  imgPath:any;
  passColor:any;
  passSize:any;
  passType:any;
  imageName:any;
  imgUrl:any;
  makeChecked:boolean = true;
  constructor(private dialog:MatDialog,private dialogRef: MatDialogRef<GeneratePassComponent>, private formBuilder: FormBuilder, private _router: Router , private _generate:GeneratePassService,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.passData = [];
    console.log(this.passData);
    
  }

  ngOnInit(): void {

    window.scrollTo(0, 0);
    this.passGenerationForm = this.formBuilder.group({
      id_number : ['', [Validators.required, Validators.min(2)]],
      name : ['', [Validators.required, Validators.min(3)]],
      photo : ['', [ 
        RxwebValidators.extension({extensions:["jpeg","png","jpg"]})
        ]],
      designation : ['', [Validators.required, Validators.min(3)]],
      mobile : ['', [Validators.required, Validators.min(10)]],
      station : ['', [Validators.required, Validators.min(2)]],
      duty_place : ['', [Validators.required, Validators.min(2)]],
      company_name : ['', [Validators.required, Validators.min(3)]],
      start_date : ['', [Validators.required]],
      end_date : ['', [Validators.required]],
      pass_type : ['', [Validators.required]],
      lineup : [''],
      proximity : ['']
    });

  this.passType = this.data.passType
  this.passColor = this.data.passColor;
  this.passSize = this.data.passSize;
   
    
  }

  get f() { return this.passGenerationForm.controls; }

  selectImage(event){
    if(event.target.files.length > 0){
      const fileName = event.target.files[0]
      this.imgPath = fileName;
    }
    this.imgUrl = "http://localhost:3000/"+this.imgPath.name;
  }

  onSubmit() {
    var form_data = new FormData();
    for (var key in this.passGenerationForm.value) {
      // console.log(key);
      if(!key.includes('photo'))
        form_data.append(key, this.passGenerationForm.value[key]);
        
    }

    form_data.append("pass_color", this.passColor);
    form_data.append("pass_size", this.passSize);
    form_data.append("photo", this.imgPath,this.imgPath.fileName);
    

    // this.passGenerationForm.value.pass_color = this.passColor;
    //  this.passGenerationForm.value.pass_size = this.passSize;
    

    // console.log(this.passGenerationForm.value)
    // console.log(this.passColor , this.passSize);
    
    this._generate.generatePass(form_data).then(res => {
      res.subscribe(response => {
        this.response = response
        console.log(this.response)
        if (!this.response.status) {
          this.error = this.response.message;
          this.message = '';
          this.showForm = true;
        }

        else {
          this.message = "Pass Generated Successfully.Please Download Pass PDF"
          this.error = ''
          this.showForm = false;
          

        }
        

      },
        error => { console.log(error); throw error }
      )
    })
  }

  getTblData(){
    this.passData.push(this.passGenerationForm.value);
    
  }

  download(){
    var page = document.getElementById('page');
    html2PDF(page, {
      html2canvas: {
        useCORS: true
      },
      jsPDF: {
        format: this.passSize,
      },
      imageType: 'image/jpg',
      output: 'pass.pdf'
    });
  }

  closeDialog(){
    this.dialogRef.close();
    window.location.reload();
  }

  // bulkData(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '95%';
  //   dialogConfig.height = '80%';
   
  //   const dialogRef = this.dialog.open(UploadExcelComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
      
  //   });
  //   this.dialogRef.close();
  // }

  

}
