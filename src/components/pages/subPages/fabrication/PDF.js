import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import numeral from "numeral";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const getCompanyPhoneNo = storeInfo => {
  let phone = [];
  phone.push(" " + storeInfo.number1);
  phone.push(" " + storeInfo.number2);
  phone.push(" " + storeInfo.number3);
  return phone;
};

const renderPrevDue = prevDue => {
  if (parseInt(prevDue, 10) === 0) {
    return " [paid]";
  } else {
    return numeral(parseFloat(prevDue)).format("0,0.00");
  }
};

const renderPrevAdvance = prevAdvance => {
  if (parseInt(prevAdvance, 10) === 0) {
    return " [No]";
  } else {
    return numeral(parseFloat(prevAdvance)).format("0,0.00");
  }
};

const renderNewAdvance = (allTotalWithPrevDue, depositWithAdvance) => {
  let newAdvance = 0;
  if (parseFloat(allTotalWithPrevDue) < parseFloat(depositWithAdvance)) {
    newAdvance =
      parseFloat(depositWithAdvance) - parseFloat(allTotalWithPrevDue);
  }
  if (parseFloat(allTotalWithPrevDue) === parseFloat(depositWithAdvance)) {
    newAdvance = 0;
  }
  if (parseInt(newAdvance, 10) === 0) {
    return {};
  } else {
    return {
      text:
        "New Advance From Now = " +
        numeral(parseFloat(newAdvance)).format("0,0.00"),
      italics: true,
      bold: true,
      color: "green"
    };
  }
};

const renderNewDue = (allTotalWithPrevDue, depositWithAdvance) => {
  let newDue = 0;
  if (parseFloat(allTotalWithPrevDue) > parseFloat(depositWithAdvance)) {
    newDue = parseFloat(allTotalWithPrevDue) - parseFloat(depositWithAdvance);
  }
  if (parseFloat(allTotalWithPrevDue) === parseFloat(depositWithAdvance)) {
    newDue = 0;
  }
  if (parseInt(newDue, 10) === 0) {
    return {
      text: "New Due From Now = [paid]",
      italics: true,
      bold: true,
      color: "red"
    };
  } else {
    return {
      text:
        "New Due From Now = " + numeral(parseFloat(newDue)).format("0,0.00"),
      italics: true,
      bold: true,
      color: "red"
    };
  }
};

function GENERATE_PDF(data, date = null) {
  let { details, customer, memoNumber, storeInfo } = data;
  console.log("====================================");
  console.log("GENERATE_PDF got Date ", date);
  console.log("====================================");
  var docDefinition = {
    watermark: {
      text: storeInfo.name,
      color: "blue",
      opacity: 0.2,
      bold: true,
      italics: false
    },
    content: [
      { text: storeInfo.name, style: "header", alignment: "center" },
      {
        text:
          "For All kinds of - Glass, SS, Pipe, Thai Aluminium, False Celling, Accessories",
        alignment: "center",
        fontSize: 8,
        bold: true,
        margin: [0, -4, 0, 0]
      },
      {
        text: storeInfo.address + " |" + getCompanyPhoneNo(storeInfo),
        fontSize: 10,
        bold: true,
        alignment: "center"
      },
      { text: "\n" },

      {
        text: "Customer Details:\n",
        bold: true,
        fontSize: 10,
        margin: [0, -5, 0, 0]
      },
      {
        fontSize: 10,
        columns: [
          {
            ul: [
              "Name: " + customer.name + ", Phone: " + customer.number,
              customer.mail && "E-mail: " + customer.mail,
              "Address: " + customer.address
            ]
          },
          {
            type: "none",
            fontSize: 10,
            margin: [0, -5, 0, 0],
            ul: [
              {
                text: "Memo No. " + memoNumber,
                italics: true,
                fontSize: 12,
                bold: true,
                alignment: "right"
              },
              {
                text: date ? `Date: ${date}` : `Date: ${Date().substr(0, 15)}`,
                alignment: "right"
              }
            ]
          }
        ]
      },

      { text: "\n\n" },
      // Render the fabrication details here
      {
        text: details,
        bold: true
      },
      { text: "\n" },
      {
        alignment: "right",
        type: "none",
        ul: [
          "Bill = " + numeral(parseFloat(customer.bill)).format("0,0.00"),

          {
            text: "Previous Due = " + renderPrevDue(customer.prevDue),
            italics: true,
            bold: true,
            color: "red"
          },
          "Bill With Previous Due = " +
            numeral(parseFloat(customer.billWithDue)).format("0,0.00"),
          {
            text: "Previous Advance = " + renderPrevAdvance(customer.advance),
            italics: true,
            bold: true,
            color: "green"
          },
          {
            text:
              "Deposit Now = " +
              numeral(parseFloat(customer.depositNow)).format("0,0.00"),
            italics: true,
            bold: true,
            color: "green"
          },
          renderNewAdvance(
            customer.allTotalWithPrevDue,
            customer.depositWithAdvance
          ),
          renderNewDue(
            customer.allTotalWithPrevDue,
            customer.depositWithAdvance
          )
        ]
      },
      { text: "\n\n" },
      {
        columns: [
          {
            type: "none",
            ul: [
              {
                text: "---------------------------------",
                alignment: "left"
              },
              { text: "Receivers Signature", alignment: "left" }
            ]
          },
          {
            type: "none",
            ul: [
              {
                text: "----------------------------------------",
                alignment: "right"
              },
              { text: "For " + storeInfo.name, alignment: "right" }
            ]
          }
        ]
      }
    ],
    styles: {
      header: {
        fontSize: 25,
        bold: true,
        margin: [0, -20, 0, 3] // [Left, Top, Right, Bottom]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableDesign: {
        fontSize: 8,
        margin: [0, 5, 0, 5]
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: "black"
      }
    },
    defaultStyle: {
      // alignment: 'justify'
    }
  };

  //End
  let pdf_name;
  if (date) {
    pdf_name =
      memoNumber +
      "_" +
      "[" +
      customer.number +
      "]" +
      "fabrication_history_memo_" +
      customer.name +
      "_" +
      Date().substr(0, 15);
  } else {
    pdf_name =
      memoNumber +
      "_" +
      "[" +
      customer.number +
      "]" +
      "fabrication_memo_" +
      customer.name +
      "_" +
      Date().substr(0, 15);
  }
  pdfMake.createPdf(docDefinition).download(pdf_name);
}

export default GENERATE_PDF;
