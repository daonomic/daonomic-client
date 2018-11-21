const numberFormatter = new Intl.NumberFormat('en', {
  maximumFractionDigits: 20,
});

export default numberFormatter.format;
