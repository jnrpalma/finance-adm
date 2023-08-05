import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-profile',
  templateUrl: './img-profile.component.html',
  styleUrls: ['./img-profile.component.scss']
})
export class ImgProfileComponent {

@Input() img!:  string;

}
