import React from "react";
import { Field, Formik, Form } from "formik";
import { Header, Grid, Button } from "semantic-ui-react";

import { OccupationalHealthcareEntry } from '../types';
import { useStateValue } from "../state";
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';

type NewOccuHealthEntry = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: NewOccuHealthEntry) => void;
  onCancel: () => void;
}

export const OccuHealthEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        }
      }}
      onSubmit={onSubmit}
      validate={(values: NewOccuHealthEntry) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />
            <Header size="small">Sick leave</Header>
            <Grid>
              <Grid.Column width={5}>
                <Field
                  label="Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
              </Grid.Column>
              <Grid.Column floated="left" width={5}>
                <Field
                  label="End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </Grid.Column>
            </Grid>

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};