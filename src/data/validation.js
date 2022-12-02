export const validate = (values) => {
  const errors = {};
  if (!values.salary) {
    errors.salary = "*This Field is Required";
  } else if (!/^[0-9]+$/i.test(values.salary)) {
    errors.salary = "Only Number Is Accepted";
  }
  if (!values.firstName) {
    errors.firstName = "*This Field is Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "*This Field is Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "*This Field is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  //   if (!values.password) {
  //     errors.password = "*This Field is Required";
  //   } else if (
  //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i.test(
  //       values.password
  //     )
  //   ) {
  //     errors.password =
  //       "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character";
  //   }
  if (!values.gender) {
    errors.gender = "*This Field is Required";
  }
  if (!values.hobbies) {
    errors.hobbies = "Kindly check this field";
  }
  return errors;
};
