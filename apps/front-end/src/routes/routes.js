import Dashboard from "pages/front-end/Dashboard";
import Home from "pages/front-end/Home";
import basicDetails from "../pages/front-end/ag-edit/basicDetails";
import educationDetails from "../pages/front-end/ag-edit/education-details-further-studies/educationDetails";
import contactDetailsEdit from "../pages/front-end/ag-edit/contact-details/contactDetailsEdit";
import addressEdit from "../pages/front-end/ag-edit/address/addressEdit";
import personaldetails from "../pages/front-end/ag-edit/personal-details/personaldetails";
import referencedetails from "../pages/front-end/ag-edit/reference-details/referencedetails";
import familydetails from "../pages/front-end/ag-edit/family-details/familydetails";
import uploadphoto from "../pages/front-end/ag-edit/upload-photo/uploadphoto";
import futureStudy from "../pages/front-end/ag-edit/education-details-further-studies/futureStudy";
import otherdetails from "../pages/front-end/ag-edit/other-details/otherdetails";

import EnrollmentForm from "../pages/front-end/ag-edit/enrollment/EnrollmentForm";
import Agduplicate from "pages/front-end/ag-form/Agduplicate";
import Agform from "pages/front-end/ag-form/Agform";
import Docschecklist from "pages/front-end/ag-form/Docschecklist";
import LearnerProfile from "pages/front-end/ag-form/LearnerProfile";
import BenificiaryListView from "pages/front-end/BenificiaryListView";
import BenificiaryProfileView from "../pages/front-end/BenificiaryProfileView";
import CountScreenView from "../pages/front-end/CountScreenView";
import AgformUpdate from "pages/front-end/ag-form/Agformupdate";
import Agadhaar from "pages/front-end/ag-form/Agadhaar";
import Success from "pages/front-end/Success";
import Profile from "pages/front-end/facilitator/Profile";
import AdharKyc from "pages/front-end/AadhaarKyc/AadhaarKyc";
import BenificiaryBasicDetails from "pages/front-end/BenificiaryBasicDetails";
import BenificiaryEducation from "pages/front-end/BenificiaryEducation";
import BenificiaryJourney from "pages/front-end/BenificiaryJourney";
import BenificiaryEnrollment from "pages/front-end/BenificiaryEnrollment";
import BenificiaryAadhaarDetails from "pages/front-end/BenificiaryAadhaarDetails";
import EditForm from "../pages/front-end/facilitator/edit/Form";
import ArrayForm from "../pages/front-end/facilitator/edit/ArrayForm";
import FacilitatorBasicDetails from "pages/front-end/facilitator/FacilitatorBasicDetails";
import FacilitatorQualification from "pages/front-end/facilitator/FacilitatorQualification";
import BenificiaryProfilePhoto from "pages/front-end/BenificiaryProfilePhoto";
import AadhaarDetails from "pages/front-end/facilitator/AadhaarDetails";
import BenificiaryAddress from "pages/front-end/BenificiaryAddress";

export default [
  { path: "/form", component: Home },
  {
    path: "/facilitator-self-onboarding/:id",
    component: Home,
  },
  { path: "/dashboard", component: Dashboard },
  { path: "/beneficiary/edit/:id/basic-info", component: basicDetails },
  {
    path: "/beneficiary/edit/:id/contact-info",
    component: contactDetailsEdit,
  },
  {
    path: "/beneficiary/edit/:id/address",
    component: addressEdit,
  },
  {
    path: "/beneficiary/edit/:id/personal-details",
    component: personaldetails,
  },

  {
    path: "/beneficiary/edit/:id/family-details",
    component: familydetails,
  },

  {
    path: "/beneficiary/edit/:id/upload-photo",
    component: uploadphoto,
  },

  { path: "/beneficiary/edit/:id/education", component: educationDetails },
  {
    path: "/beneficiary/edit/:id/future-education",
    component: futureStudy,
  },
  {
    path: "/beneficiary/edit/:id/otherdetails",
    component: otherdetails,
  },
  {
    path: "/beneficiary/edit/:id/enrollment-details",
    component: EnrollmentForm,
  },
  {
    path: "/beneficiary/edit/:id/reference-details",
    component: referencedetails,
  },
  //add a new route /ag/:ID(param), component:basic details
  { path: "/beneficiary", component: Agform },
  { path: "/beneficiary/:id/2", component: AgformUpdate },
  { path: "/beneficiary/:id/3", component: Agadhaar },
  { path: "/beneficiary/:id/4", component: Agduplicate },
  { path: "/AgSuccess", component: Success },
  { path: "/learnerProfile", component: LearnerProfile },
  { path: "/beneficiary/:id/docschecklist", component: Docschecklist },
  { path: "/beneficiary/profile/:id", component: BenificiaryProfileView },
  { path: "/beneficiary/:id", component: BenificiaryProfileView },
  {
    path: "/beneficiary/list",
    component: BenificiaryListView,
  },
  { path: "/table", component: CountScreenView },
  {
    path: "/aadhaar-kyc/:id",
    component: AdharKyc,
  },
  {
    path: "/aadhaar-kyc/:id/:type",
    component: AdharKyc,
  },
  {
    path: "/beneficiary/:id/basicdetails",
    component: BenificiaryBasicDetails,
  },
  {
    path: "/beneficiary/:id/educationdetails",
    component: BenificiaryEducation,
  },
  {
    path: "/beneficiary/:id/benificiaryJourney",
    component: BenificiaryJourney,
  },
  {
    path: "/beneficiary/:id/enrollmentdetails",
    component: BenificiaryEnrollment,
  },
  {
    path: "/beneficiary/:id/aadhaardetails",
    component: BenificiaryAadhaarDetails,
  },
  {
    path: "/beneficiary/:id/addressdetails",
    component: BenificiaryAddress,
  },
  {
    path: "/beneficiary/:id/upload/:photoNo",
    component: BenificiaryProfilePhoto,
  },
  { path: "/profile", component: Profile },
  { path: "/profile/edit/array-form/:type", component: ArrayForm },
  { path: "/profile/edit/:step", component: EditForm },
  {
    path: "/profile/:id/aadhaardetails",
    component: AadhaarDetails,
  },
  { path: "/profile/edit/:step/:photoNo", component: EditForm },
  {
    path: "/facilitatorbasicdetail",
    component: FacilitatorBasicDetails,
  },
  {
    path: "/facilitatorqualification",
    component: FacilitatorQualification,
  },
  { path: "*", component: Dashboard },
];
