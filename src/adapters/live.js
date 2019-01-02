import axios from "axios";

let baseUrl = process.env.REACT_APP_ENDPOINT_URL;

const globalFields = `
slug
      profile_pic
      identification
      full_name
      email
      dob
      state
      gender
      verified
      email_verified
`;
const query = ({ selection, size = 50, email_exclude = [] }) => {
  let params = `(result_size:${size},`;
  if (email_exclude.length > 0) {
    params += `email_exclude:${JSON.stringify(email_exclude)},`;
  }
  if (Boolean(selection)) {
    params += `${selection}:true,`;
  }
  return `
{
    tutor_verification_endpoint{
    all_unverified_tutors${params}){
      ${globalFields}
    }
  }
}`;
};

const tutor_detail = (key, value) => {
  let params = `(${key}:${JSON.stringify(value)})`;
  return ` {
      tutor_verification_endpoint{
        tutor_detail${params}{
            ${globalFields}
            phone_no
            years_of_experience
            tutor_description
            educations
            work_experiences
            locations
            potential_subjects
            levels_with_exam
            answers
            classes
            curriculum_used
            curriculum_explanation
        }
    }
}
    `;
};
const approveTutorMutations = (email, verified) => {
  return `
    mutation{
        approve_tutor(email:${JSON.stringify(email)},verified:${verified}){
            user
        }
    }`;
};
const adminActionMutations = (email, action) => {
  return `
    mutation{
        admin_actions(action:${JSON.stringify(action)}, email:${JSON.stringify(
    email
  )}){
            status
        }
    }`;
};
function responseCallback(key) {
  return response => response.data.data.tutor_verification_endpoint[key];
}
function mutationCallback(mutation) {
  return response => response.data.data[mutation];
}
function getAllUnverifiedTutors(params) {
  return axios
    .post(baseUrl, { query: query(params) })
    .then(responseCallback("all_unverified_tutors"));
}

function fetchTutorDetail(props) {
  let key = Object.keys(props).find(x => props[x] !== undefined);
  return axios
    .post(baseUrl, { query: tutor_detail(key, props[key]) })
    .then(responseCallback("tutor_detail"));
}

function approveTutor(email, approved = false) {
  return axios
    .post(baseUrl, { query: approveTutorMutations(email, approved) })
    .then(mutationCallback("approve_tutor"))
    .then(data => data.user);
}
function notifyTutorAboutEmail(email) {
  return axios.post(baseUrl, {
    query: adminActionMutations(email, "notify_about_email")
  });
}

function approveTutorEmail(email) {
  return axios.post(baseUrl, {
    query: adminActionMutations(email, "approve_email")
  });
}

function rejectProfilePic(email) {
  return axios.post(baseUrl, {
    query: adminActionMutations(email, "reject_profile_pic")
  });
}

function approveIdentification(email) {
  return axios.post(baseUrl, {
    query: adminActionMutations(email, "approve_identification")
  });
}

function rejectIdentification(email) {
  return axios.post(baseUrl, {
    query: adminActionMutations(email, "reject_identification")
  });
}

function uploadProfilePicEmail(email) {
  return axios.post(baseUrl, {
    query: adminActionMutations(email, "upload_profile_pic_email")
  });
}

function uploadVerificationIdEmail(email) {
  return axios.post(baseUrl, {
    query: adminActionMutations(email, "upload_verification_email")
  });
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
