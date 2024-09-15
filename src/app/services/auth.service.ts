import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  server = environment.apiUrl;
  token: string;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.getToken();
  }

  // index of a resource
  get(url) {
    const config = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return this.http.get(`${this.server}${url}`, { headers: config });
  }

  // getSearch() {

  // }

  read() {
    let token = sessionStorage.getItem('token');
    const config = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    return this.http
      .get<any[]>(`${this.server}/user/pending_shipments`, { headers: config })
      .pipe(
        tap((donut) => donut),
        catchError(this.handleError)
      );
    // return this.donuts.slice()
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // clients side
      console.warn('Clients', err.message);
    } else {
      // server side
      console.warn('Server', err.status);
    }
    return throwError(() => new Error(err.message));
  }

  register(url,payload){
    return this.http.post(`${this.server}${url}`, payload,);
  }

  // store a new resource
  store(url, payload) {
  
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    return this.http.post(`${this.server}${url}`, payload, { headers: config });
  }

  verifyDoc(url, token) {
   
    let payload = '';
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    console.log(config);
    return this.http.post(`${this.server}${url}`, payload, { headers: config });
  }
  // store a new resource
  storeAuth(url, payload, token) {
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(`${this.server}${url}`, payload, { headers: config });
  }

  // store a new resource (token added as param)
  verifymail(url, payload, token) {
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(`${this.server}${url}`, payload, { headers: config });
  }

  // show a single resource
  show(url, id, token) {
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get(`${this.server}${url}/${id}`, { headers: config });
  }

  // update a single resource
  updateWithId(url, id, payload) {
    const config = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return this.http.patch(`${this.server}${url}/${id}`, payload, {
      headers: config,
    });
  }
  // update a single resource
  update(url, payload) {
    const config = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return this.http.post(`${this.server}${url}`, payload, {
      headers: config,
    });
  }
  updateTwo(url, payload) {
    const config = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return this.http.patch(`${this.server}${url}`, payload, {
      headers: config,
    });
  }

  // delete a particular resource
  destroy(url, id, token) {
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.delete(`${this.server}${url}/${id}`, { headers: config });
  }
  destroyUrl(url) {
    console.log(url)
    console.log(url)
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    console.log(config)
    return this.http.get(`${this.server}${url}`, { headers: config });
  }


  // authentication for user login
  authenticate(url, payload) {
    const config = new HttpHeaders({});
    config.append('Accept', 'application/json');
    return this.http.post(`${this.server}${url}`, payload, { headers: config });
  }
  // get token

  getToken(): string | null {
    this.token = sessionStorage.getItem('token');
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
    this.router.navigate(['/login']);
    // this.navCtrl.navigateForward("/login", {relativeTo: this.activatedRoute});
  }
  post(url: string, payload: any) {
    const config = new HttpHeaders();
    config.append('Accept', 'application/json');
    return this.http.post('https://' + this.server + url, payload, {
      headers: config,
    });
  }

  delete(url: string) {
   
    const config = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    //config.append('Accept', 'application/json');
    return this.http.delete( this.server + url, { headers: config });
  }


  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return true;
    }

    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

}
