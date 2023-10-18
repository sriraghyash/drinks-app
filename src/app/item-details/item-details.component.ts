import { Component, OnInit } from '@angular/core';
import { APpService } from '../APpService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  public itemsCaategories =['Mojito' , 'Margarita'];
  public itemsData :any =[];
  public selectedCategory = '';
  public selectedDrinkType ='';
  public tempItemsData:any[]=[];

  constructor(private service:APpService, private activatedRoute:ActivatedRoute, private router: Router) { }
 
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params:any)=>{
      console.log("params",params);
      this.selectedCategory = params.get('category');
      this.loadByDrikType(this.selectedCategory);
    })
    this.service.dataModel.subscribe(data=>{
      if(!data){
        this.service.getData().subscribe(data=>{
          this.itemsData = data?.drinks;
          this.tempItemsData = JSON.parse(JSON.stringify(this.itemsData));
          this.loadByDrikType(this.selectedCategory);
        })
      } else {
        this.itemsData = data;
        this.tempItemsData = JSON.parse(JSON.stringify(this.itemsData));
        this.loadByDrikType(this.selectedCategory);
      }
    })
  }

  loadByDrikType(type:any){
    if(type){
      const filtered = this.itemsData.filter((x:any)=>x.strDrink.trim().toLowerCase().includes(type.trim().toLowerCase()))
      this.tempItemsData = JSON.parse(JSON.stringify(filtered));
    } else {
      this.tempItemsData = JSON.parse(JSON.stringify(this.itemsData));
    }
  }
  
  searchByType(event:any):void{
    const input = event?.target?.value ? event?.target?.value : event;
    this.selectedDrinkType = input;
    if(input){
      this.tempItemsData = JSON.parse(JSON.stringify(this.itemsData.filter((x:any)=>{
        x['strAlcoholic'].trim().toLowerCase().includes(input.trim().toLowerCase())
      })))
    } else {
      this.tempItemsData = JSON.parse(JSON.stringify(this.itemsData));
    }
  }



  selectItemToDisplay(id?:any){
    this.router.navigate(['item-info'], { queryParams: { itemId: id}})
  }

}
