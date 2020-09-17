import { NgModule } from '@angular/core';
import { HeaderComponent } from '../layouts/header/header.component';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';
import { CarouselModule, WavesModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [
  HeaderComponent,
  SidebarComponent
]
  ,
  imports: [
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


