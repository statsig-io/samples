import {
  INPUT_REGEX,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USER_MAX_LENGTH,
  USER_MIN_LENGTH,
} from "../UIConstants";

export const USER_NAME = "inputUserName";
export const PASSWORD = "inputPassword";

/**
 * To validate the various input based on given validation
 * @param {*} inputType
 * @param {*} inputValue
 * @returns
 */
export const isValidInput = (inputType, inputValue) => {
  let returnValue = {
    isValid: false,
    errorMessage: null,
  };

  switch (inputType) {
    case USER_NAME:
      returnValue.errorMessage = `User name only include alphanumberic. Min length should be ${USER_MIN_LENGTH} and max length should be ${USER_MAX_LENGTH}`;
      returnValue.isValid = INPUT_REGEX.test(inputValue);
      break;
    case PASSWORD:
      returnValue.errorMessage = `Password only include alphanumberic. Min length should be ${PASSWORD_MIN_LENGTH} and max length should be ${PASSWORD_MAX_LENGTH}`;
      returnValue.isValid = INPUT_REGEX.test(inputValue);
      break;
    default:
      break;
  }

  return returnValue;
};
