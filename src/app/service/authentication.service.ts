import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtResponse} from '../interface/Jwt-Response';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../interface/user';

const API_URL = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<JwtResponse>;
  private currentUserSubject: BehaviorSubject<JwtResponse>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): JwtResponse {
    return this.currentUserSubject.value;
  }

  login(loginForm) {
    return this.http.post<any>(`${API_URL}/login`, loginForm).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  register(user: Partial<User>): Observable<any> {
    return this.http.post<any>(`${API_URL}/register`, user);
  }

  updateProfile(user: Partial<User>): Observable<any> {
    return this.http.put<any>(`${API_URL}/edit-profile`, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  confirmPasswordUser(password: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/confirmPassword`, password);
  }
}
