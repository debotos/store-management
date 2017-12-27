const GENERATE_PDF = DataIncomming => {
  let {
    entries,
    previousReadyCash,
    expensesTotal,
    incomeTotal,
    fromNowReadyCash
  } = DataIncomming;

  console.log("====================================");
  console.log("Generating PDF with...", DataIncomming);
  console.log("====================================");
};

export default GENERATE_PDF;
