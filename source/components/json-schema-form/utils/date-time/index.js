import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

const dateTimeUserFormat = /(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/;

export const dateTimeUserFormatString = 'dd/mm/yyyy, HH:MM';
export const dateTimeAutoCorrectPipe = createAutoCorrectedDatePipe(
  dateTimeUserFormatString,
);

const leftPad = (string, desiredLength, symbol) => {
  const missingCharsCount = desiredLength - String(string).length;

  return `${symbol.repeat(Math.max(0, missingCharsCount))}${string}`;
};

export function fromIsoToUserDateTime(machineDateTime) {
  if (!machineDateTime) {
    return '';
  }

  const date = new Date(machineDateTime);

  return `${leftPad(date.getDate(), 2, '0')}/${leftPad(
    date.getMonth() + 1,
    2,
    '0',
  )}/${date.getFullYear()} ${leftPad(date.getHours(), 2, '0')}:${leftPad(
    date.getMinutes(),
    2,
    '0',
  )}`;
}

export function fromUserToIsoDateTime(userDateTime) {
  if (!userDateTime) {
    return '';
  }

  const [
    ,
    day = '01',
    month = '01',
    year = '1970',
    hours = '00',
    minutes = '00',
  ] =
    userDateTime.match(dateTimeUserFormat) || [];
  const date = new Date(year, Number(month) - 1, day, hours, minutes);

  return date.toISOString();
}
