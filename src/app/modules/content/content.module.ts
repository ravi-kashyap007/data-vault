import { NgModule } from '@angular/core';
import { CarouselModule, WavesModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { ContentComponent } from '../content/content/content.component';
import { MaterialModule } from '../../shared/material.module'
import { ContentRoutingModule } from './content-routing.module';
import { LayoutsModule } from '../../core/layouts/layouts.module';

@NgModule({
  declarations: [
    ContentComponent  
]
  ,
  imports: [
    CommonModule,  
    ContentRoutingModule,
    MaterialModule,
    LayoutsModule,
    CarouselModule, 
    WavesModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports: [
  ],
})

export class ContentModule { }


