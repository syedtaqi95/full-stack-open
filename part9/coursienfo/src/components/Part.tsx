import React from 'react';
import { CoursePart } from '../types';

const Part = ({ course }: { course: CoursePart }) => {

  // Helper function for exhaustive type checking
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  let courseDetails;
  switch (course.type) {
    case 'normal':
      courseDetails = <i>{course.description}</i>;
      break;
    case 'groupProject':
      courseDetails = <>project exercises {course.groupProjectCount}</>
      break;
    case 'submission':
      courseDetails = (<>
        <i>{course.description}</i>
        <br />
        submit to <a href={course.exerciseSubmissionLink}>{course.exerciseSubmissionLink}</a>
      </>)
      break;
    case 'special':
      courseDetails = (<>
        <i>{course.description}</i>
        <br />
        required skills: {course.requirements.join(', ')}
      </>)
      break;
    default:
      return assertNever(course);
  }

  return <p>
    <b>{course.name} {course.exerciseCount}</b>
    <br />
    {courseDetails}
  </p>
};

export default Part;