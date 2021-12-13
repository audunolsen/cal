import { useState, useEffect } from 'react'
import styles from './App.module.scss';
import cls from "./utils/cls";

const
  days = ["ma", "ti", "on", "to", "fr", "lø", "sø"],
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function App() {

  const
    [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()),
    [selectedYear, setSelectedYear] = useState(new Date().getFullYear()),
    [selectedStartDate, setSelectedStartDate] = useState<Date>(),
    [selectedEndDate, setSelectedEndDate] = useState<Date>();

  const
    firstDayOfMonth = new Date(selectedYear, selectedMonth).getDay(),
    daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate(),
    lastDayOfMonth  = new Date(selectedYear, selectedMonth + 1, 0).getDay(),
    padStart = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1,
    padEnd = lastDayOfMonth === 0 ? 0 : 7 - lastDayOfMonth;

  const isToday = (date: number) =>
    date === (new Date().getDate()) &&
    selectedMonth === (new Date().getMonth());

  const changeMonth = (dir: "PREV" | "NEXT") => {
    const
      prev = dir === "PREV" && -1,
      next = dir === "NEXT" && +1,
      variation: number = prev || next;

    const changeYear =
      (selectedMonth === 11 && next) ||
      (selectedMonth === 0 && prev);

    setSelectedYear(p => changeYear ? p + variation : p);
    setSelectedMonth(p => changeYear ? (next ? 0 : 11) : p + variation);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button onClick={() => changeMonth("PREV")}>PREV</button>
        <h2>{months[selectedMonth]} ({selectedYear})</h2>
        <button onClick={() => changeMonth("NEXT")}>NEXT</button>
      </div>
      <div className={styles.grid}>
        {days.map((day, i) => (
          <div key={i} className={styles.weekday}>{day}</div>
        ))}

        {[...Array(padStart).keys()].reverse().map(i => (
          <button key={i} disabled className={styles.date}>
            {new Date(selectedYear, selectedMonth, 0).getDate() - i}
          </button>
        ))}

        {[...Array(daysInMonth).keys()].map(i => (
          <button key={i} className={cls(styles.date, isToday(i + 1) && styles.today)}>
            {i + 1}
          </button>
        ))}

        {[...Array(padEnd).keys()].map(i => (
          <button key={i} disabled className={styles.date}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
}

export default App;

// useEffect(() => {
//   console.log(
//     "MONTH", selectedMonth,
//     "TOTAL", daysInMonth,
//     "FIRST DAY IN MONTH", firstDayOfMonth,
//     "LAST DAY OF MONTH", lastDayOfMonth
//   );
// }, [selectedMonth]);
