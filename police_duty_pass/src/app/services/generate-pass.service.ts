import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GeneratePassService {

  constructor(private _http:HttpClient) { }

  async generatePass(body: any) {

    return await this._http.post("http://localhost:3000/api/generatePass/generate", body)

  }

  async passList(){
    return await this._http.get("http://localhost:3000/api/generatePass/pass-list");
  }

  async history(){
    return await this._http.get("http://localhost:3000/api/generatePass/history");
  }

  async getUser(id){
    return await this._http.get("http://localhost:3000/api/generatePass/user/"+id);
  }

  async updateUser(id , body:any){
    return await this._http.put(`http://localhost:3000/api/generatePass/updatePass/${id}` , body);
  }
 
  async expirePass(data:any){
    var body = {
      "data":data
    }
    return await this._http.put(`http://localhost:3000/api/generatePass/expirepass/` , body);
  }

  async excelUpload(data:any){
    var body = {
      "data":data
    }
    console.log(body);
    
    return await this._http.post("http://localhost:3000/api/generatePass/uploadExcel" , body);
  }

  async getVenue(){
    return await this._http.get("http://localhost:3000/api/venue/active");
  }

  async getVenuePeople(dutyPlace:any){
    
    return await this._http.get(`http://localhost:3000/api/generatePass/venuePeople/${dutyPlace}`);
  }

  async uploadZip(body:any){
    return await this._http.post("http://localhost:3000/api/generatePass/upload-zip", body)
  }
}
