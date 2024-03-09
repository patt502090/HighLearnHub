import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import HistoryPage from '../pages/HistoryPage';
import ax from '../conf/ax';
jest.mock('../conf/ax'); 

test('Should Display No Courses Message When No Courses Booked', async () => {
  render(
    <Router> 
      <HistoryPage />
    </Router>
  );
  
  await screen.findByText(/ไม่มีคอร์สที่ซื้อแล้ว/i);
  
  const noCoursesMessage = screen.getByText(/ไม่มีคอร์สที่ซื้อแล้ว/i);
  expect(noCoursesMessage).toBeInTheDocument();
});

test('Should Display Courses When Courses Are Booked', async () => {
  const mockBookedCourses = [
    {
      id: 1,
      course: {
        id: 1,
        title: 'Course Title 1',
        image: { url: 'course1.jpg' },
        price: 100,
      },
      createdAt: new Date().toISOString(),
      status: 'success',
    },
    {
      id: 2,
      course: {
        id: 2,
        title: 'Course Title 2',
        image: { url: 'course2.jpg' },
        price: 200,
      },
      createdAt: new Date().toISOString(),
      status: 'pending',
    },
  ];

  ax.get.mockImplementation(() => Promise.resolve({ data: { bookings: mockBookedCourses } }));

  render(
    <Router> 
      <HistoryPage />
    </Router>
  );

  await screen.findByText(/Course Title 1/i);
  await screen.findByText(/Course Title 2/i);

  const courseTitle1 = screen.getByText(/Course Title 1/i);
  expect(courseTitle1).toBeInTheDocument();

  const courseTitle2 = screen.getByText(/Course Title 2/i);
  expect(courseTitle2).toBeInTheDocument();
});
