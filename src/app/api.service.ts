import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ContactClass } from './contact-class';
import { Contact } from './contact';

@Injectable()
export class ApiService {

  isPrivate: boolean = true;
  contactApiUrl: string;
  classApiUrl: string;

  constructor(private http: Http) {
  }

  postClass(item: ContactClass): Promise<ContactClass> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.classApiUrl, JSON.stringify(item), { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  getClasses() {
    return this.http.get(this.classApiUrl+"?userid=ELTON")
      .toPromise()
      .then(response => response.json() as ContactClass[])
      .catch(this.handleError);
  }
  getClass(id: string) {
    let url = `${this.classApiUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as ContactClass)
      .catch(this.handleError);
  }
  // Update existing Hero
  putClass(item: ContactClass) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.classApiUrl}/${item.ClassId}`;
    return this.http
      .put(url, JSON.stringify(item), { headers: headers })
      .toPromise()
      .then(() => item)
      .catch(this.handleError);
  }
  deleteClass(id: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.classApiUrl}/${id}`;
    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }






  getContacts(classId: string) {
    return this.http.get(this.contactApiUrl + "/byclass/" + classId)
      .toPromise()
      .then(response => response.json() as Contact[])
      .catch(this.handleError);
  }
  getContact(contactId: string) {
    return this.http.get(this.contactApiUrl + "/" + contactId)
      .toPromise()
      .then(response => response.json() as Contact)
      .catch(this.handleError);
  }
  postContact(item: Contact): Promise<Contact> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.contactApiUrl, JSON.stringify(item), { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  putContact(item: Contact) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.contactApiUrl}/${item.ContactId}`;
    return this.http
      .put(url, JSON.stringify(item), { headers: headers })
      .toPromise()
      .then(() => item)
      .catch(this.handleError);
  }
  deleteContact(id: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.contactApiUrl}/${id}`;
    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }






  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
