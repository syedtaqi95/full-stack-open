import React from 'react';
import {CourseFields} from '../types';

const Content = ({ courseParts }: { courseParts: CourseFields[] }) => {
  return (
    <div>
      {courseParts.map(course => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  )
};

export default Content;