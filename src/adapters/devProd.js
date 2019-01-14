import LiveData from "./live";

function getAllUnverifiedTutors(params) {
  return LiveData.getAllUnverifiedTutors(params);
}

function fetchTutorDetail(props) {
  return LiveData.fetchTutorDetail(props);
}

function approveTutor(email, approved = false, verified = false) {
  return LiveData.approveTutor(email, approved);
}

function notifyTutorAboutEmail(email) {
  return LiveData.notifyTutorAboutEmail(email);
}

function approveTutorEmail(email) {
  return LiveData.approveTutorEmail(email);
}

function rejectProfilePic(email) {
  return LiveData.rejectProfilePic(email);
}

function approveIdentification(email) {
  return LiveData.approveIdentification(email);
}

function rejectIdentification(email) {
  return LiveData.rejectIdentification(email);
}

function uploadProfilePicEmail(email) {
  return LiveData.uploadProfilePic(email);
}

function uploadVerificationIdEmail(email) {
  return LiveData.uploadVerificationId(email);
}

function skillAdminAction({ skill, email, action }) {
  if (action === "freeze") {
    return LiveData.freezingProfileStatus(email);
  }
  if (action === "unfreeze") {
    return LiveData.freezingProfileStatus(email, false);
  }
  return LiveData.skillChangeStatus(skill.pk, action);
}

function getTutorSkills(params) {
  return LiveData.tutorSkills(params.email);
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
  uploadVerificationId: uploadVerificationIdEmail,
  skillAdminAction,
  getTutorSkills
};
