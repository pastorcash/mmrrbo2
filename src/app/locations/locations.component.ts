import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  customClass = 'customClass';
  isFirstOpen = true;
  constructor() { }

  ngOnInit() {
  }

}
