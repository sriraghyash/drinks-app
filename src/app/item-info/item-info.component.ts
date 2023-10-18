import { Component, OnInit } from '@angular/core';
import { APpService } from '../APpService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {


  public selectedId: any;
  public itemsData: any = [];
  public itemSelected: any;

  constructor(private appService: APpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params: any) => {
      console.log("params", params);
      this.selectedId = params.get('itemId');
      setTimeout(()=>{this.loadItem(this.selectedId)},0);
    })
    this.appService.dataModel.subscribe(data => {
      if (!data) {
        this.appService.getData().subscribe(data => {
          this.itemsData = data?.drinks;
          setTimeout(()=>{this.loadItem(this.selectedId)},0);
        })
      } else {
        this.itemsData = data;
        setTimeout(()=>{this.loadItem(this.selectedId)},0);
      }
    })
  }


  loadItem(id: any) {
    this.itemSelected ={};
     const filtered = this.itemsData?.filter((x: any) => x.idDrink == id);
     if(!!filtered && filtered?.length>0)
     this.itemSelected = JSON.parse(JSON.stringify(filtered[0]));
  }

}
