import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {
  customClass: 'customClass';
  status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  constructor() { }

  ngOnInit() {
  }

}
