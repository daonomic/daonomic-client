const numberFormat = new Intl.NumberFormat('en', {
  maximumFractionDigits: 20,
});

export default numberFormat.format;
