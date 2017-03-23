import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Contact } from './contact';
import { ContactClass } from './contact-class';

const userId = "ELTON";

@Injectable()
export class ApiService {

  classApiUrl: string = 'http://localhost/Api/LAB1/api/ContactClasses';
  contactApiUrl: string = 'http://localhost/Api/LAB1/api/Contacts';

  constructor(private http: Http) { }

  getClasses() {
    return this.http.get(this.classApiUrl)
      .toPromise()
      .then(response => response.json() as ContactClass[])
      .catch(this.handleError);
  }

  getContacts() {
    return this.http.get(this.contactApiUrl + "byclass/classId/A")
      .toPromise()
      .then(response => response.json() as Contact[])
      .catch(this.handleError);
  }


  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
