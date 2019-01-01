import axios from 'axios';

const BASE_URL = process.env.REACT_APP_ENDPOINT_URL;
const config = {
  headers: { 'Content-Type': 'application/json' },
};
const queries = {
  allUnverifiedTutors: `
    query allUnverifiedTutors($new_applicants: Boolean, $verified_tutors: Boolean, $result_size: Int) {
        tutor_verification_endpoint {
            all_unverified_tutors(new_applicants: $new_applicants, verified_tutors: $verified_tutors, result_size: $result_size) {
              slug
              profile_pic
              full_name
              email
              dob
              gender
              state
              verified
              email_verified
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
  tutorDetail: `
    query tutorDetail($slug: String, $email: String) {
      tutor_verification_endpoint {
        tutor_detail(slug: $slug, email: $email) {
          slug
          profile_pic
          full_name
          email
          dob
          gender
          state
          verified
          email_verified
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
        approve_tutor(email: $email, verified: $verified) {
        user
        } 
    }`,
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

function getAllUnverifiedTutors(params) {
  let { selection, ...rest } = params;
  return makeApiCall(queries['allUnverifiedTutors'], {
    ...rest,
    [selection]: true,
  });
}

function fetchTutorDetail(query, params) {
  return makeApiCall(queries['tutorDetail'], params);
}

function approveTutor(query, params) {
  return makeApiCall(queries['approveTutor'], params);
}

export default {
  getAllUnverifiedTutors,
  fetchTutorDetail,
  approveTutor,
};
