export function validateCv(cv) {
  const errors = {};
  if (!cv.firstName) errors.firstName = 'First name is required';
  if (!cv.lastName)  errors.lastName  = 'Last name is required';
  if (!cv.age)       errors.age       = 'Age is required';
  if (!cv.phoneNo)   errors.phoneNo   = 'Phone number is required';
  if (!cv.preferredLanguages?.length) errors.languages = 'Select at least one language';
  if (!cv.workExperience?.length) errors.work = 'Add at least one work experience';
  if (!cv.terms) errors.terms = 'You must accept terms & conditions';
  return errors;
}
