import { Box, Button } from '@mui/material';
import { Label, Select, TextInput, Textarea } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';

export default function AddCoursePage(props) {
    const [courseData, setCourseData] = useState({
        title: '',
        subject: '',
        instructor_name: '',
        price: '',
        description: '',
        detail: '',
        study_type: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:1337/api/courses', courseData);
            console.log(response.data); 
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };
    

    return (
        <Box className="p-4">
            <h3 className="text-2xl text-center font-medium text-gray-900 dark:text-white mb-6">เพิ่มคอร์ส</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="title" value="ชื่อคอร์ส" />
                    <TextInput
                        id="title"
                        name="title"
                        placeholder="ชื่อคอร์ส"
                        value={courseData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="subject" value="วิชา" />
                    <Select
                        id="subject"
                        name="subject"
                        value={courseData.subject}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled hidden>เลือกวิชา</option>
                        <option value="วิทยาศาสตร์">วิทยาศาสตร์</option>
                        <option value="คณิตศาสตร์">คณิตศาสตร์</option>
                        <option value="ภาษาอังกฤษ">ภาษาอังกฤษ</option>
                        <option value="ภาษาไทย">ภาษาไทย</option>
                        <option value="สังคมศึกษา">สังคมศึกษา</option>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="instructor_name" value="ชื่อผู้สอน" />
                    <TextInput
                        id="instructor_name"
                        name="instructor_name"
                        placeholder="ชื่อผู้สอน"
                        value={courseData.instructor_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="price" value="ราคา" />
                    <TextInput
                        id="price"
                        name="price"
                        placeholder="ราคา"
                        type="number"
                        min="0"
                        value={courseData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-span-2">
                    <Label htmlFor="description" value="คำอธิบาย" />
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="คำอธิบาย"
                        value={courseData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-span-2">
                    <Label htmlFor="detail" value="รายละเอียด" />
                    <Textarea
                        id="detail"
                        name="detail"
                        placeholder="รายละเอียด"
                        value={courseData.detail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="study_type" value="รูปแบบการเรียน" />
                    <Select
                        id="study_type"
                        name="study_type"
                        value={courseData.study_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled hidden>เลือกรูปแบบการเรียน</option>
                        <option value="Online">ออนไลน์</option>
                        <option value="Live">สดออนไลน์</option>
                    </Select>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <Button onClick={handleSubmit} variant="contained" color="primary">เพิ่มคอร์ส</Button>
            </div>
        </Box>
    );
}
