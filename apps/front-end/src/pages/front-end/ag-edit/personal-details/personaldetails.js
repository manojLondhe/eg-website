import React, { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import schema1 from "./schema.js";
import {
  Alert,
  Box,
  Button,
  Center,
  HStack,
  Image,
  Modal,
  Radio,
  Stack,
  VStack,
} from "native-base";
import CustomRadio from "../../../../component/CustomRadio.js";
import Steper from "../../../../component/Steper.js";
import {
  facilitatorRegistryService,
  geolocationRegistryService,
  Camera,
  Layout,
  H1,
  t,
  login,
  H3,
  IconByName,
  BodySmall,
  filtersByObject,
  H2,
  getBase64,
  BodyMedium,
  changeLanguage,
  enumRegistryService,
  benificiaryRegistoryService,
  AgRegistryService,
  uploadRegistryService,
  FrontEndTypo,
} from "@shiksha/common-lib";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

import { useScreenshot } from "use-screenshot-hook";

import Clipboard from "component/Clipboard.js";
import {
  TitleFieldTemplate,
  DescriptionFieldTemplate,
  FieldTemplate,
  ObjectFieldTemplate,
  ArrayFieldTitleTemplate,
  BaseInputTemplate,
  RadioBtn,
  CustomR,
} from "../../../../component/BaseInput.js";
import { Fragment } from "react";

// App
export default function agFormEdit({ ip }) {
  const [page, setPage] = React.useState();
  const [pages, setPages] = React.useState();
  const [cameraData, setCameraData] = React.useState([]);
  const [schema, setSchema] = React.useState({});
  const [cameraSelection, setCameraSelection] = React.useState(0);
  const [cameraModal, setCameraModal] = React.useState(false);
  const [credentials, setCredentials] = React.useState();
  const [cameraUrl, setCameraUrl] = React.useState();
  const [submitBtn, setSubmitBtn] = React.useState();
  const [addBtn, setAddBtn] = React.useState(t("YES"));
  const formRef = React.useRef();
  const uplodInputRef = React.useRef();
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [alert, setAlert] = React.useState();
  const [yearsRange, setYearsRange] = React.useState([1980, 2030]);
  const [lang, setLang] = React.useState(localStorage.getItem("lang"));
  const { id } = useParams();

  const [userId, setuserId] = React.useState(id);
  const navigate = useNavigate();

  const onPressBackButton = async () => {
    navigate(`/beneficiary/${userId}/basicdetails`);
  };
  const ref = React.createRef(null);
  const { image, takeScreenshot } = useScreenshot();
  const getImage = () => takeScreenshot({ ref });
  const downloadImage = () => {
    var FileSaver = require("file-saver");
    FileSaver.saveAs(`${image}`, "image.png");
  };

  // React.useEffect(() => {
  //   getImage();
  // }, [page, credentials]);

  //getting data
  React.useEffect(async () => {
    const qData = await benificiaryRegistoryService.getOne(id);
    setFormData(qData.result);
  }, []);

  React.useEffect(async () => {
    let marital_status = formData?.extended_users?.marital_status;
    let social_category = formData?.extended_users?.social_category;

    setFormData({
      ...formData,
      edit_page_type: "personal",
      marital_status: marital_status,
      social_category: social_category,
    });
  }, [formData?.id]);

  const uiSchema = {
    dob: {
      "ui:widget": "alt-date",
      "ui:options": {
        yearsRange: yearsRange,
        hideNowButton: true,
        hideClearButton: true,
      },
    },
    qualification: {
      "ui:widget": CustomR,
    },
    degree: {
      "ui:widget": CustomR,
    },
    gender: {
      "ui:widget": CustomR,
    },
    sourcing_channel: {
      "ui:widget": CustomR,
    },
    availability: {
      "ui:widget": RadioBtn,
    },

    experience: {
      related_to_teaching: {
        "ui:widget": RadioBtn,
      },
    },

    vo_experience: {
      items: {
        experience_in_years: { "ui:widget": CustomR },
        related_to_teaching: {
          "ui:widget": RadioBtn,
        },
      },
    },
    experience: {
      items: {
        experience_in_years: { "ui:widget": CustomR },
        related_to_teaching: {
          "ui:widget": RadioBtn,
        },
      },
    },
  };

  const nextPreviewStep = async (pageStape = "n") => {
    setAlert();
    const index = pages.indexOf(page);
    const properties = schema1.properties;
    if (index !== undefined) {
      let nextIndex = "";
      if (pageStape.toLowerCase() === "n") {
        nextIndex = pages[index + 1];
      } else {
        nextIndex = pages[index - 1];
      }
      if (nextIndex !== undefined) {
        setPage(nextIndex);
        setSchema(properties[nextIndex]);
      } else if (pageStape.toLowerCase() === "n") {
        await formSubmitUpdate({ ...formData, form_step_number: "6" });
        setPage("SAVE");
      } else {
        return true;
      }
    }
  };
  const setStep = async (pageNumber = "") => {
    if (schema1.type === "step") {
      const properties = schema1.properties;
      if (pageNumber !== "") {
        if (page !== pageNumber) {
          setPage(pageNumber);
          setSchema(properties[pageNumber]);
        }
      } else {
        nextPreviewStep();
      }
    }
  };

  const getOptions = (schema, { key, arr, title, value, filters } = {}) => {
    let enumObj = {};
    let arrData = arr;
    if (!_.isEmpty(filters)) {
      arrData = filtersByObject(arr, filters);
    }
    enumObj = {
      ...enumObj,
      ["enumNames"]: arrData?.map((e) => `${e?.[title]}`),
    };
    enumObj = { ...enumObj, ["enum"]: arrData.map((e) => `${e?.[value]}`) };
    const newProperties = schema["properties"][key];
    let properties = {};
    if (newProperties) {
      if (newProperties.enum) delete newProperties.enum;
      let { enumNames, ...remainData } = newProperties;
      properties = remainData;
    }
    return {
      ...schema,
      ["properties"]: {
        ...schema["properties"],
        [key]: {
          ...properties,
          ...(_.isEmpty(arr) ? {} : enumObj),
        },
      },
    };
  };

  React.useEffect(async () => {
    const ListOfEnum = await enumRegistryService.listOfEnum();

    let newSchema = schema;

    if (schema["properties"]?.["marital_status"]) {
      newSchema = getOptions(newSchema, {
        key: "social_category",
        arr: ListOfEnum?.data?.BENEFICIARY_SOCIAL_STATUS,
        title: "title",
        value: "value",
      });

      newSchema = getOptions(newSchema, {
        key: "marital_status",
        arr: ListOfEnum?.data?.MARITAL_STATUS,
        title: "title",
        value: "value",
      });
      setSchema(newSchema);
    }
  }, [page]);

  React.useEffect(() => {
    if (schema1.type === "step") {
      const properties = schema1.properties;
      const newSteps = Object.keys(properties);
      setPage(newSteps[0]);
      setSchema(properties[newSteps[0]]);
      setPages(newSteps);
      let minYear = moment().subtract("years", 30);
      let maxYear = moment().subtract("years", 18);
      setYearsRange([minYear.year(), maxYear.year()]);
      setSubmitBtn(t("NEXT"));
    }
  }, []);

  const formSubmitUpdate = async (formData) => {
    if (id) {
      const data = await enumRegistryService.editProfileById({
        ...formData,
        id: id,
      });
      console.log(data, "sent data");
    }
  };

  const goErrorPage = (key) => {
    if (key) {
      pages.forEach((e) => {
        console.log(e);
        const data = schema1["properties"]?.[e]["properties"]?.[key];
        if (data) {
          setStep(e);
        }
      });
    }
  };

  const transformErrors = (errors, uiSchema) => {
    return errors.map((error) => {
      if (error.name === "required") {
        if (schema?.properties?.[error?.property]?.title) {
          error.message = `${t("REQUIRED_MESSAGE")} "${t(
            schema?.properties?.[error?.property]?.title
          )}"`;
        } else {
          error.message = `${t("REQUIRED_MESSAGE")}`;
        }
      } else if (error.name === "enum") {
        error.message = `${t("SELECT_MESSAGE")}`;
      }
      return error;
    });
  };

  const onChange = async (e, id) => {
    const data = e.formData;
    setErrors();
    const newData = { ...formData, ...data };
    setFormData(newData);
    if (id === "root_mobile") {
      if (data?.mobile?.toString()?.length === 10) {
        const result = await userExist({ mobile: data?.mobile });
        if (result.isUserExist) {
          const newErrors = {
            mobile: {
              __errors: [t("MOBILE_NUMBER_ALREADY_EXISTS")],
            },
          };
          setErrors(newErrors);
        }
      }
    }
    if (id === "root_aadhar_token") {
      if (data?.aadhar_token?.toString()?.length === 12) {
        const result = await userExist({
          aadhar_token: data?.aadhar_token,
        });
        if (result.isUserExist) {
          const newErrors = {
            aadhar_token: {
              __errors: [t("AADHAAR_NUMBER_ALREADY_EXISTS")],
            },
          };
          setErrors(newErrors);
        }
      }
    }

    if (id === "root_qualification") {
      if (schema?.properties?.qualification) {
        let valueIndex = "";
        schema?.properties?.qualification?.enumNames?.forEach((e, index) => {
          if (e.match("12")) {
            valueIndex = schema?.properties?.qualification?.enum[index];
          }
        });
        if (valueIndex !== "" && data.qualification == valueIndex) {
          setAlert(t("YOU_NOT_ELIGIBLE"));
        } else {
          setAlert();
        }
      }
    }

    if (id === "root_device_ownership") {
      if (schema?.properties?.device_ownership) {
        if (data?.device_ownership == "no") {
          setAlert(t("YOU_NOT_ELIGIBLE"));
        } else {
          setAlert();
        }
      }
    }

    if (id === "root_state") {
      await setDistric({
        schemaData: schema,
        state: data?.state,
        district: data?.district,
        block: data?.block,
      });
    }

    if (id === "root_district") {
      await setBlock({
        district: data?.district,
        block: data?.block,
        schemaData: schema,
      });
    }

    if (id === "root_block") {
      await setVilage({ block: data?.block, schemaData: schema });
    }
  };

  const onError = (data) => {
    console.log(data);
    if (data[0]) {
      const key = data[0]?.property?.slice(1);
      goErrorPage(key);
    }
  };

  const Submit = async (data) => {
    const updateDetails = await AgRegistryService.updateAg(formData, userId);
    console.log("page3.....", updateDetails);
    navigate(`/beneficiary/${userId}/basicdetails`);
  };

  return (
    <Layout
      _appBar={{
        onPressBackButton,
        name: t("PERSONAL_DETAILS"),
        lang,
        setLang,
      }}
      _page={{ _scollView: { bg: "white" } }}
    >
      <Box py={6} px={4} mb={5}>
        {/* Box */}
        {alert ? (
          <Alert status="warning" alignItems={"start"} mb="3">
            <HStack alignItems="center" space="2" color>
              <Alert.Icon />
              <BodyMedium>{alert}</BodyMedium>
            </HStack>
          </Alert>
        ) : (
          <React.Fragment />
        )}
        {page && page !== "" ? (
          <Form
            key={lang + addBtn}
            ref={formRef}
            widgets={{ RadioBtn, CustomR }}
            templates={{
              FieldTemplate,
              ArrayFieldTitleTemplate,
              ObjectFieldTemplate,
              TitleFieldTemplate,
              DescriptionFieldTemplate,
              BaseInputTemplate,
            }}
            extraErrors={errors}
            showErrorList={false}
            noHtml5Validate={true}
            {...{
              validator,
              schema: schema ? schema : {},
              uiSchema,
              formData,
              onChange,
              onError,
              transformErrors,
            }}
          >
            <FrontEndTypo.Primarybutton
              mt="3"
              variant={"primary"}
              type="submit"
              onPress={() => Submit()}
            >
              {pages[pages?.length - 1] === page ? t("SAVE") : submitBtn}
            </FrontEndTypo.Primarybutton>
          </Form>
        ) : (
          <React.Fragment />
        )}
      </Box>
      <Modal
        isOpen={credentials}
        onClose={() => setCredentials(false)}
        safeAreaTop={true}
        size="xl"
      >
        <Modal.Content>
          {/* <Modal.CloseButton /> */}
          <Modal.Header p="5" borderBottomWidth="0">
            <H1 textAlign="center">{t("STORE_YOUR_CREDENTIALS")}</H1>
          </Modal.Header>
          <Modal.Body p="5" pb="10">
            <VStack space="5">
              <VStack alignItems="center">
                <Box
                  bg="gray.100"
                  p="1"
                  rounded="lg"
                  borderWidth={1}
                  borderColor="gray.300"
                >
                  <HStack alignItems="center" space="5">
                    <H3>{t("USERNAME")}</H3>
                    <BodySmall
                      wordWrap="break-word"
                      width="130px"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {credentials?.username}
                    </BodySmall>
                  </HStack>
                  <HStack alignItems="center" space="5">
                    <H3>{t("PASSWORD")}</H3>
                    <BodySmall
                      wordWrap="break-word"
                      width="130px"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {credentials?.password}
                    </BodySmall>
                  </HStack>
                </Box>
              </VStack>
              <VStack alignItems="center">
                <Clipboard
                  text={`username:${credentials?.username}, password:${credentials?.password}`}
                  onPress={(e) => {
                    setCredentials({ ...credentials, copy: true });
                    downloadImage();
                  }}
                >
                  <HStack space="3">
                    <IconByName
                      name="FileCopyLineIcon"
                      isDisabled
                      rounded="full"
                      color="blue.300"
                    />
                    <H3 color="blue.300">
                      {t("CLICK_HERE_TO_COPY_AND_LOGIN")}
                    </H3>
                  </HStack>
                </Clipboard>
              </VStack>
              <HStack space="5" pt="5">
                <Button
                  flex={1}
                  variant="primary"
                  isDisabled={!credentials?.copy}
                  onPress={async (e) => {
                    const { copy, ...cData } = credentials;
                    const loginData = await login(cData);
                    navigate("/");
                    navigate(0);
                  }}
                >
                  {t("LOGIN")}
                </Button>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Layout>
  );
}
