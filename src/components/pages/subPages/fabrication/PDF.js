import {
  COMPANY_NAME,
  COMPANY_ADDRESS,
  COMPANY_PHONE_NUMBER,
  COMPANY_OWENER
} from "../../../global/global";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import numeral from "numeral";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function GENERATE_PDF(data, date = null) {
  let { details, customer, memoNumber } = data;
  console.log("====================================");
  console.log("GENERATE_PDF got Date ", date);
  console.log("====================================");
  var docDefinition = {
    watermark: {
      text: COMPANY_NAME,
      color: "blue",
      opacity: 0.2,
      bold: true,
      italics: false
    },
    content: [
      { text: COMPANY_NAME, style: "header", alignment: "center" },

      {
        text: COMPANY_ADDRESS + " | " + " " + COMPANY_PHONE_NUMBER + " ",

        alignment: "center"
      },
      { text: "\n" },

      { text: "Customer Details:\n", bold: true },
      {
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
            ul: [
              {
                text: "Memo No. " + memoNumber,
                italics: true,
                fontSize: 16,
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
              { text: "For " + COMPANY_NAME, alignment: "right" }
            ]
          }
        ]
      }
    ],
    styles: {
      header: {
        fontSize: 30,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableDesign: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
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
