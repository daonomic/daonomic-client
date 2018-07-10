import leftPad from 'left-pad';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

const dateUserFormat = /(\d{2})\/(\d{2})\/(\d{4})/;

export const dateUserFormatString = 'dd/mm/yyyy';
export const dateAutoCorrectPipe = createAutoCorrectedDatePipe(
  dateUserFormatString,
);

export function fromMachineToUserDate(machineDate) {
  if (!machineDate) {
    return '';
  }

  const date = new Date(machineDate);

  return `${leftPad(date.getDate(), 2, '0')}/${leftPad(
    date.getMonth() + 1,
    2,
    '0',
  )}/${date.getFullYear()}`;
}

export function fromUserToMachineDate(userDate) {
  if (!userDate) {
    return '';
  }

  const [, day = '01', month = '01', year = '1970'] =
    userDate.match(dateUserFormat) || [];

  return `${year}-${month}-${day}`;
}
