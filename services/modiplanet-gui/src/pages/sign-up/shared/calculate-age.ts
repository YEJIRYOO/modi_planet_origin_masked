const calculateAge = function (birth: string): 'adult' | 'child' {
  const birthday = new Date(birth + 'T00:00:00.000Z');
  const currentDate = new Date();
  const currentDay = String(currentDate.getDate()).padStart(2, '0');
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentYear = currentDate.getFullYear();
  const current =
    currentYear + '-' + currentMonth + '-' + currentDay + 'T00:00:00.000Z';
  const today = new Date(current);

  let years = today.getFullYear() - birthday.getFullYear();
  birthday.setFullYear(today.getFullYear());

  if (today < birthday) {
    years--;
  }

  return years >= 16 ? 'adult' : 'child';
};

export default calculateAge;
