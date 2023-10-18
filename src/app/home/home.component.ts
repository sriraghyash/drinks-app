import { Component, OnInit } from '@angular/core';
import { APpService } from '../APpService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public itemsCaategories: any[] = [];
  public itemsData: any = [];
  public tempItemsData: any[] = [];

  constructor(private service: APpService, private router: Router) { }

  ngOnInit(): void {
    this.service.dataModel.subscribe(data => {
      if (!data) {
        this.service.getData().subscribe(data => {
          this.itemsData = data?.drinks;
          this.service.dataModel.next(data?.drinks);
          this.tempItemsData = JSON.parse(JSON.stringify(this.itemsData));
          this.buildLogic();
        })
      } else {
        this.itemsData = data;
        this.service.dataModel.next(data);
        this.tempItemsData = JSON.parse(JSON.stringify(this.itemsData));
        this.buildLogic();
      }
    })
  }

  navigateCategory(event: any) {
    const value = event?.target.getInnerHTML() ?? event?.target?.value;
    this.router.navigate(['item-details'], { queryParams: { category: value }})
  }

  buildLogic(): void {
    this.itemsData.forEach((x: any) => {
      if (!this.itemsCaategories.includes(x['strDrink']))
        this.itemsCaategories.push(x['strDrink'])
    })
    this.itemsCaategories
  }

}
