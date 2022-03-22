import {NgModule} from '@angular/core';
import {NgxMatCalendarComponent} from './ngx-mat-calendar.component';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
        NgxMatCalendarComponent
    ],
    imports: [
        FlexLayoutModule,
        BrowserModule,
        CommonModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule
    ],
    exports: [
        NgxMatCalendarComponent
    ]
})
export class NgxMatCalendarModule {
}
