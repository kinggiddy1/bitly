import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      // Client-side errors
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } 
      // Server-side errors
      else {
        // Check if there's a detailed error response from the backend
        const errorBody = error.error;

        switch (error.status) {
          case 400:
            // Handle specific 400 error format
            if (errorBody && errorBody.msg) {
              errorMessage = errorBody.msg;
            } else {
              errorMessage = 'Bad Request: The request was invalid';
            }
            break;
          case 401:
            if (errorBody && errorBody.msg) {
              errorMessage = errorBody.msg;
            } else {
              errorMessage = 'Unauthorized: Authentication failed';
            }
            break;
          case 403:
            errorMessage = 'Forbidden: You do not have permission to access this resource';
            break;
          case 404:
            errorMessage = 'Not Found: The requested resource could not be found';
            break;
          case 500:
            errorMessage = 'Internal Server Error: Something went wrong on the server';
            break;
          case 502:
            errorMessage = 'Bad Gateway: The server is temporarily unavailable';
            break;
          case 503:
            errorMessage = 'Service Unavailable: The server is overloaded or down for maintenance';
            break;
          default:
            errorMessage = `Server Error: ${error.status} - ${error.message}`;
        }
      }

      // Display error notification
      toastr.error(errorMessage, 'Error', {
        closeButton: true,
        timeOut: 3000,
        progressBar: true,
        easing: 'ease-in',
        easeTime: 300,
        toastClass: 'custom-toast custom-toast-error',
        titleClass: 'custom-toast-title',
        messageClass: 'custom-toast-message'
      });


      //console.error('Full Error:', error);

      // Return an observable with the error
      return throwError(() => error);
    })
  );
};