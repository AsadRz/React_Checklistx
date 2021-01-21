/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
const generatePassword = require('password-generator');

export const getInitials = (name) =>
{
  let initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

  return initials;
};

const maxLength = 18;
const minLength = 12;
const uppercaseMinCount = 1;
const lowercaseMinCount = 3;
const numberMinCount = 2;
const specialMinCount = 1;
const UPPERCASE_RE = /([A-Z])/g;
const LOWERCASE_RE = /([a-z])/g;
const NUMBER_RE = /([\d])/g;
const SPECIAL_CHAR_RE = /([\?\-])/g;
const NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

export const isStrongPassword = (password) =>
{
  const uc = password.match(UPPERCASE_RE);
  const lc = password.match(LOWERCASE_RE);
  const n = password.match(NUMBER_RE);
  const sc = password.match(SPECIAL_CHAR_RE);
  const nr = password.match(NON_REPEATING_CHAR_RE);
  return (
    password.length >= minLength &&
    !nr &&
    uc &&
    uc.length >= uppercaseMinCount &&
    lc &&
    lc.length >= lowercaseMinCount &&
    n &&
    n.length >= numberMinCount &&
    sc &&
    sc.length >= specialMinCount
  );
};

export const passwordGenerator = () =>
{
  let password = '';
  const randomLength =
    Math.floor(Math.random() * (maxLength - minLength)) + minLength;
  while (!isStrongPassword(password)) {
    password = generatePassword(randomLength, false, /[\w\d\?\-]/);
  }
  return password;
};

export const getCurrentDate = () =>
{

  let today = new Date()
  let date = `${today.getFullYear()}-${today.getMonth() + 1
    }-${today.getDay()}`;
  return date;
};
