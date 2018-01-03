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
              "Name: " + customer.name,
              "Phone Number: " + customer.number,
              "E-mail: " + customer.mail,
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
            text:
              "Previous Due = " +
              numeral(parseFloat(customer.prevDue)).format("0,0.00"),
            italics: true,
            bold: true,
            color: "red"
          },
          "Bill With Previous Due = " +
            numeral(parseFloat(customer.billWithDue)).format("0,0.00"),
          {
            text:
              "Deposit Now = " +
              numeral(parseFloat(customer.depositNow)).format("0,0.00"),
            italics: true,
            bold: true,
            color: "green"
          },
          {
            text:
              "New Due From Now = " +
              numeral(parseFloat(customer.newDue)).format("0,0.00"),
            italics: true,
            bold: true,
            color: "red"
          }
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
