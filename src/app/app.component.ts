import { Component ,OnInit } from '@angular/core';
import { APpService } from './APpService';
import { FormGroup ,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public title:string = 'sample';
  public data:any;
  constructor(private service:APpService){}
  
  public ngOnInit():void{
    this.service.getData().subscribe(data=>{
      this.data = data?.drinks;
      this.service.dataModel.next(this.data);
    })
  }
}
