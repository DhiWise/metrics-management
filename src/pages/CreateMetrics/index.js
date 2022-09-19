import React from "react";

import { useNavigate } from "react-router-dom";
import { Column, Row, Img, Text, Stack, Button, Input, CreatableEditableSelect, SelectBox } from "components";
import { useState } from "react";
import { createMetrics, createCategories, createTargets } from '../../service/supabase';
import { getGoals } from "service/clickup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import useForm from "hooks/useForm";
import * as yup from "yup";

const CreateMetricsPage = () => {

  const navigate = useNavigate();
  const options = [];
  const [value, setValue] = useState([]);
  const [goals, setGoals] = React.useState();
  const [goal, setGoal] = React.useState();
  const [target, setTarget] = React.useState({});
  const [targetWithCategory, setTWithC] = React.useState({});

  const formValidationSchema = yup
    .object()
    .shape({ name: yup.string().required("Name is required") });
  const form = useForm(
    { name: "" },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  React.useEffect(() => {
    callClickUpApi();
  }, []);

  function setTargetWithCategory(category, target) {
    targetWithCategory[category] = target;
    setTWithC(targetWithCategory)
  }

  function callClickUpApi() {
    const req = {};
    getGoals(req)
      .then((res) => {
        let goals = res?.goals?.map(r => {
          return {
            label: r.name,
            value: r.id
          }
        })
        setGoals(goals);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleNavigate1() {
    navigate("/");
  }

  async function onSubmit() {
    let subCategories = value.map(v => v.value);
    for (let key in targetWithCategory) {
      if (!subCategories.includes(key)) {
        delete targetWithCategory[key];
        setTWithC(targetWithCategory);
      }
    }
    let data = await createMetrics({ name: form?.values?.name, goalId: goal });
    try {
      if (data && data.length) {
        let input = [];
        for (let i in value) {
          input.push({
            name: value[i].value,
            metricsId: data[0].id
          })
        }
        let results = await createCategories(input);
        let targets = [];
        for (let key in targetWithCategory) {
          results.map(r => {
            if (r.name === key) {
              targets.push({
                categoryId: r.id,
                month: new Date().toLocaleString('default', { month: 'long' }),
                target: targetWithCategory[key]
              })
            }
          })
        }
        await createTargets(targets)
      }
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <Column className="bg-white_A700 font-inter mx-[auto] lg:p-[35px] xl:p-[40px] p-[45px] 3xl:p-[54px] w-[100%]">
        <header className="lg:ml-[31px] xl:ml-[36px] ml-[41px] 3xl:ml-[49px] w-[100%]">
          <Row className="items-center w-[100%]">
            <a className="lg:h-[28px] xl:h-[32px] h-[35px] 2xl:h-[36px] 3xl:h-[43px] w-[13%]" href="https://dhiwise.com">
              <Img
                src="images/img_group_2.png"
                alt="Group"
              /></a>
            <Text className="cursor-pointer font-medium lg:ml-[645px] xl:ml-[776px] ml-[730px] 3xl:ml-[896px] lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-black_900_87 w-[auto]"
              onClick={handleNavigate1}>
              Dashboard
            </Text>
            <Text className="cursor-pointer font-medium lg:ml-[38px] xl:ml-[43px] ml-[49px] 3xl:ml-[58px] lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-blue_A700 w-[auto]">
              Create Metrics
            </Text>
          </Row>
        </header>
        <Text className="font-bold lg:ml-[31px] xl:ml-[36px] ml-[41px] 3xl:ml-[49px] lg:mt-[46px] xl:mt-[53px] mt-[60px] 3xl:mt-[72px] lg:text-[24px] xl:text-[28px] text-[32px] 3xl:text-[38px] text-black_900 w-[auto]">
          Create Metrics and Set Targets
        </Text>
        <Column className="items-center lg:ml-[31px] xl:ml-[36px] ml-[41px] 3xl:ml-[49px] lg:mt-[59px] xl:mt-[67px] 3xl:mt-[91px] lg:px-[193px] xl:px-[221px] px-[249px] 3xl:px-[298px] w-[89%]">
          <Stack className="bg-white_A700 lg:h-[298px] xl:h-[700px] h-[554px] 2xl:h-[555px] 3xl:h-[605px] lg:px-[20px] xl:px-[23px] px-[26px] 3xl:px-[31px] rounded-radius12 shadow-bs w-[92%]">
            <Column className="absolute h-[max-content] inset-[0] justify-center m-[auto] w-[99%]">
              <Column className="items-left ml-8 mt-5 justify-center w-[100%]">
                <Text className="font-medium mb-2 lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-black_900 w-[auto]">
                  Metrics Name
                </Text>
                <Input
                  className="bg-transparent border-bluegray_100 border-solid rounded-radius8  w-[100%]"
                  wrapClassName="w-[80%]"
                  name="Rectangle37"
                  placeholder="Enter name"
                  value={form?.values?.name}
                  errors={form?.errors?.name}
                  onChange={(e) => {
                    form.handleChange("name", e.target.value);
                  }}
                ></Input>
              </Column>
              <Column className="items-left ml-8 justify-center lg:mt-[23px] xl:mt-[26px] mt-[30px] 3xl:mt-[36px] w-[100%]">
                <Text className="font-medium lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-black_900 w-[auto]">
                  Sub-categories
                </Text>
                <CreatableEditableSelect
                  className="bg-transparent border-bluegray_100 border-solid font-normal  lg:py-[10px] xl:py-[11px] py-[13px] 3xl:py-[15px] rounded-radius8 lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-bluegray_400 w-[80%]"
                  placeholderClassName="bg-transparent text-bluegray_400"
                  name="Group226"
                  options={options} value={value} onChange={setValue}
                  placeHolder="Add Value and Press Enter"
                ></CreatableEditableSelect>
              </Column>
              <Column className="items-left ml-8 justify-center lg:mt-[15px] xl:mt-[18px] mt-[20px] 3xl:mt-[30px] w-[100%]">
                <Text className="font-medium mb-2 lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-black_900 w-[auto]">
                  Goals
                </Text>
                <SelectBox
                  className="bg-transparent border border-bluegray_100 border-solid font-normal  lg:pl-[12px] xl:pl-[14px] pl-[16px] 3xl:pl-[19px] lg:py-[10px] xl:py-[11px] py-[13px] 3xl:py-[15px] rounded-radius8 lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-bluegray_400 w-[80%]"
                  placeholderClassName="bg-transparent text-bluegray_400"
                  name="Group226"
                  placeholder="Associate Goal"
                  onChange={(value) => {
                    setGoal(value);
                  }}
                  options={goals}
                  isSearchable={false}
                  isMulti={false}
                  indicator={
                    <Img
                      src="images/img_vector.png"
                      className="w-[10.54px] h-[6.25px] mr-[22px] lg:w-[8px] lg:h-[5px] lg:mr-[17px] xl:w-[9px] xl:h-[6px] xl:mr-[19px] 2xl:w-[10px] 2xl:h-[7px] 3xl:w-[12px] 3xl:h-[8px] 3xl:mr-[26px]"
                      alt="Vector"
                    />
                  }
                ></SelectBox>
              </Column>
              <Column className="items-left ml-8 mt-5 justify-center w-[100%]">
                <Text className="font-medium mb-2 lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-black_900 w-[auto]">
                  Current Month
                </Text>
                <Input
                  className="bg-transparent border-0 rounded-radius8 w-[100%]"
                  wrapClassName="border border-bluegray_100 border-solid rounded-radius8 w-[80%]"
                  name="Rectangle37"
                  value={new Date().toLocaleString('default', { month: 'long' })}
                  disabled={true}
                ></Input>
              </Column>
              {value.length ? value.map((record) => {
                return (<Column className="items-left ml-8 mt-5 justify-center w-[100%]">
                  <Text className="font-medium mb-2 lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-black_900 w-[auto]">
                    Set Target for {record?.label}
                  </Text>
                  <Input
                    className="bg-transparent border-0 rounded-radius8 w-[100%]"
                    wrapClassName="border border-bluegray_100 border-solid rounded-radius8 w-[80%]"
                    name="Rectangle37"
                    value={target[record.value] ? target[record.value] : null}
                    onChange={e => {
                      setTarget(e.target.value)
                      setTargetWithCategory(record.value, e.target.value)
                    }}
                  ></Input>
                </Column>)
              }) : null}
              <Row className="items-left justify-start ml-8 mt-5 w-[100%]">
                <Button className=" bg-blue_A700 bottom-[0]  font-normal not-italic xl:py-[10px] py-[12px] 3xl:py-[14px] lg:py-[9px] rounded-radius5 lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-center text-white_A700 w-[16%]"
                  onClick={() => {
                    form.handleSubmit(onSubmit);
                  }}>
                  Submit
                </Button>
              </Row>
            </Column>
          </Stack>
        </Column>
      </Column>
      <ToastContainer />
      <div className="text-center p-6 bg-gray-200">
        <span>Made with ❤️ from DhiWise</span>
      </div>
    </>
  );
};

export default CreateMetricsPage;
