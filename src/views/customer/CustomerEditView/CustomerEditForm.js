import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Button,
  makeStyles,
} from '@material-ui/core';
import wait from 'src/utils/wait';
import CustomerInformationForm from './CustomerInformationForm'
import CustomerContactForm from './CustomerContactForm'
import CustomerRelationshipForm from './CustomerRelationshipForm'
import CustomerWorkForm from './CustomerWorkForm'
import CustomerFinancialInfo from './CustomerFinancialInfo';

const useStyles = makeStyles(() => ({
  root: {},
  card: {
    marginTop: 20,
  }
}));


const CustomerEditForm = ({
  className,
  customer,
  ...rest
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        firstName: customer.firstName || '', //done
        lastName: customer.lastName || '', //done
        placeOfBirth: customer.placeOfBirth || '', //done
        DOB: customer.DOB || '', //done
        nationalId: customer.nationalId || '', //done
        nationalIdType: customer.nationalIdType || '', //done
        nationality: customer.nationality || '', //done
        civilStatus: customer.civilStatus || '', //done
        spouseFullName: customer.spouseFullName || '', //done
        spouseNationalId: customer.spouseNationalId || '', //done
        spouseDOB: customer.spouseDOB || '', //done
        spousePlaceOfBirth: customer.spousePlaceOfBirth || '', //done
        gender: customer.gender || 'MALE',  //done
        email: customer.email || '',  //done
        cellphoneNumber: customer.cellphoneNumber || '',  //done
        country: customer.country || '',  //done
        city: customer.city || '',  //done
        address: customer.address || '',  //done
        residenceName: customer.residenceName || '',  //done
        residenceNumber: customer.residenceNumber || '',  //done
        contactCellphoneNumber: customer.contactCellphoneNumber || '',  //done
        contactName: customer.contactName || '',  //done
        contactRelationship: customer.contactRelationship || '',  //done
        employmentStatus: customer.employmentStatus || '', //done
        monthlyIncome: customer.monthlyIncome || '', //done
        businessName: customer.businessName || '', //done
        businessAddress: customer.businessAddress || '', //done
        businessPosition: customer.businessPosition || '', //done
        startDate: customer.startDate || '', //done
        bank: customer.bank || '',
        accountNumber: customer.accountNumber || '',
        borrower: customer.borrower || false,
        investor: customer.investor || false,
        location: customer.location || '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().max(255).required('Nombre es requerido'),
        lastName: Yup.string().max(255).required('Apellido es requerido'),
        gender: Yup.string().max(255).required('Genero es requerido'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        placeOfBirth: Yup.string().max(255).required('Lugar de nacimiento es requerido'),
        DOB: Yup.date().required('Fecha de nacimiento es requerido'),
        country: Yup.string().max(255).required('Pais es requerido'),
        cellphoneNumber: Yup.string().max(255).required('Telefono es requerido'),
        city: Yup.string().max(255).required('Ciudad es requerido'),
        address: Yup.string().max(255).required('Dirección es requerida'),
        nationalId: Yup.string().required('Número de identidad es requerido'),
        nationalIdType: Yup.string().max(255).required('Tipo de documento es requerido'),
        nationality: Yup.string().max(255),
        residenceName: Yup.string().max(255),
        residenceNumber: Yup.string().max(255),
        civilStatus: Yup.string().max(255),
        spouseFullName: Yup.string().max(255),
        spouseNationalId: Yup.string().max(255),
        spouseDOB: Yup.string().max(255),
        spousePlaceOfBirth: Yup.string().max(255),
        contactCellphoneNumber: Yup.string().max(255).required('Teléfono de referencia es requerido'),
        contactName: Yup.string().max(255).required('Nombre de referencia es requerido'),
        contactRelationship: Yup.string().max(255).required('Relación con la referencia'),
        employmentStatus: Yup.string().max(255).required('Estatus laboral es requerido'),
        monthlyIncome: Yup.number().required('Ingreso mensual es requerido').positive(),
        businessName: Yup.string().max(255),
        businessAddress: Yup.string().max(255),
        businessPosition: Yup.string().max(255),
        startDate: Yup.date(),
        bank: Yup.string().max(255),
        accountNumber: Yup.string().max(255),
        borrower: Yup.bool(),
        investor: Yup.bool(),
        location: Yup.string().max(255).required('Pais es requerido'),
        isVerified: Yup.bool(),
        submit: null,
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // NOTE: Make API request
          await wait(500);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Customer updated', {
            variant: 'success',
            action: <Button>See all</Button>
          });
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <CustomerInformationForm
            touched={touched}
            errors={errors}
            onBlur={handleBlur}
            onChange={handleChange}
            values={values}
          />
          <CustomerContactForm
            classes={classes}
            touched={touched}
            errors={errors}
            onBlur={handleBlur}
            onChange={handleChange}
            values={values}
          />
          <CustomerRelationshipForm
            classes={classes}
            touched={touched}
            errors={errors}
            onBlur={handleBlur}
            onChange={handleChange}
            values={values}
          />
          <CustomerWorkForm
            classes={classes}
            touched={touched}
            errors={errors}
            onBlur={handleBlur}
            onChange={handleChange}
            values={values}
          />
          <CustomerFinancialInfo
            classes={classes}
            touched={touched}
            errors={errors}
            onBlur={handleBlur}
            onChange={handleChange}
            values={values}
            disabled={isSubmitting} />
        </form>
      )}
    </Formik>
  );
};

CustomerEditForm.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default CustomerEditForm;
