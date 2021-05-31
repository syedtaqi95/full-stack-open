import React from "react";
import { Field, Formik, Form } from "formik";
import { Header, Grid, Button } from "semantic-ui-react";

import { HospitalEntry } from '../types';
import { useStateValue } from "../state";
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';

type NewHospitalEntry = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: NewHospitalEntry) => void;
  onCancel: () => void;
}

export const HospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "Hospital",
        discharge: {
          date: "",
          criteria: "",
        }
      }}
      onSubmit={onSubmit}
      validate={(values: NewHospitalEntry) => {
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
        if (!values.discharge.criteria || !values.discharge.date) {
          errors.discharge = requiredError;
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
            <Header size="small">Discharge</Header>
            <Grid>
              <Grid.Column width={5}>
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
              </Grid.Column>
              <Grid.Column floated="left" width={5}>
                <Field
                  label="Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
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