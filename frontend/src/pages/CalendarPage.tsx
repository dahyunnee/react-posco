// import React, { useEffect, PureComponent } from "react";
// import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import axios from "axios";

import {
  BarChart,
  Bar,
  Pie,
  PieChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Header from "../components/common/Header";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import { EventContentArg } from "@fullcalendar/core";
import EventApi from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ProgressBar from "../components/emotionResult/ProgressBar";
import { CalendarType } from "../../types/calendar/calendarType";
import { CalendarListType } from "../../types/calendar/calendarListType";
import { CalendarEventType } from "../../types/calendar/calendarEventType";
import { CalendarDataType } from "../../types/calendar/calendarDataType";
import { getCalendarAction } from "../redux/modules/calendar";
// import { useNavigate } from "react-router-dom";

// const data = [
//   { 일: "2024-01-01", "이번 달 행복 지수": 0, "이번 달 우울 지수": 0 },
//   // { 군구: '동대문구', '이번 달 행복 지수': 30480, '이번 달 우울 지수': 56000},
//   // { 군구: '마포구', '이번 달 행복 지수': 27250, '이번 달 우울 지수': 23000},
//   // { 군구: '구로구', '이번 달 행복 지수': 49870, '이번 달 우울 지수': 67000},
//   // { 군구: '강남구', '이번 달 행복 지수': 51420, '이번 달 우울 지수': 55000},
// ];
// const events = [
//   {
//     title: "📕",
//     start: new Date("2024-1-22"),
//     end: new Date("2024-1-23"),
//     color: "pink",
//     allDay: true,
//   },
//   {
//     title: "Meeting2",
//     start: new Date("2024-1-30"),
//     end: new Date("2024-1-31"),
//     color: "#2D8CFF",
//   },
// ];

// interface MyEventContentArg {
//     event: EventApi; // 여기서 EventApi는 FullCalendar에서 제공하는 이벤트 객체의 타입입니다.
//     // ... EventContentArg에 해당하는 다른 필요한 속성들을 추가합니다.
//   }
const renderEventContent = (eventInfo: EventContentArg) => {
  const event = eventInfo.event as any;
  return (
    <>
      <i>{event.title}</i>
    </>
  );
};
const CalendarPage = () => {
  // export default class CalendarPage extends PureComponent {
  // const users = useAppSelector((state) => state.user.userData);

  //    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userData);
  const [calendarData, setCalendarData] = useState<CalendarListType | null>();
  const [fearCount, setFearCount] = useState<number>(0);
  const [happyCount, setHappyCount] = useState<number>(0);
  const [angerCount, setAngerCount] = useState<number>(0);
  const [surpriseCount, setSurpriseCount] = useState<number>(0);
  const [sadCount, setSadCount] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEventType[]>();
  const [data, setData] = useState<CalendarDataType[]>();

  const sexRatioData = [
    { name: "불안", value: fearCount, fill: "#B588FF" },
    { name: "놀람", value: surpriseCount, fill: "#FFEC88" },
    { name: "분노", value: angerCount, fill: "#FF88B3" },
    { name: "기쁨", value: happyCount, fill: "#2D8CFF" },
    { name: "슬픔", value: sadCount, fill: "#88BFFF" },
  ];
  const date = new Date().getFullYear() + "-" + new Date().getMonth();
  const getResultHandler = async () => {
    await axios
      .get(
        `http://localhost:8080/diary/list/calendar?userId=${user.id}&searchMonth=2024-01`
      )
      .then((res) => {
        console.log(res.data);
        setCalendarData(res.data);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  const settingData = () => {
    console.log("유저", user.id);
    const tempData = [];
    const tempEvents = [];
    if (calendarData != null) {
      if (!Array.isArray(calendarData)) {
        const calendar: CalendarType = calendarData.calendarList[0];
        tempData.push({
          일: calendar.writeDate,
          "이번 달 행복 지수": calendar.happiness,
          "이번 달 우울 지수": calendar.sadness + calendar.anger,
        });
        setFearCount(fearCount + calendar.fear);
        setHappyCount(happyCount + calendar.happiness);
        setAngerCount(angerCount + calendar.anger);
        setSurpriseCount(surpriseCount + calendar.surprised);
        setSadCount(sadCount + calendar.sadness);
        setStartDate(new Date(calendar.writeDate));
        let tempDate = new Date(calendar.writeDate);
        tempDate.setDate(tempDate.getDate() + 3);
        setEndDate(tempDate)
        tempEvents.push({
          title: "📕",
          start: startDate,
          end: endDate,
          color: "pink",
          allDay: true,
        });
      } else {
        calendarData.forEach((calendar: CalendarType) => {
        tempData.push({
            일: calendar.writeDate,
            "이번 달 행복 지수": calendar.happiness,
            "이번 달 우울 지수": calendar.sadness + calendar.anger,
          });
          setFearCount(fearCount + calendar.fear);
          setHappyCount(happyCount + calendar.happiness);
          setAngerCount(angerCount + calendar.anger);
          setSurpriseCount(surpriseCount + calendar.surprised);
          setSadCount(sadCount + calendar.sadness);
          let startDate = new Date(calendar.writeDate);
          let endDate = new Date(calendar.writeDate);
          tempEvents.push({
            title: "📕",
            start: startDate,
            end: new Date(endDate.setDate(endDate.getDate() + 3)),
            color: "pink",
            allDay: true,
          });
        });
      }
      setData(tempData);
      setEvents(tempEvents);
      console.log(fearCount, happyCount, angerCount, sadCount);
      console.log(data);
      console.log(events);
    }
  };

  useEffect(() => {
    getResultHandler()
    // .then(()=>{settingData()});
    .then(() => setTimeout(()=>{
        settingData()}, 1000));
  }, []);

  return (
    <Layout>
      <Left style={{ marginLeft: "50px" }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={renderEventContent}
        />
      </Left>
      <Right className="rr" style={{ flexDirection: "row", width: "45%" }}>
        <div style={{ display: "flex" }}>
          <Left>
            <div>
              <h1 style={{ marginBottom: "30px" }}>이 달 감정 비율</h1>
              <PieChart width={400} height={300}>
                <Legend
                  height={110}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconSize={7}
                  // payload={[
                  //     { value: `남 ${manCount}%`, type: 'square', color: '#EB6927' },
                  //     { value: `여 ${womanCount}%`, type: 'square', color: '#2D8CFF' },
                  // ]}
                />
                <Pie
                  data={sexRatioData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  cx={80}
                  cy={100}
                />

                <Tooltip />
              </PieChart>
            </div>
          </Left>
          <Right
            className="xc"
            style={{
              backgroundColor: "#FFF3DA",
              borderRadius: "30px",
              border: "30px solid #FFF3DA",
            }}
          >
            <h1>이 달 마음 지수</h1>
            {/* <ProgressBar
              style={{ width: "600px", height: "400px" }}
            ></ProgressBar>
            <ProgressBar></ProgressBar> */}
            <ProgressBar availableItem={happyCount} barName={"행복지수"}></ProgressBar>
            <ProgressBar availableItem={sadCount} barName={"우울지수"}></ProgressBar>

            {/* <div >
                            <h1 style={{ marginBottom: '30px' }}>2023년도 사용자</h1>
                            <PieChart width={400} height={300}>
                                <Legend
                                height={110}
                                layout="vertical"
                                verticalAlign="middle"
                                align="right"
                                iconSize={7}
                                payload={[
                                    { value: `남 ${manCount}%`, type: 'square', color: '#EB6927' },
                                    { value: `여 ${womanCount}%`, type: 'square', color: '#2D8CFF' },
                                ]}
                                
                                />
                                <Pie
                                data={sexRatioData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                outerRadius={80}
                                cx={80}
                                cy={100}
                                />

                                <Tooltip />
                            </PieChart>
                        </div> */}
          </Right>
        </div>
        <div style={{ display: "flex" }}>
          <Left
            style={{
              backgroundColor: "#FFF3DA",
              borderRadius: "30px",
              border: "30px solid #FFF3DA",
            }}
          >
            <LineChart
              width={400}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="일" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="이번 달 행복 지수"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              {/* <Line type="monotone" dataKey="비유동 인구 수" stroke="#82ca9d"/> */}
            </LineChart>
          </Left>
          <Right
            style={{
              backgroundColor: "#FFF3DA",
              borderRadius: "30px",
              border: "30px solid #FFF3DA",
            }}
          >
            <LineChart
              width={400}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="일" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* <Line type="monotone" dataKey="유동 인구 수" stroke="#8884d8" activeDot={{r:8}}/> */}
              <Line
                type="monotone"
                dataKey="이번 달 우울 지수"
                stroke="#82ca9d"
              />
            </LineChart>
          </Right>
        </div>
      </Right>
    </Layout>
  );
};
export default CalendarPage;
const Layout = styled.div`
  margin-top: 15px;
  // border: 5px solid #ffcc5c;
  display: flex;
  // height: 400px;
  color: ${(props) => props.theme.color.black};
  // font-size: 3rem;
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  font-family: OmyuPretty;
`;
const Left = styled.div`
  background-color: #fff3da;
  border-radius: 30px;
  border: 30px solid #fff3da;
  width: 45%;
  // padding:1%;
  margin-bottom: 1%;
  margin-right: 1%;
`;
const Right = styled.div`
  width: 45%;
  margin-bottom: 1%;
  // padding:1%;
`;
const Title = styled.div`
  background-color: #ffedc7;
  border-radius: 10px;
  border: 10px solid #ffedc7;
  height: 5%;
  width: 90%;
  // padding:1%;
  margin-bottom: 20%;
  margin-right: 1%;
  // position:absolute;
  // left:50%;
  // transform:translate(-50%);
`;
