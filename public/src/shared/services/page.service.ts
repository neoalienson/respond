import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PageService {
  constructor (private http: Http) {}

  private _listUrl = 'api/pages/list';
  private _addUrl = 'api/pages/add';
  private _updateSettingsUrl = 'api/pages/settings';
  private _removePageUrl = 'api/pages/remove';

  /**
   * Lists pages
   *
   */
  list () {
    let headers = new Headers();
    headers.append('X-AUTH', 'Bearer ' + localStorage.getItem('id_token'));
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get(this._listUrl, options).map((res:Response) => res.json());
  }

  /**
   * Adds a page
   *
   * @param {string} url
   * @param {string} title
   * @param {string} description
   * @return {Observable}
   */
  add (url: string, title: string, description: string) {

    let body = JSON.stringify({ url, title, description });
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-AUTH', 'Bearer ' + localStorage.getItem('id_token'));
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._addUrl, body, options);

  }

  /**
   * Updates the settings for a page
   *
   * @param {string} url
   * @param {string} title
   * @param {string} description
   * @param {string} keywords
   * @param {string} callout
   * @param {string} layout
   * @param {string} language
   * @param {string} direction
   * @return {Observable}
   */
  updateSettings (url: string, title: string, description: string, keywords: string, callout: string, layout: string, language: string, direction: string) {

    let body = JSON.stringify({ url, title, description, keywords, callout, layout, language, direction });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-AUTH', 'Bearer ' + localStorage.getItem('id_token'));
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._updateSettingsUrl, body, options);

  }

  /**
   * Removes the page
   *
   * @param {string} url
   * @return {Observable}
   */
  remove (url: string) {

    let body = JSON.stringify({ url });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-AUTH', 'Bearer ' + localStorage.getItem('id_token'));
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._removePageUrl, body, options);

  }

}