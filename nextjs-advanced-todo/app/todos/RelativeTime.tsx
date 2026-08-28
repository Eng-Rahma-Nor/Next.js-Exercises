"use client";

import { useEffect, useState } from "react";

type Props = {
  date: string;
};

export default function RelativeTime({ date }: Props) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const difference = now - new Date(date).getTime();

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return <span>just now</span>;
  }

  if (minutes < 60) {
    return (
      <span>
        {minutes} {minutes === 1 ? "minute" : "minutes"} ago
      </span>
    );
  }

  if (hours < 24) {
    return (
      <span>
        {hours} {hours === 1 ? "hour" : "hours"} ago
      </span>
    );
  }

  return (
    <span>
      {days} {days === 1 ? "day" : "days"} ago
    </span>
  );
}