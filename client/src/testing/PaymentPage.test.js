import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PaymentPage from '../pages/PaymentPage';
import { BrowserRouter as Router } from 'react-router-dom'; 

describe('PaymentPage component', () => {
  test('renders file upload and buttons', () => {
    const { getByText } = render(<Router><PaymentPage /></Router>);

    const uploadLabel = getByText('อัปโหลดสลิปรูปภาพ');
    expect(uploadLabel).toBeInTheDocument();

    const proceedButton = getByText('ดำเนินการต่อ');
    expect(proceedButton).toBeInTheDocument();
    expect(proceedButton).toBeDisabled();
  });

  test('allows file upload and enables proceed button', async () => {
    const { getByText, getByLabelText } = render(<Router><PaymentPage /></Router>);

    const fileInput = getByLabelText('อัปโหลดสลิปรูปภาพ');
    const file = new File([''], 'payment_slip.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toEqual(file);
    await waitFor(() => expect(getByText('ดำเนินการต่อ')).toBeEnabled());
  });

  test('displays modal on proceed click', async () => {
    const { getByText, getByLabelText } = render(<Router><PaymentPage /></Router>);

    const fileInput = getByLabelText('อัปโหลดสลิปรูปภาพ');
    const file = new File([''], 'payment_slip.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(getByText('ดำเนินการต่อ'));

    const modalTitle = getByText('โปรดตรวจสอบสลีปก่อนกดยืนยันการชำระเงิน');
    expect(modalTitle).toBeInTheDocument();
  });

  test('executes handlePaymentConfirmation on modal confirm click', async () => {
    const { getByText, getByLabelText } = render(<Router><PaymentPage /></Router>);

    const fileInput = getByLabelText('อัปโหลดสลิปรูปภาพ');
    const file = new File([''], 'payment_slip.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(getByText('ดำเนินการต่อ'));
    fireEvent.click(getByText('ยืนยันการชำระเงิน'));
  });
});
