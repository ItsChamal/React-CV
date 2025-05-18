export function validateCv(cv) {
    const errors = {};
    if (!cv.firstName) errors.firstName = 'First name required';
    if (!cv.lastName)  errors.lastName  = 'Last name required';
    if (!cv.age)       errors.age       = 'Age required';
    if (!cv.phoneNo)   errors.phoneNo   = 'Phone number required';
    if (!cv.terms)     errors.terms     = 'Please accept terms';
    return errors;
  }
