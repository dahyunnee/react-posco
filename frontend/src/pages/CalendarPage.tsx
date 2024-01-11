import React, { useEffect, PureComponent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";


import {BarChart, Bar, Pie, PieChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Header from "../components/common/Header";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import {EventContentArg} from "@fullcalendar/core";
import EventApi from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ProgressBar from "../components/emotionResult/ProgressBar";
// import { useNavigate } from "react-router-dom";

const data = [
    { 군구: '광진구', '이번 달 행복 지수': 32760, '이번 달 우울 지수': 34000},
    { 군구: '동대문구', '이번 달 행복 지수': 30480, '이번 달 우울 지수': 56000},
    { 군구: '마포구', '이번 달 행복 지수': 27250, '이번 달 우울 지수': 23000},
    { 군구: '구로구', '이번 달 행복 지수': 49870, '이번 달 우울 지수': 67000},
    { 군구: '강남구', '이번 달 행복 지수': 51420, '이번 달 우울 지수': 55000},
];
const events = [
    { title: '📕', start: new Date('2024-1-22') , end: new Date('2024-1-23'), color:"pink", allDay:true},
  	{ title: 'Meeting2', start: new Date('2024-1-30'), end: new Date('2024-1-31'), color:"#2D8CFF" }
];
const manCount = 5;
const womanCount = 5;

const sexRatioData = [
{ name: '남', value: manCount, fill: '#EB6927' },
{ name: '여', value: womanCount, fill: '#2D8CFF' },
];
// interface MyEventContentArg {
//     event: EventApi; // 여기서 EventApi는 FullCalendar에서 제공하는 이벤트 객체의 타입입니다.
//     // ... EventContentArg에 해당하는 다른 필요한 속성들을 추가합니다.
//   }
const renderEventContent=(eventInfo:EventContentArg)=> {
    const event = eventInfo.event as any;
    return (
        <>
         <i>{event.title}</i>
        </>
    )
}
export default class CalendarPage extends PureComponent {
   // const users = useAppSelector((state) => state.user.userData);
    
   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

    render(){
        return(
            <Layout>
                <Left style={{marginLeft:"50px"}}>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    events={events}
                    eventContent={renderEventContent}
                    />
                </Left>
                <Right className="rr" style={{flexDirection:"row", width:"45%"}}>
                    <div style={{display:"flex"}}>
                        <Left>
                        <div >
                                <h1 style={{ marginBottom: '30px' }}>이 달 감정 비율</h1>
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
                            </div>
                        </Left>
                        <Right className="xc" style={{backgroundColor:"#FFF3DA", borderRadius: "30px", border: "30px solid #FFF3DA"}}>
                            
                            <h1>이 달 마음 지수</h1>
                            <ProgressBar style={{width:"600px", height:"400px"}}></ProgressBar>
                            <ProgressBar></ProgressBar>
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
                    <div style={{display:"flex"}}>
                    <Left style={{backgroundColor:"#FFF3DA", borderRadius: "30px", border: "30px solid #FFF3DA"}}>
                        
                        <LineChart
                            width={400}
                            height={300}
                            data={data}
                            margin={{top:5, right:30, left:20, bottom:5}}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="군구" /><YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="이번 달 행복 지수" stroke="#8884d8" activeDot={{r:8}}/>
                            {/* <Line type="monotone" dataKey="비유동 인구 수" stroke="#82ca9d"/> */}
                        </LineChart>
                        </Left>
                        <Right style={{backgroundColor:"#FFF3DA", borderRadius: "30px", border: "30px solid #FFF3DA"}}>
                        <LineChart
                            width={400}
                            height={300}
                            data={data}
                            margin={{top:5, right:30, left:20, bottom:5}}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="군구" /><YAxis/>
                            <Tooltip/>
                            <Legend/>
                            {/* <Line type="monotone" dataKey="유동 인구 수" stroke="#8884d8" activeDot={{r:8}}/> */}
                            <Line type="monotone" dataKey="이번 달 우울 지수" stroke="#82ca9d"/>
                        </LineChart>
                        </Right>
                    </div>
                </Right>
            </Layout>
        )
    }
};
const Layout = styled.div`
    margin-top: 15px;
    // border: 5px solid #ffcc5c;
    display:flex; 
    // height: 400px;
    color: ${(props) => props.theme.color.black};
    // font-size: 3rem;
    font-weight: ${(props) => props.theme.fontWeight.semiBold};
    font-family: OmyuPretty;
`;
const Left = styled.div`
    background-color:#FFF3DA; 
    border-radius: 30px;
    border: 30px solid #FFF3DA;
    width:45%;
    // padding:1%;
    margin-bottom:1%;
    margin-right:1%;
`;
const Right = styled.div`
    width:45%;
    margin-bottom:1%;
    // padding:1%;
`;
const Title = styled.div`
    background-color:#FFEDC7; 
    border-radius: 10px;
    border: 10px solid #FFEDC7;
    height:5%;
    width:90%;
    // padding:1%;
    margin-bottom:20%;
    margin-right:1%;
    // position:absolute;
    // left:50%;
    // transform:translate(-50%);
`;

