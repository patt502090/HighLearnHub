import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddCoursePage from '../pages/AddCoursePage';

test('Should Display Page Correctly On First Entry', () => {
    render(<MemoryRouter><AddCoursePage /></MemoryRouter>);

    const courseTitleInput = screen.getByPlaceholderText(/ชื่อคอร์ส/);
    expect(courseTitleInput).toBeInTheDocument();

    const courseSubjectSelector = screen.getByDisplayValue(/เลือกวิชา/);
    expect(courseSubjectSelector).toBeInTheDocument();

    const courseInstructorInput = screen.getByPlaceholderText(/ชื่อผู้สอน/);
    expect(courseInstructorInput).toBeInTheDocument();

    const coursePriceInput = screen.getByPlaceholderText(/ราคา/);
    expect(coursePriceInput).toBeInTheDocument();

    const courseDescriptionInput = screen.getByPlaceholderText(/คำอธิบาย/);
    expect(courseDescriptionInput).toBeInTheDocument();

    const courseLessonInput = screen.getByDisplayValue(/เลือกรูปแบบการเรียน/);
    expect(courseLessonInput).toBeInTheDocument();

    const courseFileInput = screen.getByText(/รูปปกคอร์ส/);
    expect(courseFileInput).toBeInTheDocument();
})

test('Should Display Correctly When Input Changed', () => {
    render(<MemoryRouter><AddCoursePage /></MemoryRouter>);

    const courseDescriptionInput = screen.getByPlaceholderText(/คำอธิบาย/);
    fireEvent.change(courseDescriptionInput, { target: { value: 'สวัสดีโลก!!' } })
    expect(courseDescriptionInput.textContent).toContain('สวัสดีโลก!!');
})

test('Should Require All Fields', () => {
    render(<MemoryRouter><AddCoursePage /></MemoryRouter>);

    const courseDescriptionInput = screen.getByPlaceholderText(/คำอธิบาย/);
    fireEvent.change(courseDescriptionInput, { target: { value: 'สวัสดีโลก!!' } });
    expect(courseDescriptionInput.value).toBe('สวัสดีโลก!!');

    const addCourseButton = screen.getByRole('button', {
        name: /เพิ่มคอร์ส/i
    });
    expect(addCourseButton).toBeInTheDocument();

    const originalAlert = window.alert;
    window.alert = jest.fn();
    fireEvent.click(addCourseButton);
    expect(window.alert).toHaveBeenCalledWith('โปรดกรอกข้อมูลให้ครบทุกช่อง');
    window.alert = originalAlert;
});