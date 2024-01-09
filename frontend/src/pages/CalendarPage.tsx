import React, { useEffect, PureComponent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
// import { useNavigate } from "react-router-dom";

const data = [
    { 군구: '광진구', '유동 인구 수': 32760, '비유동 인구 수': 34000},
    { 군구: '동대문구', '유동 인구 수': 30480, '비유동 인구 수': 56000},
    { 군구: '마포구', '유동 인구 수': 27250, '비유동 인구 수': 23000},
    { 군구: '구로구', '유동 인구 수': 49870, '비유동 인구 수': 67000},
    { 군구: '강남구', '유동 인구 수': 51420, '비유동 인구 수': 55000},
]

export default class CalendarPage extends PureComponent {
   // const users = useAppSelector((state) => state.user.userData);
    
   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

    render(){
        return(
            <LineChart
                width={1000}
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
        )
    }
};