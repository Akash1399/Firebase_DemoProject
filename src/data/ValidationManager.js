export const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "*This Field is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "*This Field is Required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i.test(
      values.password
    )
  ) {
    errors.password =
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character";
  }

  return errors;
};
