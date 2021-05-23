import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map(course => <Part key={course.name} course={course} />)}
    </>
  )
};

export default Content;