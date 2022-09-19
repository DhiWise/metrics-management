import React from "react";

import { useNavigate } from "react-router-dom";
import { getMetricsSelect } from "service/supabase";
import { Column, Row, Img, Text, List, Button } from "components";
import Modal from "modals/Modal";

const DashboardPage = () => {

  const [apiData, setApiData] = React.useState();
  React.useEffect(() => {
    callApi();
  }, []);
  const navigate = useNavigate();
  const [catId, setCatId] = React.useState("");

  const [isOpenModal, setModal] = React.useState(false);
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function callApi() {
    const req = { params: { select: "*" } };
    getMetricsSelect(req)
      .then((res) => {
        setApiData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleNavigate() {
    navigate("/createmetrics");
  }

  function handleOpenModal(id) {
    setCatId(id);
    setModal(true);
  }

  function handleCloseModal() {
    setModal(false);
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
            <Text className="cursor-pointer font-medium lg:ml-[645px] xl:ml-[776px] ml-[730px] 3xl:ml-[896px] lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-blue_A700 w-[auto]">
              Dashboard
            </Text>
            <Text className="cursor-pointer font-medium lg:ml-[38px] xl:ml-[43px] ml-[49px] 3xl:ml-[58px] lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-black_900_87 w-[auto]"
              onClick={handleNavigate}>
              Create Metrics
            </Text>
          </Row>
        </header>
        <List
          className="gap-[0] min-h-[auto] lg:mt-[46px] xl:mt-[53px] mt-[60px] 3xl:mt-[72px] w-[100%]"
          orientation="vertical"
          key="test"
        >
          {apiData?.length ? apiData?.map((apiDataResponseEle) => {
            return (
              <Column className="bg-white_A700 lg:my-[11px] xl:my-[13px] my-[15px] 3xl:my-[18px] lg:p-[23px] xl:p-[26px] p-[30px] 3xl:p-[36px] rounded-radius12 shadow-bs w-[100%]">
                <Row className="items-center">
                  <Text className="font-medium lg:text-[15px] xl:text-[17px] text-[20px] 3xl:text-[24px] text-black_900 w-[auto]">
                    Metrics Name :
                  </Text>
                  <Text className="font-medium lg:ml-[28px] xl:ml-[31px] ml-[34px] 3xl:ml-[38px] lg:text-[15px] xl:text-[17px] text-[20px] 3xl:text-[24px] text-bluegray_401 w-[auto]">
                    {apiDataResponseEle?.name}
                  </Text>
                </Row>
                <Row
                  className="bg-cover bg-repeat lg:mt-[17px] xl:mt-[20px] mt-[23px] 3xl:mt-[27px] lg:p-[11px] xl:p-[13px] p-[15px] 3xl:p-[18px] w-[100%]"
                  style={{
                    backgroundImage: "url('images/img_group216_1.png')",
                  }}
                >
                  <Column className="lg:ml-[58px] xl:ml-[66px] ml-[75px] 3xl:ml-[90px] my-[1px] pb-[1px] pr-[1px] w-[29%]">
                    <Text className="font-normal lg:mr-[164px] xl:mr-[187px] mr-[211px] 3xl:mr-[253px] not-italic lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-black_900 w-[auto]">
                      Sub-Categories
                    </Text>

                    {
                      apiDataResponseEle.categories?.map((c) => {
                        return (
                          <Column className="lg:ml-[47px] xl:ml-[54px] ml-[61px] 3xl:ml-[73px] lg:mr-[200px] xl:mr-[229px] mr-[258px] 3xl:mr-[309px] lg:mt-[25px] xl:mt-[29px] mt-[33px] 3xl:mt-[39px] w-[7%]">
                            <Text className="flex font-normal lg:h-[17px] xl:h-[19px] h-[21px] 2xl:h-[22px] 3xl:h-[26px] items-center not-italic lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-gray_600 w-[auto]">
                              {c.name}
                            </Text>
                          </Column>
                        )
                      })
                    }
                  </Column>
                  {
                    Object.keys(apiDataResponseEle.results).map((key) => {
                      return (
                        <Column className="lg:ml-[58px] xl:ml-[66px] ml-[75px] 3xl:ml-[90px] my-[1px] pb-[1px] pr-[1px] w-[29%]">
                          <Text className="font-normal lg:mr-[164px] xl:mr-[187px] mr-[211px] 3xl:mr-[253px] not-italic lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-black_900 w-[auto]">
                            {key}
                          </Text>
                          {
                            apiDataResponseEle.results[key]?.map(rk => {
                              return (
                                <Column className="lg:ml-[47px] xl:ml-[54px] ml-[61px] 3xl:ml-[73px] lg:mr-[200px] xl:mr-[229px] mr-[258px] 3xl:mr-[309px] lg:mt-[25px] xl:mt-[29px] mt-[33px] 3xl:mt-[39px] w-[7%]">
                                  <Text className="flex font-normal lg:h-[17px] xl:h-[19px] h-[21px] 2xl:h-[22px] 3xl:h-[26px] items-center not-italic lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-gray_600 w-[auto]">
                                    {rk.result}
                                  </Text>
                                </Column>
                              )
                            })
                          }
                        </Column>
                      )
                    })
                  }
                  {
                    Object.keys(apiDataResponseEle.results).length < 2 ? <Column className="lg:ml-[58px] xl:ml-[66px] ml-[75px] 3xl:ml-[90px] my-[1px] pb-[1px] pr-[1px] w-[29%]">
                      <Text className="font-normal lg:mr-[164px] xl:mr-[187px] mr-[211px] 3xl:mr-[253px] not-italic lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-black_900 w-[auto]">
                        {months[new Date().getMonth() + 1]}
                      </Text>
                      {
                        apiDataResponseEle.categories?.map((c) => {
                          return (
                            <Row className="lg:mt-[26px] xl:mt-[30px] 2xl:mt-[34px] 3xl:mt-[40px] w-[23%]">
                              <Img
                                src="images/img_plus.png"
                                className="lg:h-[16px] xl:h-[18px] 2xl:h-[21px] 3xl:h-[25px] mb-[1px] lg:ml-[14px] xl:ml-[16px] 2xl:ml-[18px] 3xl:ml-[21px] lg:w-[15px] xl:w-[17px] 2xl:w-[20px] 3xl:w-[24px]"
                                alt="plus"
                                onClick={() => handleOpenModal(c.id)}
                              />
                            </Row>
                          )
                        })
                      }
                    </Column> : null
                  }
                  
                </Row>
                <Row className="items-center lg:mt-[23px] xl:mt-[26px] mt-[30px] 3xl:mt-[36px] w-[50%]">
                  <Text className="font-medium lg:text-[15px] xl:text-[17px] text-[20px] 3xl:text-[24px] text-black_900 w-[auto]">
                    Goal
                  </Text>
                  <Text className="bg-yellow_300 flex font-bold lg:h-[32px] xl:h-[36px] h-[40px] 2xl:h-[41px] 3xl:h-[49px] items-center leading-[normal] lg:ml-[15px] xl:ml-[17px] ml-[20px] 3xl:ml-[24px] lg:px-[5px] xl:px-[6px] px-[7px] 3xl:px-[8px] rounded-radius50 xl:text-[10px] text-[12px] 3xl:text-[14px] lg:text-[9px] text-black_900 text-center lg:w-[35px] xl:w-[40px] w-[45px] 3xl:w-[53px]">
                    {apiDataResponseEle?.goalPercentage} %
                  </Text>
                  <Text className="font-medium lg:ml-[28px] xl:ml-[31px] ml-[34px] 3xl:ml-[38px] lg:text-[15px] xl:text-[17px] text-[20px] 3xl:text-[24px] text-bluegray_401 w-[auto]">
                    {apiDataResponseEle?.goalName}
                  </Text>
                  <Text className="cursor-pointer hover:font-medium lg:ml-[15px] xl:ml-[17px] ml-[20px] 3xl:ml-[24px] lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px] text-blue_600 underline w-[auto]"
                    onClick={() => {
                      const win = window.open(apiDataResponseEle.link, "_blank");
                      win.focus();
                    }}
                  >
                    Check this Goal and Tasks
                  </Text>
                </Row>
              </Column>
            );
          }) : <Column className="mt-[20px] h-[350px]">No Metrics Found. <Text className="cursor-pointer text-blue_A700 w-[auto]" onClick={handleNavigate} > Create New </Text></Column>}
        </List>
      </Column>
      <div className="text-center p-6 bg-gray-200">
        <span>Made with ❤️ from DhiWise</span>
      </div>
      {isOpenModal ? (
        <Modal
          month={months[new Date().getMonth() + 1]}
          catId={catId}
          isOpen={isOpenModal}
          onRequestClose={handleCloseModal}
          callApi={callApi}
        />
      ) : null}
    </>
  );
};

export default DashboardPage;
