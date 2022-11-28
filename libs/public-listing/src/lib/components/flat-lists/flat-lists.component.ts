import {Component, OnInit, ViewChild} from '@angular/core';
import {MapInfoWindow} from "@angular/google-maps";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Loader} from "@googlemaps/js-api-loader";
import {geocodeLatLng, SharedFacadeService, SharedStoreStateEnum, Unit} from "@new-rentals/shared";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {switchMap, tap} from "rxjs";
import {UnitFacadeService} from "../services/unit-facade.service";

@UntilDestroy()
@Component({
  selector: 'new-rentals-flat-lists',
  templateUrl: './flat-lists.component.html',
  styleUrls: ['./flat-lists.component.scss'],
})

export class FlatListsComponent implements OnInit {
  // @ts-ignore
  units: Unit[] = [];
  private map: google.maps.Map;
  // @ViewChild(MapInfoWindow) infoWindow?: MapInfoWindow;
  @ViewChild(MapInfoWindow, {static: false}) infoWindow?: MapInfoWindow;
  filters: any[] = [
    {name: 'Type', icon: 'category'},
    {name: 'Price', icon: 'attach_money'},
    {name: 'Move In Date', icon: 'calendar_month'},
    {name: 'No. of beds', icon: 'account_tree'},
    {name: 'More Filters', icon: 'tune'}
  ];

  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    scrollwheel: true,
    disableDoubleClickZoom: true,
    zoom: 6,
    disableDefaultUI: true
  };

  markers: any[] = [];

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private sharedFacadeService: SharedFacadeService, private unitFacadeService: UnitFacadeService) {
  }

  ngOnInit(): void {
    this.center = {lat: 27.4288601, lng: 89.6532514};
    this.sharedFacadeService.updateSpecificState({}, SharedStoreStateEnum.GEO_CODING_FILTERS);
    this.listenToApartmentListingFilters();
    this.loadMap();
  }

  listenToApartmentListingFilters(): void {
    this.sharedFacadeService.specificStateChange(SharedStoreStateEnum.GEO_CODING_FILTERS).pipe(untilDestroyed(this), switchMap(() => this.unitFacadeService.getUnits()), tap((units) => {
      this.units = units;
      this.setMapCenter(units);
      this.units.forEach(unit => {
        this.addMarkers(unit);
        // geocodeLatLng(unit)
      })
    })).subscribe();
  }

  setMapCenter(units: Unit[]): void {
    // @ts-ignore
    this.map.setCenter({lat: +units[0]?.property?.lat, lng: +units[0]?.property?.lng});
    this.map.setZoom(14);
  }

  loadMap(): void {
    const loader: Loader = new Loader({
      apiKey: 'AIzaSyB_EQUGViEUjZc-T0lWb3RL7POB0_zpJ14',
    })
    loader.load().then(() => {
      const position: { lat: number; lng: number; } = {lat: 27.4716, lng: 89.6386};
      this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: position,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        zoom: 15,
        disableDefaultUI: true,
      });
    }).catch(error => {
      console.log('Maps could not load')
    })
  }

  addMarkers(unit: Unit): void {
    const marker = new google.maps.Marker({
      position: {lat: Number(unit.property.lat), lng: Number(unit?.property?.lng)},
      map: this.map
    })
    const infowindow = new google.maps.InfoWindow({
      content: 'contentString',
    });

    marker.addListener('mouseover', () => {
      infowindow.open({
        // @ts-ignore
        anchor: marker,
        map: this.map,
      });
    })
    infowindow.addListener('click', () => {
      this.routeToDetails()
    })
  }

  dropMarker(event: any): void {
    this.markers.push({
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
      label: {
        color: '#D7385E',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.DROP,
      },
    })
  }

  openInfoWindow(marker: any): void {
    // @ts-ignore
    this.infoWindow.open();
  }

  routeToDetails(unit?: Unit): void {
    this.router.navigate([`${unit?.id}`], {relativeTo: this.route})
  }

}
