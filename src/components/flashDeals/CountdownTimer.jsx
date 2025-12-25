import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endDate, className = "" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(endDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (timeLeft.isExpired) {
    return (
      <div className={`text-red-600 font-semibold ${className}`}>
        Deal Expired
      </div>
    );
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      {timeLeft.days > 0 && (
        <div className="text-center">
          <div className="text-lg font-bold text-primary-600">{timeLeft.days}</div>
          <div className="text-xs text-gray-600">d</div>
        </div>
      )}
      <div className="text-center">
        <div className="text-lg font-bold text-primary-600">{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className="text-xs text-gray-600">h</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold text-primary-600">{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className="text-xs text-gray-600">m</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold text-primary-600">{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className="text-xs text-gray-600">s</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
