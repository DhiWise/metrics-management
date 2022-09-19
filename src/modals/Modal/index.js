import React from "react";
import ModalProvider from "react-modal";

import { Column, Text, Line, Input, Button } from "components";
import { createTargets } from "../../service/supabase";
import useForm from "hooks/useForm";
import * as yup from "yup";

const Modal = (props) => {
  const formValidationSchema = yup
    .object()
    .shape({ target: yup.string().required("Target is required") });
  const form = useForm(
    { target: "" },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );
  function submit() {
    createTargets([{ categoryId: props.catId, month: props.month, target: form?.values?.target }]);
    props.onRequestClose(true);
    props.callApi();
  }
  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className="m-[auto] w-[28%]"
        overlayClassName="bg-black_900_87 fixed flex h-[100%] inset-y-[0] w-[100%]"
        {...props}
      >
        <div className="m-[auto] max-h-[97vh] overflow-y-auto">
          <Column className="bg-white_A700 pl-[1px] py-[1px] rounded-radius10 w-[100%]">
            <Text className="font-normal lg:ml-[14px] xl:ml-[16px] ml-[19px] 3xl:ml-[22px] lg:mt-[11px] xl:mt-[13px] mt-[15px] 3xl:mt-[18px] lg:text-[15px] xl:text-[17px] text-[20px] 3xl:text-[24px] text-black_900_a9 w-[auto]">
              Enter Results
            </Text>
            <Line className="bg-black_900_65 h-[1px] lg:mt-[12px] xl:mt-[14px] mt-[16px] 3xl:mt-[19px] w-[100%]" />
            <Input
              className="bg-transparent border border-bluegray_100 border-solid rounded-radius8 font-normal not-italic lg:pl-[12px] xl:pl-[14px] pl-[16px] 3xl:pl-[19px] lg:pr-[27px] xl:pr-[31px] pr-[35px] 3xl:pr-[42px] lg:py-[10px] xl:py-[11px] py-[13px] 3xl:py-[15px] lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] placeholder:text-bluegray_400 text-bluegray_400 w-[100%]"
              wrapClassName="3xl:ml-[22px] 3xl:mt-[22px] lg:ml-[14px] lg:mt-[14px] ml-[19px] mt-[19px] w-[90%] xl:ml-[16px] xl:mt-[16px]"
              name="Group226"
              onChange={(e) => {
                form.handleChange("target", e.target.value);
              }}
              errors={form?.errors?.target}
              value={form?.values?.target}
              placeholder="Enter result"
            ></Input>
            <Button className="bg-blue_A700 font-normal lg:mb-[18px] xl:mb-[21px] mb-[24px] 3xl:mb-[28px] lg:ml-[231px] xl:ml-[264px] ml-[297px] 3xl:ml-[356px] lg:mt-[34px] xl:mt-[39px] mt-[44px] 3xl:mt-[52px] not-italic xl:py-[10px] py-[12px] 3xl:py-[14px] lg:py-[9px] rounded-radius5 lg:text-[10px] xl:text-[12px] text-[14px] 3xl:text-[16px] text-center text-white_A700 w-[21%]" 
              onClick={() => {
                form.handleSubmit(submit);
              }}
            >
              Submit
            </Button>
          </Column>
        </div>
      </ModalProvider>
    </>
  );
};

export default Modal;
