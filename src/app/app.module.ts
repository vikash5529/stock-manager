import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './shared';
import { HeaderComponent, FooterComponent } from './components';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';
import { HomeComponent } from './components/home/home.component';
import { DatePipe } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './components/chart/chart.component';
import { DataTableComponent } from './components/data-table/data-table.component';
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ThemePickerComponent,
        HomeComponent,
        ChartComponent,
        DataTableComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        ChartsModule
    ],
    entryComponents: [ChartComponent],
    providers: [DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule {}
