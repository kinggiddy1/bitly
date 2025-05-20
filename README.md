# LIVE URL OF THE WEBSITE

https://url-shortener.thefocalmedia.com/

# Bitly   

T# URL Shortener Application - Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
   - [Local Development Setup](#local-development-setup)
3. [Authentication Details](#authentication-details)
   - [JWT Implementation](#jwt-implementation)

## Project Overview

This application is a full-stack URL shortener with features similar to Bit.ly. It provides:

- Secure user authentication
- URL shortening capabilities
- Analytics for shortened URLs
- User-specific URL management
- Modern, responsive UI

## Setup Instructions

### Prerequisites

- Node.js v20.17.0 (for backend and frontend)
- MySQL (for database)
- npm

### Local Development Setup

#### Backend Setup

````bash
# Clone the repository
git https://github.com/kinggiddy1/bitly.git
cd bitly

# Install dependencies
npm install    (nstall  in order to install all necessary packages)


```bash
ng serve
````

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Navigate to create account to be able to use the sysem

http://localhost:4200/auth

## Authentication Details

email: egide@gmail.com
password: 123

or create an account

### JWT Implementation

The application uses a secure JWT-based authentication system:

- **Access Tokens**: Short-lived JWTs (1 hour) for API authorization
- **Token Storage**: Access tokens stored in local storage

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

## Building

To build the project run:

```bash
ng build
```


## unit Tests for Authentication

# Authentication Component Tests

This file contains comprehensive unit tests for the AuthenticationComponent. These tests verify the component's functionality including form validation, view toggling, service interactions, and role-based navigation.

## Test Coverage

- Component creation
- Form validation for login and registration
- View toggling between login and registration forms
- Authentication service interactions
- Role-based navigation
- Error handling

## Running the Tests

To run these tests:
1. Make sure you have Jasmine and Karma set up in your Angular project
2. Run `ng test` in your terminal
3. The test results will be displayed in the terminal and in a browser window

## Test Code

```typescript

// Test codes

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthenticationComponent } from './authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../text-input/text-input/text-input.component';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['registerUser', 'loginUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        AuthenticationComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // To ignore errors from child components like TextInputComponent
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should initialize with login form by default', () => {
      expect(component.isLoginView).toBeTruthy();
      expect(component.loginForm).toBeDefined();
    });

    it('should have invalid login form when empty', () => {
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should validate email field in login form', () => {
      const emailControl = component.loginForm.controls['email'];
      
      emailControl.setValue('');
      expect(emailControl.valid).toBeFalsy();
      expect(emailControl.errors?.['required']).toBeTruthy();
      
      emailControl.setValue('invalid-email');
      expect(emailControl.valid).toBeFalsy();
      expect(emailControl.errors?.['email']).toBeTruthy();
      
      emailControl.setValue('valid@example.com');
      expect(emailControl.valid).toBeTruthy();
    });

    it('should validate password field in login form', () => {
      const passwordControl = component.loginForm.controls['password'];
      
      passwordControl.setValue('');
      expect(passwordControl.valid).toBeFalsy();
      expect(passwordControl.errors?.['required']).toBeTruthy();
      
      passwordControl.setValue('12');
      expect(passwordControl.valid).toBeFalsy();
      expect(passwordControl.errors?.['minlength']).toBeTruthy();
      
      passwordControl.setValue('123');
      expect(passwordControl.valid).toBeTruthy();
    });

    it('should have valid login form when all fields are correctly filled', () => {
      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['password'].setValue('password123');
      
      expect(component.loginForm.valid).toBeTruthy();
    });

    it('should have invalid register form when empty', () => {
      component.isLoginView = false;
      fixture.detectChanges();
      
      expect(component.registerForm.valid).toBeFalsy();
    });

    it('should validate register form fields', () => {
      component.isLoginView = false;
      fixture.detectChanges();
      
      const usernameControl = component.registerForm.controls['username'];
      const emailControl = component.registerForm.controls['email'];
      const passwordControl = component.registerForm.controls['password'];
      
      // Test all empty
      expect(usernameControl.valid).toBeFalsy();
      expect(emailControl.valid).toBeFalsy();
      expect(passwordControl.valid).toBeFalsy();
      
      // Fill in valid values
      usernameControl.setValue('testuser');
      emailControl.setValue('test@example.com');
      passwordControl.setValue('password123');
      
      expect(usernameControl.valid).toBeTruthy();
      expect(emailControl.valid).toBeTruthy();
      expect(passwordControl.valid).toBeTruthy();
      expect(component.registerForm.valid).toBeTruthy();
    });
  });

  describe('View toggling', () => {
    it('should switch from login to register view', () => {
      // Initial state is login view
      expect(component.isLoginView).toBeTruthy();
      
      // Find and click the "Sign Up" link
      component.isLoginView = false;
      fixture.detectChanges();
      
      expect(component.isLoginView).toBeFalsy();
    });

    it('should switch from register to login view', () => {
      // Set initial state to register view
      component.isLoginView = false;
      fixture.detectChanges();
      
      // Find and click the "Login" link
      component.isLoginView = true;
      fixture.detectChanges();
      
      expect(component.isLoginView).toBeTruthy();
    });
  });

  describe('Authentication Service Interaction', () => {
    it('should call loginUser method when login form is submitted', fakeAsync(() => {
      // Set up login form
      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['password'].setValue('password123');
      
      // Mock successful response
      const mockResponse = { token: 'fake-jwt-token' };
      authService.loginUser.and.returnValue(of(mockResponse));
      
      // Call the method
      component.loginUserForm();
      tick();
      
      // Verify service was called with correct data
      expect(authService.loginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    }));

    it('should call registerUser method when register form is submitted', fakeAsync(() => {
      // Switch to register view
      component.isLoginView = false;
      fixture.detectChanges();
      
      // Set up register form
      component.registerForm.controls['username'].setValue('testuser');
      component.registerForm.controls['email'].setValue('test@example.com');
      component.registerForm.controls['password'].setValue('password123');
      
      // Mock successful response
      const mockResponse = { token: 'fake-jwt-token' };
      authService.registerUser.and.returnValue(of(mockResponse));
      
      // Call the method
      component.registerUserForm();
      tick();
      
      // Verify service was called with correct data
      expect(authService.registerUser).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    }));

    it('should handle login error', fakeAsync(() => {
      // Set up login form
      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['password'].setValue('password123');
      
      // Mock error response
      const mockError = { status: 401, message: 'Invalid credentials' };
      authService.loginUser.and.returnValue(throwError(() => mockError));
      
      // Spy on console.log
      spyOn(console, 'log');
      
      // Call the method
      component.loginUserForm();
      tick();
      
      // Verify error was logged
      expect(console.log).toHaveBeenCalledWith(mockError);
    }));

    it('should handle register error', fakeAsync(() => {
      // Switch to register view
      component.isLoginView = false;
      fixture.detectChanges();
      
      // Set up register form
      component.registerForm.controls['username'].setValue('testuser');
      component.registerForm.controls['email'].setValue('test@example.com');
      component.registerForm.controls['password'].setValue('password123');
      
      // Mock error response
      const mockError = { status: 400, message: 'Email already exists' };
      authService.registerUser.and.returnValue(throwError(() => mockError));
      
      // Spy on console.log
      spyOn(console, 'log');
      
      // Call the method
      component.registerUserForm();
      tick();
      
      // Verify error was logged
      expect(console.log).toHaveBeenCalledWith(mockError);
    }));
  });

  describe('Navigation based on role', () => {
    it('should navigate admin users to dashboard', fakeAsync(() => {
      // Mock jwt-decode to return admin role
      spyOn(window as any, 'jwtDecode').and.returnValue({ role: 'Admin' });
      
      // Set up login form
      component.loginForm.controls['email'].setValue('admin@example.com');
      component.loginForm.controls['password'].setValue('admin123');
      
      // Mock successful response
      const mockResponse = { token: 'fake-admin-token' };
      authService.loginUser.and.returnValue(of(mockResponse));
      
      // Call the method
      component.loginUserForm();
      tick();
      
      // Verify navigation
      expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
    }));

    it('should navigate regular users to dashboard', fakeAsync(() => {
      // Mock jwt-decode to return user role
      spyOn(window as any, 'jwtDecode').and.returnValue({ role: 'User' });
      
      // Set up login form
      component.loginForm.controls['email'].setValue('user@example.com');
      component.loginForm.controls['password'].setValue('user123');
      
      // Mock successful response
      const mockResponse = { token: 'fake-user-token' };
      authService.loginUser.and.returnValue(of(mockResponse));
      
      // Call the method
      component.loginUserForm();
      tick();
      
      // Verify navigation
      expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
    }));

    it('should handle unknown role', fakeAsync(() => {
      // Mock jwt-decode to return unknown role
      spyOn(window as any, 'jwtDecode').and.returnValue({ role: 'Unknown' });
      spyOn(console, 'warn');
      
      // Set up login form
      component.loginForm.controls['email'].setValue('unknown@example.com');
      component.loginForm.controls['password'].setValue('unknown123');
      
      // Mock successful response
      const mockResponse = { token: 'fake-unknown-token' };
      authService.loginUser.and.returnValue(of(mockResponse));
      
      // Call the method
      component.loginUserForm();
      tick();
      
      // Verify warning was logged
      expect(console.warn).toHaveBeenCalledWith('Unknown role:', 'Unknown');
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    }));
  });
});
