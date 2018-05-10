import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;
  marker: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
    // setInterval(() => { this.getPositionCurrent(); }, 1000);
  }
  ionViewDidLoad(){
     this.getPosition();
   this.setMap(); 
  
  }
  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {  
        this.loadMap(response); 
    })
    
  }
  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
  
    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};
  
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 20
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      
         this.marker = new google.maps.Marker({
          position: myLatLng,
          map: this.map
        });
        // console.log(myLatLng);
      
      
      mapEle.classList.add('show-map');
    });
  }
  setMap(){
    this.geolocation.watchPosition().subscribe(res => {  
      let myLatLng = {lat: res.coords.latitude, lng: res.coords.longitude};
      this.setMyMap(myLatLng, this.map);
    })
  }
  setMyMap(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    map.setCenter(latLng);
    map.panTo(latLng);
    console.log(latLng);
  }
  
    
}
