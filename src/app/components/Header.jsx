import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/Supreme_Logo.svg';
import DayJS from 'dayjs'
import DayJSUtc from 'dayjs/plugin/utc'
import DayJSTimezone from 'dayjs/plugin/timezone'
import DayJSAdvancedFormat from 'dayjs/plugin/advancedFormat'

DayJS.extend(DayJSUtc)
DayJS.extend(DayJSTimezone)
DayJS.extend(DayJSAdvancedFormat)

const StyledTime = styled.time`
  display: block;
  margin: 10px auto;
  text-align: center;
  font: normal 12px / 1.5em "Courier-New", Courier, Monaco, sans-serif;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  
  flex: 0 1 100px;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const Clock = () => {
    const [intervalId, setIntervalId] = useState(0);
    const [time, setTime] = useState(new Date());

    useEffect(() => {

        const _intervalId = setInterval(() => {
            const newDate = new Date();
            if (time.getMinutes() !== newDate.getMinutes())
                setTime(newDate);
        }, 1000);

        setIntervalId(_intervalId);

        return () => {
            setTime(new Date())
            setIntervalId(prevState => {
                clearInterval(intervalId);
                return null;
            })
        };
    }, []);

    const getDateString = () => DayJS(time).tz('Europe/London').format('DD/MM/YYYY hh:mma [LDN]')

    return (
        <StyledTime>
            {getDateString()}
        </StyledTime>
    );
};

export const Header = () => {
    return (
        <StyledHeader>
            <img src={logo} alt={'Supreme Bot'} height={45} />
            <Clock />
        </StyledHeader>
    );
};
