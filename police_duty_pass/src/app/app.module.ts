import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsTableComponent } from './details-table/details-table.component';
import { DataTablesModule } from 'angular-datatables';
import { GeneratePassComponent } from './generate-pass/generate-pass.component';
import {MatRadioModule} from '@angular/material/radio';
import { EditPassComponent } from './edit-pass/edit-pass.component';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { ChooseComponent } from './choose/choose.component';
import { ChooseBulkComponent } from './choose-bulk/choose-bulk.component';
import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ShowImgComponent } from './show-img/show-img.component'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailsTableComponent,
    GeneratePassComponent,
    EditPassComponent,
    UploadExcelComponent,
    LoginComponent,
    HistoryComponent,
    ChooseComponent,
    ChooseBulkComponent,
    ShowImgComponent
  ],
  imports: [
    RxReactiveFormsModule ,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DataTablesModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[GeneratePassComponent ,  UploadExcelComponent]
})
export class AppModule { }
