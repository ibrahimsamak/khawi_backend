import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "src/app/service/ConstantServiceWrapper.service";
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-drivers-map',
  templateUrl: './drivers-map.component.html',
  styleUrls: ['./drivers-map.component.scss']
})
export class DriversMapComponent implements OnInit {
  // Map1
  public lat_m1: number = 20.593683;
  public lng_m1: number = 78.962883;
  public zoom_m1: number = 15;

  public markers: marker[] = [];
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private db2: AngularFireDatabase,

  ) {}

  public mapClicked(e) {}


  ngOnInit() {
   // this.getData();
   this.getDataFirebase()
  }

  getData() {
    this.helper.driversOnFirebase().subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        arr.forEach((element) => {
          let obj = {
            lat: element.lat,
            lng: element.lng,
            name: element.name,
            phone:element.phone,
            icon: this.mapIcon(element.status),
            animation: "DROP",
				   	nameData: element.name +"-"+ element.phone,
            label: "",
            draggable: false,
          };
          this.markers.push(obj);
          this.lat_m1 = element.lat;
          this.lng_m1 = element.lng;
        });
      } else {
        this.toastr.error(x[appConstant.MESSAGE]);
      }
    });
  }

  getDataFirebase() {
    this.db2.list('/userLocation/').valueChanges().subscribe((x) => {
      if (x) {
        console.log(x)
        // let userObj = JSON.parse(localStorage.getItem('auth_user'))
        // let id = userObj['supplier_id']
        
        this.markers = []
        x.forEach(element => {
          // if (element['supplier_id'] == id) {
            let location = element['l']
            if(element['l'] && location.length>0){
              let content = {
                lat: location[0],
                lng: location[1],
                name:  element['driverName'],
                phone: element['driverPhone'],
                icon: this.mapIcon(element['isAvailable']),
                animation: "DROP",
                nameData: element['driverName'] +"-"+ element['driverPhone'],
                label: "",
                draggable: false,
              };
              this.markers.push(content)
            // }
            this.lat_m1 = location[0];
            this.lng_m1 = location[1]
            }else{

            }
   
        });
      }
    })
  }
  
  mapIcon(val) {
		var icon = {};
		switch (val) {
			case true:
				icon = {
					url: "../../../../assets/images/map/finish.png",
					scaledSize: { height: 35, width: 25 },
				};
				break;
			case false:
				icon = {
					url: "../../../../assets/images/map/cancel.png",
					scaledSize: { height: 35, width: 25 },
				};
				break;
			default:
				icon = {
					url: "../../../../assets/images/map/cancel.png",
					scaledSize: { height: 35, width: 25 },
				};
		}
		return icon;
	}
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  nameData: String;
}

interface LatLngLiteral {
  lat: number;
  lng: number;
}
