export default {
  description: "1.Basic details",
  type: "step",
  properties: {
    1: {
      title: "AADHAAR_NUMBER",
      type: "object",
      required: ["aadhar_token"],
      properties: {
        aadhar_token: {
          type: "string",
          title: "AADHAAR_NUMBER",
        },
        edit_page_type: {
          type: "string",
          format: "hidden",
          default: "add_ag_duplication",
        },
        aadhar_no: {
          type: "string",
          format: "hidden",
          default: "",
        },
      },
    },
  },
};