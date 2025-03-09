import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { TOKEN_KEY } from '../contants/constants';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; 
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  

  constructor(private http: HttpClient,
              private router: Router) { }

   // Fetch the token from local storage
    getToken(): string | null {
      return localStorage.getItem(TOKEN_KEY);
    }

    setToken(token: string): void {
      localStorage.setItem(TOKEN_KEY, token);
    }
  
    // Remove token
    clearToken(): void {
      localStorage.removeItem(TOKEN_KEY);
      this.router.navigateByUrl('/auth');
    }

    //get data
    getData(): Observable<any> {
      return this.http.get<any>(this.apiUrl);
    }
  
    // register
    registerUser(data: any): Observable<any> { 
      return this.http.post<any>(this.apiUrl+'register/', data);
    } 

      //login
    loginUser(data: any): Observable<any> {
      return this.http.post<any>(this.apiUrl+'login/', data, {headers: this.headers, withCredentials: true});
    }
    
    //protect a router
    isLoggedIn(){
      return localStorage.getItem(TOKEN_KEY) != null ? true : false;
    }

    //Decode Token
    decodeToken(): any | null {
      const token = this.getToken(); 
      return token ? jwtDecode(token) : null;
    }

     //get total users
     getTotalUsers(): Observable<any> {
      return this.http.get<any>(this.apiUrl+'totalusers/');
    }

     //get users lists
    userLists(): Observable<any> {
      return this.http.post<any>(this.apiUrl + 'userlist/', {});
    }
    
}
