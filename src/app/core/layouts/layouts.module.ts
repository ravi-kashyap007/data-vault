import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule, WavesModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from 'src/app/shared/material.module';

import { HeaderComponent } from '../layouts/header/header.component';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';


@NgModule({
  declarations: [
  HeaderComponent,
  SidebarComponent
]
  ,
  imports: [
    CommonModule,
    MaterialModule,
    CarouselModule, 
    WavesModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports: [
    SidebarComponent,
    HeaderComponent
  ],
})

export class LayoutsModule { }


