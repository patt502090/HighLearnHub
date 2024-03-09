import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';

test('LoginPage renders correctly', () => {
  render(
    <Router>
      <RegisterPage />
    </Router>
  );

  const registerButton = screen.getByText('ลงทะเบียนผู้ใช้ด้วยอีเมล');
  const googleLoginButton = screen.getByText('ดำเนินการต่อด้วย Google');
  const loginLink = screen.getByText('เข้าสู่ระบบ');

  expect(registerButton).toBeInTheDocument();
  expect(googleLoginButton).toBeInTheDocument();
  expect(loginLink).toBeInTheDocument();
});

test('Buttons on the registration page do not disable active buttons',()=>{
    render(
        <Router>
          <RegisterPage />
        </Router>
      );
    expect(screen.getByTestId("ButtonRegisterAccount")).not.toBeDisabled();
    expect(screen.getByTestId("ButtonGoogleLoginClick")).not.toBeDisabled();
    expect(screen.getByTestId("ButtonHaveAcccout")).not.toBeDisabled();
})


test('Button Register Account is clickable and can change location to register account page', () => {
    render(
        <Router>
          <RegisterPage />
        </Router>
      );
    const registerButton = screen.getByTestId('ButtonRegisterAccount');
    expect(registerButton).toBeInTheDocument();
    fireEvent.click(registerButton);
    expect(window.location.pathname).toBe("/registerAccount");
  
});

test('Button Have Account is clickable and can change location to login page', () => {
    render(
        <Router>
          <RegisterPage />
        </Router>
      );
    const haveAccountButton = screen.getByTestId('ButtonHaveAcccout');
    expect(haveAccountButton).toBeInTheDocument();
    fireEvent.click(haveAccountButton);
    expect(window.location.pathname).toBe("/login");
  
});

test('Button Google Login is clickable', () => {
    render(
        <Router>
          <RegisterPage />
        </Router>
      );
    const googleLoginButton = screen.getByTestId('ButtonGoogleLoginClick');
    expect(googleLoginButton).toBeInTheDocument();
    fireEvent.click(googleLoginButton);
  
});


