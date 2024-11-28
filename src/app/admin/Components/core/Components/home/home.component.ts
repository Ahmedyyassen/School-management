import { Component } from '@angular/core';
import { RequestService } from '../../../../Services/Api/request.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

constructor(private request : RequestService){
  // this.getRequest();
}

// getRequest():void{
//   this.request.getRequest().subscribe(data=>{
//     console.log(data);

//   })
// }

}
