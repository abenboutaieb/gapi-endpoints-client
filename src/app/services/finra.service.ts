import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Apis, ApiVersion} from '../models/apis';


@Injectable({
  providedIn: 'root'
})
export class FinraService {

  private apiUrl = environment.apiUrl;
  private baseUrl = environment.baseUrl;


  constructor() {
  }

  copy(domain: string, bucketName: string, documentId: string, propertyName: string): gapi.client.HttpRequestPromise<any> {
    const url = this.toUrl(Apis.FINRA, 'copy', ApiVersion.V1);
    const params = {domain, bucketName, propertyName, documentId};
    return gapi.client.request({
      path: url,
      method: 'GET',
      params
    });
  }

  delete(domain: string, retentionDocumentId: string, documentId: string): gapi.client.HttpRequestPromise<any> {
    const url = this.toUrl(Apis.FINRA, 'delete', ApiVersion.V1);
    const params = {domain, retentionDocumentId, documentId};
    return gapi.client.request({
      path: url,
      method: 'DELETE',
      params
    });
  }


  protected toUrl(root: string, method: string, version: string): string {
    return this.baseUrl + this.apiUrl + root + (method ? '/' + version + '/' + method : '/' + version);
  }
}


