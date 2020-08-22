import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {


  private API_SERVER_URL = 'https://api.quickshoppinglist.com';
  private CATEGORIZED_ITEM_URL = 'https://s3.ap-south-1.amazonaws.com/quickshoppinglist.com/data/shoppingItems.json';

  constructor(private httpClient: HttpClient) {
  }

  public fetchLatestList(id): Observable<object> {
    console.log(`fetching data by id: ${id}`);
    if (id === undefined) {
      return this.httpClient.get(`${this.API_SERVER_URL}`);
    } else {
      return this.httpClient.get(`${this.API_SERVER_URL}/${id}`);
    }

  }

  public updateData(id, action, item): Observable<object> {
    return this.httpClient.put(`${this.API_SERVER_URL}`, {id, action, item});
  }

  public getCategorizedItems(): Observable<object> {
    const contentHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    return this.httpClient.get(`${this.CATEGORIZED_ITEM_URL}`, { headers: contentHeader });
  }

}

