import {
  COMPANY_NAME,
  COMPANY_ADDRESS,
  COMPANY_PHONE_NUMBER,
  COMPANY_OWENER
} from "../../../global/global";

import moment from "moment";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import numeral from "numeral";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const extractDate = data => {
  var now = moment(data).format("dddd, MMMM Do YYYY, h:mm:ss a");
  now = now.substr(30, 41);
  // console.log(now);
  return now;
};

const renderIncomeTable = DataIncomming => {
  let {
    entries,
    previousReadyCash,
    expensesTotal,
    incomeTotal,
    fromNowReadyCash
  } = DataIncomming;

  let TableHeader = [
    {
      text: "Details",
      style: "tableHeader",
      alignment: "center"
    },
    {
      text: "Amount",
      style: "tableHeader",
      alignment: "center"
    }
  ];

  let Content = [
    [
      {
        text: "INCOME SECTION",
        style: "tableHeader",
        colSpan: 2,
        alignment: "center"
      },
      {}
    ],
    TableHeader
  ];

  entries.income.forEach(singleIncomeItem => {
    let item;
    if (singleIncomeItem.category === "others-income") {
      item = [
        {
          ul: [
            "Title: " + singleIncomeItem.title,
            "Category: OTHERS INCOME",
            "Time: " + extractDate(singleIncomeItem.moment)
          ]
        },
        {
          text: numeral(parseFloat(singleIncomeItem.amount)).format("0,0.00"),
          color: "green",
          alignment: "center",
          bold: true
        }
      ];
    } else {
      item = [
        {
          ul: [
            "Name: " + singleIncomeItem.name,
            {
              text: "Phone Number: " + singleIncomeItem.number,
              bold: true
            },
            "E-mail: " + singleIncomeItem.mail
              ? singleIncomeItem.mail
              : "Not Provided !",
            "Address: " + singleIncomeItem.address,
            {
              text: "Memo Number: " + singleIncomeItem.memoNumber,
              bold: true,
              color: "blue"
            },
            "Category: " + singleIncomeItem.category.toUpperCase(),
            "Time: " + extractDate(singleIncomeItem.moment)
          ]
        },
        {
          text: numeral(parseFloat(singleIncomeItem.amount)).format("0,0.00"),
          color: "green",
          alignment: "center",
          bold: true
        }
      ];
    }
    Content.push(item);
  });
  let Footer = [
    {
      text:
        "Today's Total Income = " +
        numeral(parseFloat(incomeTotal)).format("0,0.00"),
      style: "tableHeader",
      colSpan: 2,
      alignment: "right",
      color: "#4A148C"
    },
    {}
  ];

  Content.push(Footer);

  return Content;
};

const renderExpensesTable = DataIncomming => {
  let {
    entries,
    previousReadyCash,
    expensesTotal,
    incomeTotal,
    fromNowReadyCash
  } = DataIncomming;

  let TableHeader = [
    {
      text: "Details",
      style: "tableHeader",
      alignment: "center"
    },
    {
      text: "Amount",
      style: "tableHeader",
      alignment: "center"
    }
  ];

  let Content = [
    [
      {
        text: "EXPENSES SECTION",
        style: "tableHeader",
        colSpan: 2,
        alignment: "center"
      },
      {}
    ],
    TableHeader
  ];

  entries.expenses.forEach(singleIncomeItem => {
    let item;

    item = [
      {
        ul: [
          "Title: " + singleIncomeItem.title,
          "Category: EXPENSES",
          "Time: " + extractDate(singleIncomeItem.moment)
        ]
      },
      {
        text: numeral(parseFloat(singleIncomeItem.amount)).format("0,0.00"),
        color: "green",
        alignment: "center",
        bold: true
      }
    ];

    Content.push(item);
  });
  let Footer = [
    {
      text:
        "Today's Total Expenses = " +
        numeral(parseFloat(expensesTotal)).format("0,0.00"),
      style: "tableHeader",
      colSpan: 2,
      alignment: "right",
      color: "#4A148C"
    },
    {}
  ];

  Content.push(Footer);

  return Content;
};

const GENERATE_PDF = DataIncomming => {
  console.log("====================================");
  console.log("Generating PDF with...", DataIncomming);
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
      {
        text: "Daily Ledger",
        alignment: "center",
        style: "subheader"
      },
      { text: "\n" },

      {
        columns: [
          {
            type: "none",
            ul: [
              {
                text: `Date: ${Date().substr(0, 15)}`,
                alignment: "center"
              }
            ]
          }
        ]
      },

      { text: "\n" },
      // I have to create a function that will render details
      {
        table: {
          widths: ["*", "*"],
          dontBreakRows: true,
          body: renderIncomeTable(DataIncomming)
        }
      },
      { text: "\n\n" },
      {
        table: {
          widths: ["*", "*"],
          dontBreakRows: true,
          body: renderExpensesTable(DataIncomming)
        }
      },
      { text: "\n\n" },
      {
        alignment: "right",
        type: "none",
        ul: [
          {
            text: "Summary : ",
            bold: true
          },
          "------------------",
          {
            text:
              "Today's Income Total = " +
              numeral(parseFloat(DataIncomming.incomeTotal)).format("0,0.00"),
            italics: true,
            bold: true,
            color: "green"
          },
          {
            text:
              "Today's Expenses Total = " +
              numeral(parseFloat(DataIncomming.expensesTotal)).format("0,0.00"),
            italics: true,
            bold: true,
            color: "red"
          },
          {
            text:
              "Previous Day Ready Cash = " +
              numeral(parseFloat(DataIncomming.previousReadyCash)).format(
                "0,0.00"
              ),
            italics: true,
            bold: true,
            color: "#0D47A1"
          },

          {
            text:
              "Today's Ready Cash = ( Previous Day Ready Cash + Today's Income) - ( Today's Expenses ) ",
            italics: true,
            bold: true,
            color: "#1565C0"
          },
          {
            text:
              " = " +
              numeral(parseFloat(DataIncomming.fromNowReadyCash)).format(
                "0,0.00"
              ),
            italics: true,
            bold: true,
            color: "#1565C0"
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
  let pdf_name = `${Date().substr(0, 15)} Ready cash`;
  pdfMake.createPdf(docDefinition).download(pdf_name);
};

export default GENERATE_PDF;
