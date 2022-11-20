import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-rentals-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.scss'],
})
export class PropertyListingComponent implements OnInit {
  filters: any[] = [
    {name: 'Type', icon: 'category'},
    {name: 'Price', icon: 'attach_money'},
    {name: 'Move In Date', icon: 'calendar_month'},
    {name: 'No. of beds', icon: 'account_tree'},
    {name: 'More Filters', icon: 'tune'}

  ];

  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
  };
  constructor() {}

  ngOnInit(): void {
    this.center = {lat: 27.4716, lng: 89.6386};
  }
  mapClick(event: any): void {
  }
}