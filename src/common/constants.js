import { NotificationManager } from 'react-notifications';

export const notificationSuccess = (heading, description) => {
  return NotificationManager.success(description, heading, 3000, null, null, '');
};

export const notificationError = (heading, error) => {
  if (Array.isArray(error)) {
    return NotificationManager.error('Something went wrong.Please try again!', heading, 3000, null, null, '');
  } else {
    let check = error
      ? error.response
        ? error.response.data
          ? error.response.data.msg
            ? error.response.data.msg
            : error.response.data
          : error.response.data.msg
        : error
      : '';
    return NotificationManager.error(check, heading, 3000, null, null, '');
  }
};

export const splitArray = (flatArray, numCols) => {
  const newArray = [];
  for (let c = 0; c < numCols; c++) {
    newArray.push([]);
  }
  for (let i = 0; i < flatArray.length; i++) {
    const mod = i % numCols;
    newArray[mod].push(flatArray[i]);
  }
  return newArray;
};

export const headers = {
  simple: {
    'Content-Type': 'application/json',
    'x-person-header': 'secureAdminKey',
  },
  image: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'x-person-header': 'secureAdminKey',
  },
  protect: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    authorization: localStorage.getItem('token'),
    'x-person-header': 'secureAdminKey',
  },
};

export const dynamicSort = (property) => {
  var sortOrder = 1;

  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  };
};

export const validateValue = (value) => {
  if (value !== null && value !== 'undefined' && value !== '') {
    return true;
  } else {
    return false;
  }
};

export const validateArray = (value) => {
  if (value !== null && value.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (mail) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
    return true;
  } else {
    return false;
  }
};

export const validFacebook = (enteredURL) => {
  let FbUrl = /^(http|https)\:\/\/(www.|)facebook.com\/.*/i;
  if (enteredURL !== '' && !enteredURL.match(FbUrl)) {
    notificationError('Facebook', 'Invalid facebook link');
    return false;
  } else {
    return true;
  }
};

export const validInstagram = (enteredURL) => {
  let InsUrl = /^(http|https)\:\/\/(www.|)instagram.com\/.*/i;
  if (enteredURL !== '' && !enteredURL.match(InsUrl)) {
    notificationError('Instagram', 'Invalid instagram link');
    return false;
  } else {
    return true;
  }
};

export const validLinkedIn = (enteredURL) => {
  let LinkUrl = /^(http|https)\:\/\/(www.|)linkedin.com\/.*/i;
  if (enteredURL !== '' && !enteredURL.match(LinkUrl)) {
    notificationError('Linked In', 'Invalid linkedin link');
    return false;
  } else {
    return true;
  }
};

export const validYoutube = (enteredURL) => {
  let YouUrl = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
  if (enteredURL !== '' && !enteredURL.match(YouUrl)) {
    notificationError('Youtube', 'Invalid youtube link');
    return false;
  } else {
    return true;
  }
};

export const validWebsite = (enteredURL) => {
  let WebUrl = /(https?:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}/g;
  if (enteredURL !== '' && !enteredURL.match(WebUrl)) {
    notificationError('Website', 'Invalid website link');
    return false;
  } else {
    return true;
  }
};

export const shuffleLeads = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
