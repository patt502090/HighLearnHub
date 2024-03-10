import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddAnnouncementPage from '../pages/AddAnnouncementPage';

test('Should Display Page Correctly On First Entry', () => {
  render(<MemoryRouter>< AddAnnouncementPage /></MemoryRouter>);

  const courseTitleInput = screen.getByPlaceholderText(/หัวข้อประกาศ/);
  expect(courseTitleInput).toBeInTheDocument();
  const coursediscountInput = screen.getByPlaceholderText(/ส่วนลด/);
  expect(coursediscountInput).toBeInTheDocument();
  const coursedateInput = screen.getByPlaceholderText(/วันที่/);
  expect(coursedateInput).toBeInTheDocument();
  const coursedescriptInput = screen.getByPlaceholderText(/คำอธิบาย/);
  expect(coursedescriptInput).toBeInTheDocument()
})
test('should display page correctly on first entry', () => {
  // Mock window.alert
  const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
  render(<MemoryRouter><AddAnnouncementPage /></MemoryRouter>);
  const addAnnouncementButton = screen.getByRole('button', {
    name: /เพิ่มประกาศ/i
  });
  expect(addAnnouncementButton).toBeInTheDocument();
  fireEvent.click(addAnnouncementButton);
  expect(mockAlert).toHaveBeenCalledWith('โปรดกรอกข้อมูลให้ครบทุกช่อง');
  mockAlert.mockRestore();
});