import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavBarAdmin } from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.css';
import '../components/Homepage/homepage.css';
import { Table } from 'antd';

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('http://localhost:8000/courses', {
          headers: {
            'Content-Type': 'text/plain',
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCourses();
  }, []);

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Course Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Professor',
      dataIndex: 'professor',
      key: 'professor',
    },
    {
      title: 'Semester',
      dataIndex: 'semester',
      key: 'semester',
    },
  ];

  return (
    <div>
      <NavBarAdmin />
      <div className='con d-flex flex-row justify-content-between'>
        <h1 className='hea_1'>Courses</h1>
      </div>
      <Table dataSource={courses} columns={columns} />
    </div>
  );
};
