import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './ArrivalTimeSelect.scss';

const times = [
  '08:00 AM', '08:30 AM',
  '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM',
  '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM',
  '09:00 PM', '09:30 PM',
  '10:00 PM', '10:30 PM',
  '11:00 PM'
];

const parseTimeToDate = (timeStr, dateStr) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  const [year, month, day] = dateStr.split('-');
  return new Date(year, month - 1, day, hours, minutes);
};

const ArrivalTimeSelect = ({ selectedTime, onTimeChange, reservationDate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const now = new Date();

  const isToday = reservationDate === now.toISOString().split("T")[0];

  return (
    <div className="arrival-time-select">
      <label>Giờ đến</label>
      <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(prev => !prev)}>
        <DropdownToggle caret className="arrival-toggle">
          {selectedTime || 'Chọn giờ'}
        </DropdownToggle>
        <DropdownMenu className="arrival-menu">
          {times.map((time, index) => {
            const isDisabled =
              !reservationDate || (isToday && parseTimeToDate(time, reservationDate) <= now);

            return (
              <DropdownItem
                key={index}
                onClick={() => !isDisabled && onTimeChange(time)}
                active={time === selectedTime}
                disabled={isDisabled}
                className={isDisabled ? 'disabled-time' : ''}
              >
                {time}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ArrivalTimeSelect;
