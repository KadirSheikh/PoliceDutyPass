import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {GeneratePassService} from '../services/generate-pass.service';
import html2PDF from 'jspdf-html2canvas';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ShowImgComponent } from '../show-img/show-img.component';
@Component({
  selector: 'app-edit-pass',
  templateUrl: './edit-pass.component.html',
  styleUrls: ['./edit-pass.component.css']
})
export class EditPassComponent implements OnInit {

  public userData :any = {};
  updatePassGenerationForm: FormGroup;
  error: String = '';
  message: String = '';
  response: any;
  id:any;
  updateData:any=[];
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
  showCustom:boolean = false
  showForm : Boolean = true;
  epassType:any;
  epassSize:any;
  epassColor:any;
  passLineup:any;
  passProximity:any;
  imgPath:any;
  editPassColor:any;
  editPassType:any;
  editPassSize:any;
  imageName:any;
  showImg:any;
  fileName:any;
  changeFilename:any;
  showChange = false;
  constructor(private dialog:MatDialog,private dialogRef: MatDialogRef<EditPassComponent> , private formBuilder: FormBuilder , private _generatePass:GeneratePassService ,private _generate:GeneratePassService,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.fileName = new File([""], "a.png");
  // this.getBase64ImageFromUrl("http://localhost:3000/police.jpg")
  // .then(result => console.log(result)
  //  )
  // .catch(err => console.error(err));
  

    window.scrollTo(0, 0);
    this.updatePassGenerationForm = this.formBuilder.group({
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
      start_date:['', [Validators.required]],
      end_date:['', [Validators.required]],
      pass_type: [this.data.pass_type],
      pass_size: [this.data.pass_size],
      pass_color: [this.data.pass_color],
      lineup : [this.data.lineup],
      proximity : [this.data.proximity]
    })


    this.showImg = this.data.photo_url;
    
    
    
    // console.log(this.data.pass_type);
    // console.log(this.data.pass_color);
    // console.log(this.data.pass_size);
    // console.log(this.data.lineup);
    // console.log(this.data.proximity);
    

    this._generatePass.getUser(this.data.id).then(res => {
      res.subscribe(response => {
        this.response = response
        
        this.userData = this.response.singleData[0];
        this.epassType = this.userData.pass_type;
        this.epassSize = this.userData.pass_size;
        this.epassColor = this.userData.pass_color;
        this.passLineup = this.userData.lineup;
        this.passProximity = this.userData.proximity;
        // console.log(this.userData);
        
        // console.log(this.epassSize);
        
        this.updatePassGenerationForm.patchValue({
          id_number:this.userData.id_number,
          name:this.userData.name,
          designation:this.userData.designation,  
          mobile:this.userData.mobile,
          station:this.userData.station,
          duty_place:this.userData.duty_place,
          company_name:this.userData.company_name,
          start_date:this.userData.start_date,
          end_date:this.userData.end_date

        })
        // console.log(this.userData.id_number);
      },
        error => { console.log(error); throw error }
      )
    })
  }



  get f() { return this.updatePassGenerationForm.controls; }

  selectImg(event){
    if(event.target.files.length > 0){
      this.showChange = true;
      const fileName = event.target.files[0]
      this.imgPath = fileName;
      this.changeFilename = fileName.name;
      console.log(fileName);
      
      // this.imageName = "http://localhost:3000/"+fileName.name;
      
    }
  }

  showImage(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.data = {
      "img":this.showImg
    }
   
    const dialogRef = this.dialog.open(ShowImgComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
    
  }

  

  public onSubmit() {

    // console.log(this.updatePassGenerationForm.value);
    
    if(this.updatePassGenerationForm.value.photo == ""){
    
      var form_data = new FormData();

    for (var key in this.updatePassGenerationForm.value) {
      // console.log(key);
      // if(!key.includes('photo'))
        form_data.append(key, this.updatePassGenerationForm.value[key]);
        
    }
    this.updatePassGenerationForm.value.photo=this.showImg

    // form_data.append("photo", ,this.updatePassGenerationForm.value.photo);

    // this.updatePassGenerationForm.value.pass_color = this.updatePassGenerationForm.value.custom_color;
    // delete this.updatePassGenerationForm.value.custom_color;
    // console.log(this.updatePassGenerationForm.value);

     this.editPassColor = this.updatePassGenerationForm.value.pass_color;
     this.editPassType = this.updatePassGenerationForm.value.pass_type;
     this.editPassSize = this.updatePassGenerationForm.value.pass_size;

    this._generate.updateUser(this.data.id , form_data).then(res => {
      res.subscribe(response => {
        this.response = response
        console.log(this.response)
        if (!this.response.status) {
          this.error = this.response.message;
          this.message = '';
          this.showForm = true;
        }

        else {
          this.message = "Pass Updated Successfully.Please Download Pass PDF";
          this.error = '';
          this.showForm = false;
        }
        

      },
        error => { console.log(error); throw error }
      )
    })
      
    }else{
        var form_data = new FormData();

    for (var key in this.updatePassGenerationForm.value) {
      // console.log(key);
      if(!key.includes('photo'))
        form_data.append(key, this.updatePassGenerationForm.value[key]);
        
    }

    form_data.append("photo", this.imgPath,this.imgPath.fileName);

    // this.updatePassGenerationForm.value.pass_color = this.updatePassGenerationForm.value.custom_color;
    // delete this.updatePassGenerationForm.value.custom_color;
    // console.log(this.updatePassGenerationForm.value);

     this.editPassColor = this.updatePassGenerationForm.value.pass_color;
     this.editPassType = this.updatePassGenerationForm.value.pass_type;
     this.editPassSize = this.updatePassGenerationForm.value.pass_size;

    this._generate.updateUser(this.data.id , form_data).then(res => {
      res.subscribe(response => {
        this.response = response
        console.log(this.response)
        if (!this.response.status) {
          this.error = this.response.message;
          this.message = '';
          this.showForm = true;
        }

        else {
          this.message = "Pass Updated Successfully.Please Download Pass PDF";
          this.error = '';
          this.showForm = false;
        }
        

      },
        error => { console.log(error); throw error }
      )
    })
    }
  
  

  }

  // onChange(e){
   
  //   if(e.target.checked){
  //     this.showCustom = true;
      
  //   }else{
  //     this.showCustom = false;
      
  //   }
    
    
    
  // }

  // async  getBase64ImageFromUrl(imageUrl) {
  //   var res = await fetch(imageUrl);
  //   var blob = await res.blob();
  
  //   return new Promise((resolve, reject) => {
  //     var reader  = new FileReader();
  //     reader.addEventListener("load", function () {
  //         resolve(reader.result);
  //     }, false);
  
  //     reader.onerror = () => {
  //       return reject(this);
  //     };
  //     reader.readAsDataURL(blob);
  //   })
  // }



  


  download(){
    var page = document.getElementById('page');
    html2PDF(page, {
      html2canvas: {
        useCORS: true
      },
      jsPDF: {
        format: this.editPassSize
      },
      imageType: 'image/jpeg',
      output: 'pass.pdf'
    });
  }



  getUpdateTblData(){
    
    this.updateData.push(this.updatePassGenerationForm.value);
    
  }

  closeDialog(){
    window.location.reload();
    this.dialogRef.close();
  }

}
