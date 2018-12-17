const dateFormatter = new Intl.DateTimeFormat('en');
const dateTimeFormatter = new Intl.DateTimeFormat('en', {
  hour: 'numeric',
  minute: 'numeric',
});

export const formatDate = dateFormatter.format;
export const formatTime = dateTimeFormatter.format;
