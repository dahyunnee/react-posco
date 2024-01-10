import React, { useEffect, PureComponent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";


import {BarChart, Bar, Pie, PieChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Header from "../components/common/Header";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import {EventContentArg} from "@fullcalendar/core";
import EventApi from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import { useNavigate } from "react-router-dom";

const data = [
    { 군구: '광진구', '유동 인구 수': 32760, '비유동 인구 수': 34000},
    { 군구: '동대문구', '유동 인구 수': 30480, '비유동 인구 수': 56000},
    { 군구: '마포구', '유동 인구 수': 27250, '비유동 인구 수': 23000},
    { 군구: '구로구', '유동 인구 수': 49870, '비유동 인구 수': 67000},
    { 군구: '강남구', '유동 인구 수': 51420, '비유동 인구 수': 55000},
];
const events = [
    { title: 'Meeting1', start: new Date('2024-1-29') },
  	{ title: 'Meeting2', start: new Date('2024-1-30') }
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
                <Right className="rr" style={{flexDirection:"row"}}>
                    <div style={{display:"flex"}}>
                        <Left>

                        </Left>
                        <Right>
                            <div style={{ marginTop: '30px', marginLeft: '10px' }}>
                                <h1 style={{ marginBottom: '30px' }}>2023년도 사용자 성비</h1>
                                <PieChart width={280} height={280}>
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
                        </Right>
                    </div>
                    <div style={{display:"flex"}}>
                    <Left>
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
                            <Line type="monotone" dataKey="유동 인구 수" stroke="#8884d8" activeDot={{r:8}}/>
                            <Line type="monotone" dataKey="비유동 인구 수" stroke="#82ca9d"/>
                        </LineChart>
                        </Left>
                        <Right>
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
                            <Line type="monotone" dataKey="유동 인구 수" stroke="#8884d8" activeDot={{r:8}}/>
                            <Line type="monotone" dataKey="비유동 인구 수" stroke="#82ca9d"/>
                        </LineChart>
                        </Right>
                    </div>
                </Right>
            </Layout>
        )
    }
};
const Layout = styled.div`
    // border: 5px solid #ffcc5c;
    display:flex; 
    // height: 400px;
`;
const Left = styled.div`
    width:45%;
    padding:1%
    margin-right:1%
`;
const Right = styled.div`
    width:45%;
    // padding:1%;
`;
const Up = styled.div`

`;
const Down = styled.div`

`;
