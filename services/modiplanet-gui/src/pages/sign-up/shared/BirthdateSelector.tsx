import { useState, useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import dayjs from 'dayjs';
import useTranslator from '@src/components/hooks/useTranslator';

export type BirthDateArg = {
  year: string;
  month: string;
  day: string;
};

interface BirthdateSelectorProps {
  onChange?: (date: BirthDateArg) => void;
}

export const BirthdateSelector = ({ onChange }: BirthdateSelectorProps) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const currentYear = dayjs().year();
  const years = Array.from({ length: 125 }, (_, i) => `${currentYear - i}`);
  const months = Array.from({ length: 12 }, (_, i) =>
    dayjs().month(i).format('MM'),
  );
  const initialDays = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, '0'),
  );
  const { t } = useTranslator();

  const [days, setDays] = useState<string[]>(initialDays);

  useEffect(() => {
    function getDaysInMonth(year: number, month: number) {
      return new Date(year, month, 0).getDate();
    }

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();

    if (selectedYear && selectedMonth) {
      const daysInMonth = getDaysInMonth(
        Number(selectedYear),
        Number(selectedMonth),
      );
      const updatedDays: string[] = [];

      for (let i = 1; i <= daysInMonth; i++) {
        if (
          Number(selectedYear) === todayYear &&
          Number(selectedMonth) === todayMonth &&
          i > todayDate
        ) {
          break;
        }
        updatedDays.push(i.toString().padStart(2, '0'));
      }

      setDays(updatedDays);

      if (selectedDay && !updatedDays.includes(selectedDay)) {
        setSelectedDay('');
      }
    }

    if (
      Number(selectedYear) === todayYear &&
      Number(selectedMonth) > todayMonth
    ) {
      setSelectedMonth('');
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  useEffect(() => {
    onChange &&
      onChange({
        year: selectedYear,
        month: selectedMonth,
        day: selectedDay,
      });
  }, [selectedYear, selectedMonth, selectedDay]);

  return (
    <div className="flex justify-between grow gap-3 sm:gap-[7px] w-full">
      <Select
        placeholder={t('YEAR_FORMAT')}
        aria-label="year"
        selectedKeys={selectedYear ? [selectedYear] : []}
        onChange={(e) => setSelectedYear(e.target.value)}
        classNames={{
          trigger: 'bg-white border border-[#DDDDDD] shadow-none sm:h-[46px]',
        }}
      >
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </Select>
      <Select
        placeholder="MM"
        aria-label="month"
        selectedKeys={selectedMonth ? [selectedMonth] : []}
        onChange={(e) => setSelectedMonth(e.target.value)}
        classNames={{
          trigger: 'bg-white border border-[#DDDDDD] shadow-none sm:h-[46px]',
        }}
      >
        {months.map((month) => (
          <SelectItem key={month} value={month}>
            {month}
          </SelectItem>
        ))}
      </Select>
      <Select
        placeholder="DD"
        aria-label="day"
        selectedKeys={selectedDay ? [selectedDay] : []}
        onChange={(e) => setSelectedDay(e.target.value)}
        classNames={{
          trigger: 'bg-white border border-[#DDDDDD] shadow-none sm:h-[46px]',
        }}
      >
        {days.map((day) => (
          <SelectItem key={day} value={day}>
            {day}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
