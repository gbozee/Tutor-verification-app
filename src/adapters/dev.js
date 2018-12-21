import {
  sampleTutorDetailData,
  tutorList,
  getTutorDetail
} from "./test_data";


function getAllUnverifiedTutors({ selection }) {
  let options = {
    new_applicant: x => x.verified === false,
    verified_tutors: x => x.verified === true
  };
  let filterFunc = options[selection];
  let result = filterFunc ? tutorList.filter(filterFunc) : tutorList;
  return new Promise(resolve => resolve(result));
}

function fetchTutorDetail(props) {
  let key = Object.keys(props).find(x => props[x] !== undefined);
  let result = getTutorDetail(key, props[key]);
  return new Promise(resolve => resolve(result));
}

function approveTutor(email, approved = false, verified = false) {
  let newTutor = { ...sampleTutorDetailData, verified: approved };
  return new Promise(resolve => resolve(newTutor));
}

function notifyTutorAboutEmail(email) {
  return new Promise(resolve => resolve());
}

function approveTutorEmail(email) {
  return new Promise(resolve => resolve());
}

function rejectProfilePic(email) {
  return new Promise(resolve => resolve());
}

function approveIdentification(email) {
  return new Promise(resolve => resolve());
}

function rejectIdentification(email) {
  return new Promise(resolve => resolve());
}

function uploadProfilePicEmail(email) {
  return new Promise(resolve => resolve());
}

function uploadVerificationIdEmail(email) {
  return new Promise(resolve => resolve());
}

export default {
  //tutor verification
  getAllUnverifiedTutors,
  fetchTutorDetail,
  approveTutor,
  notifyTutorAboutEmail,
  approveTutorEmail,
  rejectProfilePic,
  rejectIdentification,
  approveIdentification,
  uploadProfilePic: uploadProfilePicEmail,
  uploadVerificationId: uploadVerificationIdEmail
};
