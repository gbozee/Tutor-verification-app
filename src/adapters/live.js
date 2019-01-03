import axios from 'axios';

const BASE_URL = process.env.REACT_APP_ENDPOINT_URL;
let isDevelop = process.env.NODE_ENV !== "production";
const config = {
  headers: { 'Content-Type': 'application/json' },
};
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
const queries = {
  allUnverifiedTutors: `
    query allUnverifiedTutors($new_applicants: Boolean, $verified_tutors: Boolean, $result_size: Int) {
        tutor_verification_endpoint {
            all_unverified_tutors(new_applicants: $new_applicants, verified_tutors: $verified_tutors, result_size: $result_size) {
              ${globalFields}
            }
        }
    }`,
  tutorDetail: `
    query tutorDetail($slug: String, $email: String) {
      tutor_verification_endpoint {
        tutor_detail(slug: $slug, email: $email) {
          ${globalFields}
          identification
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
    }`,
  approveTutor: `
    mutation approveTutor($email: String!, $verified: Boolean!){
        approve_tutor(email: $email, verified: $verified, test: ${isDevelop}) {
          user {
            ${globalFields}
            identification
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
    }`,
  adminActionMutations: `
      mutation adminActions($action: String!, $email: String!) {
        admin_actions(action: $action, email: $email, test: ${isDevelop}) {
          status
          errors
        }
      }
    `,
};

const makeApiCall = (query, variables) => {
  return axios.post(
    BASE_URL,
    {
      query,
      variables,
    },
    config
  );
};

function responseCallback(key) {
  return response => response.data.data.tutor_verification_endpoint[key];
}
function mutationCallback(mutation) {
  return response => response.data.data[mutation];
}

function getAllUnverifiedTutors(params) {
  let { selection, ...rest } = params;
  return makeApiCall(queries['allUnverifiedTutors'], {
    ...rest,
    [selection]: true,
  }).then(responseCallback('all_unverified_tutors'));
}

function fetchTutorDetail(params) {
  return makeApiCall(queries['tutorDetail'], params).then(
    responseCallback('tutor_detail')
  );
}

function approveTutor(email, approved=false) {
  return makeApiCall(queries['approveTutor'], {
    email,
    verified:approved,
  })
    .then(mutationCallback('approve_tutor'))
    .then(data => data.user);
}

function notifyTutorAboutEmail(email) {
  return makeApiCall(queries['adminActionMutations'], {
    email,
    action: 'notify_about_email',
  });
}

function approveTutorEmail(email) {
  return makeApiCall(queries['adminActionMutations'], {
    email,
    action: 'approve_email',
  });
}

function rejectProfilePic(email) {
  return makeApiCall(queries['adminActionMutations'], {
    email,
    action: 'reject_profile_pic',
  });
}

function approveIdentification(email) {
  return makeApiCall(queries['adminActionMutations'], {
    email,
    action: 'approve_identification',
  });
}

function rejectIdentification(email) {
  return makeApiCall(queries['adminActionMutations'], {
    email,
    action: 'reject_identification',
  });
}

function uploadProfilePicEmail(email) {
  return makeApiCall(queries['adminActionMutations'], {
    email,
    action: 'upload_profile_pic_email',
  });
}

function uploadVerificationIdEmail(email) {
  return makeApiCall(queries['adminActionMutations'], {
    email,
    action: 'upload_verification_email',
  });
}

export default {
  getAllUnverifiedTutors,
  fetchTutorDetail,
  approveTutor,
  notifyTutorAboutEmail,
  approveTutorEmail,
  rejectProfilePic,
  approveIdentification,
  rejectIdentification,
  uploadProfilePic: uploadProfilePicEmail,
  uploadVerificationId: uploadVerificationIdEmail
};
