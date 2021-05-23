import React from 'react';
import { CourseFields } from '../types';

const Total = ({ courseParts }: { courseParts: CourseFields[] }) => {
  const totalExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return <p>Number of exercises {totalExercises}</p>;
}

export default Total;