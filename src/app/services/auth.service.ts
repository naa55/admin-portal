import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server = environment.apiUrl;
  token: string;
  

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,
    ) {

   }

     // index of a resource
  get(url , token) {
    const config = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.get(`${this.server}${url}`, { headers: config });
  }

  // getSearch() {

  // }

  read() {
    let token = sessionStorage.getItem('token')
    const config = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

   return this.http.get<any[]>(`${this.server}/user/pending_shipments`, {headers: config})
          .pipe(tap((donut) =>  donut),
         catchError(this.handleError)
          )
    // return this.donuts.slice()
  }

  private handleError(err: HttpErrorResponse) {
    if(err.error instanceof ErrorEvent) {
        // clients side
        console.warn('Clients',err.message)
    } else {
      // server side
      console.warn('Server',err.status)
    }
    return throwError(() => new Error(err.message))

}

  // store a new resource
  store(url, payload) {
    const config = new HttpHeaders({
      Authorization: "Bearer " + this.token,
    });
    return this.http.post(`${this.server}${url}`, payload, { headers: config });
  }

  verifyDoc(url, token) {
    console.log(token)  
    let payload = ''
    const config = new HttpHeaders({
      Authorization: "Bearer " + token,
    });
    console.log(config)
    return this.http.post(`${this.server}${url}`, payload, { headers: config });
  
  }
  // store a new resource
  storeAuth(url, payload, token) {
    const config = new HttpHeaders({
      Authorization: "Bearer " + token,
    });
    return this.http.post(`${this.server}${url}`, payload, { headers: config });
  }

  // store a new resource (token added as param)
  verifymail(url, payload, token) {
    const config = new HttpHeaders({
      Authorization: "Bearer " + token,
    });
    return this.http.post(`${this.server}${url}`, payload, { headers: config });
  }

  // show a single resource
  show(url, id, token) {
    const config = new HttpHeaders({
      Authorization: "Bearer " + token,
    });
    return this.http.get(`${this.server}${url}/${id}`, { headers: config });
  }

  // update a single resource
  updateWithId(url, id, payload, token) {
    const config = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.patch(`${this.server}${url}/${id}`, payload, {
      headers: config,
    });
  }
  // update a single resource
  update(url, payload, token) {
    const config = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.patch(`${this.server}${url}`, payload, {
      headers: config,
    });
  }

  // delete a particular resource
  destroy(url, id, token) {
    const config = new HttpHeaders({
      Authorization: "Bearer " + token,
    });
    return this.http.delete(`${this.server}${url}/${id}`, { headers: config });
  }
  destroyShip(url, id, token) {
    const config = new HttpHeaders({
      Authorization: "Bearer " + token,
    });
    return this.http.delete(`${this.server}${url}?shipment=${id}`, { headers: config });
  }

  // authentication for user login
  authenticate(url, payload) {
    const config = new HttpHeaders({
    });
    config.append("Accept", "application/json");
    return this.http.post(`${this.server}${url}`, payload, {  headers: config });
  }
  // get token

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }
  // logout method
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    // this.navCtrl.navigateForward("/login", {relativeTo: this.activatedRoute});
  }
  post(url : string, payload : any){
    const config = new HttpHeaders();
    config.append("Accept", "application/json");
    return this.http.post("https://" + this.server + url, payload,
      { headers: config, }
    );
   }

  // async presentLoading() {
  //   let loading = await this.loadCtrl.create({
  //     message: "Please Wait ...",
  //     animated: true,
  //     showBackdrop: true,
  //     backdropDismiss: false,
  //     spinner: "lines"
  //   });
  //   loading.present();
  // }
}
