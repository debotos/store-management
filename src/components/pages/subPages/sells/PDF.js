import {
  COMPANY_NAME,
  COMPANY_ADDRESS,
  COMPANY_PHONE_NUMBER,
  COMPANY_OWENER
} from "../../../global/global";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// it will take an object that contain an array and return an array object of table instance
const renderTables = tables => {
  let { aluminium, glass, ss, others } = tables;

  let aluminiumTable = {};
  let glassTable = {};
  let ssTable = {};
  let othersTable = {};

  if (aluminium.length > 0) {
    aluminiumTable = {
      style: "tableDesign",
      table: {
        widths: [17, "*", "*", 40, 40, 45, 45, 40, "*"],
        headerRows: 2,
        body: renderAluminiumContent(aluminium)
      }
    };
  }
  if (glass.length > 0) {
    glassTable = {
      style: "tableDesign",
      table: {
        widths: [17, "*", "*", "*", "*"],
        headerRows: 2,
        body: renderGlassContent(glass)
      }
    };
  }
  if (ss.length > 0) {
    ssTable = {
      style: "tableDesign",
      table: {
        widths: [17, "*", "*", 55, 40, 45, 40, "*"],
        headerRows: 2,
        body: renderSSContent(ss)
      }
    };
  }
  if (others.length > 0) {
    othersTable = {
      style: "tableDesign",
      table: {
        widths: [17, "*", "*", "*", "*"],
        headerRows: 2,
        body: renderOthersContent(others)
      }
    };
  }

  return [aluminiumTable, glassTable, ssTable, othersTable];
};

function GENERATE_PDF(data) {
  let { tables, customer, memoNumber } = data;
  //Start
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
        text:
          COMPANY_ADDRESS +
          " | " +
          COMPANY_OWENER +
          "(" +
          COMPANY_PHONE_NUMBER +
          ")",
        style: "subheader",
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
                text: "Date: " + Date().substr(0, 15),
                alignment: "right"
              }
            ]
          }
        ]
      },

      { text: "\n\n" },
      // I have to create a function that will render tables
      renderTables(tables),

      { text: "\n" },
      {
        alignment: "right",
        type: "none",
        ul: [
          "All Tables Total = " + customer.allTotal,
          {
            text: "Previous Due = " + customer.prevDue,
            italics: true,
            color: "red"
          },
          "All Tables Total With Previous Due = " + customer.totalWithDue,
          "Deposit Now = " + customer.depositNow,
          {
            text: "New Due From Now = " + customer.newDue,
            italics: true,
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

  pdfMake
    .createPdf(docDefinition)
    .download(customer.name + "-" + Date().substr(0, 15));
}

const renderAluminiumContent = sellingItems => {
  let TableHeader = [
    "ID",
    "Item",
    "Company",
    "Length",
    "Dia",
    "Color",
    "Quantity",
    "Rate",
    "Total"
  ];
  let Content = [
    [
      {
        text: "Aluminium Table",
        style: "tableHeader",
        colSpan: 9,
        alignment: "center"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ],
    TableHeader
  ];
  sellingItems.forEach((singleItem, index) => {
    let item = [
      (index + 1).toString(),
      singleItem.productName,
      singleItem.companyName,
      singleItem.length,
      singleItem.dia,
      singleItem.color,
      singleItem.quantity,
      singleItem.rate,
      singleItem.total
    ];
    Content.push(item);
  });
  return Content;
};

const renderGlassContent = sellingItems => {
  let TableHeader = ["ID", "Item", "SFT", "Rate", "Total"];
  let Content = [
    [
      {
        text: "Glass Table",
        style: "tableHeader",
        colSpan: 5,
        alignment: "center"
      },
      {},
      {},
      {},
      {}
    ],
    TableHeader
  ];
  sellingItems.forEach((singleItem, index) => {
    let item = [
      (index + 1).toString(),
      singleItem.productName,
      singleItem.sft,
      singleItem.rate,
      singleItem.total
    ];
    Content.push(item);
  });
  return Content;
};

const renderSSContent = sellingItems => {
  let TableHeader = [
    "ID",
    "Item",
    "Company",
    "Thickness",
    "Length",
    "Quantity",
    "Rate",
    "Total"
  ];
  let Content = [
    [
      {
        text: "SS Table",
        style: "tableHeader",
        colSpan: 8,
        alignment: "center"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ],
    TableHeader
  ];
  sellingItems.forEach((singleItem, index) => {
    let item = [
      (index + 1).toString(),
      singleItem.productName,
      singleItem.companyName,
      singleItem.thickness,
      singleItem.length,
      singleItem.quantity,
      singleItem.rate,
      singleItem.total
    ];
    Content.push(item);
  });
  return Content;
};

const renderOthersContent = sellingItems => {
  let TableHeader = ["ID", "Item", "SFT", "Rate", "Total"];
  let Content = [
    [
      {
        text: "Others Table",
        style: "tableHeader",
        colSpan: 5,
        alignment: "center"
      },
      {},
      {},
      {},
      {}
    ],
    TableHeader
  ];
  sellingItems.forEach((singleItem, index) => {
    let item = [
      (index + 1).toString(),
      singleItem.productName,
      singleItem.quantity,
      singleItem.rate,
      singleItem.total
    ];
    Content.push(item);
  });
  return Content;
};

export default GENERATE_PDF;
