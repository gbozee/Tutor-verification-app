// import logo from "./logo.svg";
const logo = "/images/logo.svg";
export const actions = {
  EMAIL_VERIFICATION: "email_verification",
  ID_VERIFICATION: "id_verification",
  PROFILE_VERIFICATION: "profile_verification"
};

function populateDetail(record) {
  return {
    ...record,
    phone_no: "07035209976",
    years_of_experience: "6-10 Years",
    tutor_description: `Ifeoluwa is a dedicated, resourceful and goal-driven professional educator with a solid commitment to the social and academic growth and development of every child. This I have been doing for 10 years now. I specialize in tutoring Numeracy, Literacy and sciences for Nursery, Primary and JSS students. I have successfully tutored students for common entrance,JSCE and BECE. I also have a strong passion in seeing my learners write with a good and eligible handwriting. I have a strong believe in Child-centred curriculum and aptitude to remain flexible, ensuring that every child learning styles and abilities are addressed. I provide assessment and feedback both to my learners and parent if applicable.`,
    locations: [
      {
        address: "20 Harrison Ojemen Street",
        state: "Lagos",
        vicinity: "GRA"
      }
    ],
    educations: [
      {
        school: "University of Lagos",
        course: "Systems Engineering",
        degree: "MSC"
      },
      {
        school: "University of Lagos2",
        course: "Systems Engineering",
        degree: "MSC"
      }
    ],
    work_experiences: [
      {
        name: "Tuteria Developer",
        role: "Backend Developer"
      },
      {
        name: "Tuteria Developer2",
        role: "Backend Developer"
      }
    ],
    potential_subjects: ["French", "English", "Physics"],
    levels_with_exam: {},
    answers: {},
    classes: ["Nursery 2", "Primary 3", "JSS1"],
    curriculum_used: ["British", "American"],
    currriculum_explanation:
      "It is an Interesting curriculum that helps growing child especially in Reading and number work."
  };
}

export const tutorList = [
  {
    slug: "kenny2",
    profile_pic: logo,
    identification: {
      link: "http://www.gogole.com",
      verified: false
    },
    full_name: "Kenny Novak",
    email: "jj9@example.com",
    dob: "2012-10-11 12:30:33",
    state: "Lagos",
    gender: "M",
    verified: true,
    email_verified: false
  },
  {
    slug: "james4",
    profile_pic: "",
    identification: {
      link: "http://www.gogole.com",
      verified: false
    },
    full_name: "Donny Novak",
    email: "jj10@example.com",
    dob: "2012-10-11 12:30:33",
    state: "Lagos",
    gender: "M",
    verified: true,
    email_verified: false
  },
  {
    slug: "james1",
    profile_pic: logo,
    identification: {
      link: "http://www.gogole.com",
      verified: true
    },
    full_name: "James Novak",
    email: "james2@example.com",
    dob: "2012-10-11 12:30:33",
    state: "Lagos",
    gender: "M",
    verified: true,
    email_verified: false
  },
  {
    slug: "james2",
    profile_pic: logo,
    full_name: "Danny Novak",
    email: "james3@example.com",
    identification: {
      link: "http://www.gogole.com",
      verified: false
    },
    dob: "2012-10-11 12:30:33",
    state: "Lagos",
    gender: "M",
    verified: false,
    email_verified: true
  },
  {
    slug: "james3",
    profile_pic: "",
    identification: {
      link: "http://www.gogole.com",
      verified: false
    },
    email: "james4@example.com",
    full_name: "John Novak",
    dob: "2012-10-11 12:30:33",
    state: "Lagos",
    gender: "M",
    verified: true,
    email_verified: false
  },
  {
    slug: "jj101",
    profile_pic: "",
    email: "jj11@example.com",
    full_name: "Shola Novak",
    dob: "2012-10-11 12:30:33",
    state: "Lagos",
    gender: "M",
    verified: true,
    email_verified: false
  }
].map(x => ({ ...x, ...populateDetail(x) }));
export const sampleTutorDetailData = {
  profile_pic: logo,
  slug: "james3",
  full_name: "James Novak",
  dob: "2012-10-11 12:30:33",
  gender: "M",
  verified: true,
  email_verified: false,
  identification: {
    link: "http://www.gogole.com",
    verified: false
  },
  email: "james@example.com",
  phone_no: "07035209976",
  years_of_experience: "6-10 Years",
  tutor_description: `Ifeoluwa is a dedicated, resourceful and goal-driven professional educator with a solid commitment to the social and academic growth and development of every child. This I have been doing for 10 years now. I specialize in tutoring Numeracy, Literacy and sciences for Nursery, Primary and JSS students. I have successfully tutored students for common entrance,JSCE and BECE. I also have a strong passion in seeing my learners write with a good and eligible handwriting. I have a strong believe in Child-centred curriculum and aptitude to remain flexible, ensuring that every child learning styles and abilities are addressed. I provide assessment and feedback both to my learners and parent if applicable.`,
  educations: [
    {
      school: "University of Lagos",
      course: "Systems Engineering",
      degree: "MSC"
    },
    {
      school: "University of Lagos2",
      course: "Systems Engineering",
      degree: "MSC"
    }
  ],
  work_experiences: [
    {
      name: "Tuteria Developer",
      role: "Backend Developer"
    },
    {
      name: "Tuteria Developer2",
      role: "Backend Developer"
    }
  ],
  locations: [
    {
      address: "20 Harrison Ojemen Street",
      state: "Lagos",
      vicinity: "GRA"
    }
  ],
  potential_subjects: ["French", "English", "Physics"],
  levels_with_exam: {},
  answers: {},
  classes: ["Nursery 2", "Primary 3", "JSS1"],
  curriculum_used: ["British", "American"],
  currriculum_explanation:
    "It is an Interesting curriculum that helps growing child especially in Reading and number work."
};
export function getTutorDetail(key, value) {
  let rr = tutorList.find(x => x[key] === value);
  return rr || sampleTutorDetailData;
}
