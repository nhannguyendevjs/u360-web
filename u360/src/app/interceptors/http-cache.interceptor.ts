import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpRequest, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, shareReplay } from 'rxjs/operators';

export const httpCacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cache = inject(HttpRequestCache);

  // processing only GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  // if the request is not cached yet
  if (!cache.has(req)) {
    // we should create a new request
    const response = next(req).pipe(
      // when the request is completed we should clean cache
      finalize(() => cache.delete(req)),
      // and don't forget to share the Observable between subscribers
      shareReplay({ refCount: true, bufferSize: 1 })
    );
    // after that we put the request into the cache
    cache.set(req, response);
  }

  return cache.get(req);
};

@Injectable({ providedIn: 'root' })
export class HttpRequestCache {
  // Using the object gives more performance than a Map
  private readonly requests: Record<string, Observable<HttpEvent<any>>> = {};

  public has(request: HttpRequest<any>): boolean {
    return this.key(request) in this.requests;
  }

  public get(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.requests[this.key(request)];
  }

  public set(request: HttpRequest<any>, response: Observable<HttpEvent<any>>): void {
    this.requests[this.key(request)] = response;
  }

  public delete(request: HttpRequest<any>): void {
    delete this.requests[this.key(request)];
  }

  private key(request: HttpRequest<any>): string {
    return [request.urlWithParams, request.responseType].join('#');
  }
}
