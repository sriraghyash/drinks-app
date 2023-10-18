import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpClient} from "@angular/common/http"









@Injectable({
    providedIn:'platform'
})
export class APpService {

    public dataModel:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(private http:HttpClient){

    }


    getData():Observable<any>{
        return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Margarita');
    }
}