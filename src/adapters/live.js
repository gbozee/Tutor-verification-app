import axios from "axios";

const BASE_URL = process.env.REACT_APP_ENDPOINT_URL;
let isDevelop = process.env.NODE_ENV !== "production";
const config = {
  headers: { "Content-Type": "application/json" }
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
const otherFields = `
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
`;
const skillFields = `
  skill{
    name
  }
  quiz_sitting{
    score
  }
  public_url
  active_bookings
  hours_taught
  heading
  description
  status_display
  pk
  slug
  price
  skill_exhibitions
`;
const queries = {
  tutorSkills: `
    query allSkills($email: String!){
       tutor_verification_endpoint {
        all_skills(email:$email){
          ${skillFields}
        }
        
       }
    }`,
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
          ${otherFields}
        }
      }
    }`,
  approveTutor: `
    mutation approveTutor($email: String!, $verified: Boolean!){
        approve_tutor(email: $email, verified: $verified, test: ${isDevelop}) {
          user {
            ${globalFields}
            ${otherFields}
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
  skillAdminActions: `
    mutation skillAdminActions($action: String!, $pk: Int!){
      skill_admin_actions(action:$action,pk:$pk){
        skill{
          ${skillFields}
        }
      }
    }
  `
};

const makeApiCall = (query, variables) => {
  return axios.post(
    BASE_URL,
    {
      query,
      variables
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
  return makeApiCall(queries["allUnverifiedTutors"], {
    ...rest,
    [selection]: true
  }).then(responseCallback("all_unverified_tutors"));
}

function fetchTutorDetail(params) {
  return makeApiCall(queries["tutorDetail"], params).then(
    responseCallback("tutor_detail")
  );
}

function approveTutor(email, approved = false) {
  return makeApiCall(queries["approveTutor"], {
    email,
    verified: approved
  })
    .then(mutationCallback("approve_tutor"))
    .then(data => data.user);
}

function notifyTutorAboutEmail(email) {
  return makeApiCall(queries["adminActionMutations"], {
    email,
    action: "notify_about_email"
  });
}

function approveTutorEmail(email) {
  return makeApiCall(queries["adminActionMutations"], {
    email,
    action: "approve_email"
  });
}

function rejectProfilePic(email) {
  return makeApiCall(queries["adminActionMutations"], {
    email,
    action: "reject_profile_pic"
  });
}

function approveIdentification(email) {
  return makeApiCall(queries["adminActionMutations"], {
    email,
    action: "approve_identification"
  });
}

function rejectIdentification(email) {
  return makeApiCall(queries["adminActionMutations"], {
    email,
    action: "reject_identification"
  });
}

function uploadProfilePicEmail(email) {
  return makeApiCall(queries["adminActionMutations"], {
    email,
    action: "upload_profile_pic_email"
  });
}

function uploadVerificationIdEmail(email) {
  return makeApiCall(queries["adminActionMutations"], {
    email,
    action: "upload_verification_email"
  });
}

function updateCurriculum(email) {
  return makeApiCall(queries["adminActionMutations"], {
    email,
    action: "curriculum_update"
  }).then(mutationCallback("admin_actions"));
}

function freezingProfileStatus(email, status = true) {
  let action = status ? "freeze_profile" : "unfreeze_profile";
  return makeApiCall(queries["adminActionMutations"], {
    email,
    action
  }).then(mutationCallback("admin_actions"));
}
function skillChangeStatus(pk, status) {
  let options = {
    active: "approve_skill",
    denied: "deny_skill",
    modification: "require_modification_skill",
    delete_exhibitions: "delete_exhibitions",
    retake_test: "retake_test"
  };
  let action = options[status];
  return makeApiCall(queries.skillAdminActions, {
    pk,
    action
  })
    .then(mutationCallback("skill_admin_actions"))
    .then(data => {
      return transformers(data.skill);
    });
}
function tutorSkills(email) {
  return makeApiCall(queries.tutorSkills, { email })
    .then(responseCallback("all_skills"))
    .then(data => {
      return data.map(transformers);
    });
}
function transformers(x) {
  let transform = {
    "Require Modification": "modification",
    Active: "active",
    Pending: "pending",
    Denied: "denied"
  };
  return {
    ...x,
    status: transform[x.status_display],
    skill_name: x.skill.name,
    link: x.public_url,
    stats: {
      hours_taught: x.hours_taught,
      active_bookings: x.active_bookings
    },
    quiz: x.quiz_siting || { score: 0, pass_mark: 0 }
  };
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
  uploadVerificationId: uploadVerificationIdEmail,
  freezingProfileStatus,
  updateCurriculum,
  skillChangeStatus,
  tutorSkills
};
