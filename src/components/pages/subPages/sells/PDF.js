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

  let aluminiumTables = [];
  let glassTables = [];
  let ssTables = [];
  let othersTables = [];

  if (aluminium) {
    if (aluminium.length > 0) {
      aluminium.forEach(singleAluminiumItem => {
        aluminiumTables.push({
          style: "tableDesign",
          table: {
            widths: [17, "*", "*", 40, 40, 45, 45, 40, "*"],
            headerRows: 2,
            dontBreakRows: true,
            keepWithHeaderRows: 1,
            body: renderAluminiumContent(singleAluminiumItem)
          }
        });
      });
    }
  }
  if (glass) {
    if (glass.length > 0) {
      glass.forEach(singleGlassItem => {
        glassTables.push({
          style: "tableDesign",
          table: {
            widths: [17, "*", "*", "*", "*"],
            headerRows: 2,
            dontBreakRows: true,
            keepWithHeaderRows: 1,
            body: renderGlassContent(singleGlassItem)
          }
        });
      });
    }
  }
  if (ss) {
    if (ss.length > 0) {
      ss.forEach(singleSSItem => {
        ssTables.push({
          style: "tableDesign",
          table: {
            widths: [17, "*", "*", 55, 40, 45, 40, "*"],
            headerRows: 2,
            dontBreakRows: true,
            keepWithHeaderRows: 1,
            body: renderSSContent(singleSSItem)
          }
        });
      });
    }
  }
  if (others) {
    if (others.length > 0) {
      others.forEach(singleOthersItem => {
        othersTables.push({
          style: "tableDesign",
          table: {
            widths: [17, "*", "*", "*", "*"],
            headerRows: 2,
            dontBreakRows: true,
            keepWithHeaderRows: 1,
            body: renderOthersContent(singleOthersItem)
          }
        });
      });
    }
  }
  return [aluminiumTables, glassTables, ssTables, othersTables];
};

const friendlyDiscountRender = customer => {
  if (parseInt(customer.allTotal.finalFriendlyDiscount, 10) > 0) {
    return [
      "- " + parseFloat(customer.allTotal.finalFriendlyDiscount).toFixed(2),
      "---------------------------------",
      "= " + parseFloat(customer.allTotal.finalTotal).toFixed(2)
    ];
  } else {
    return {};
  }
};
function GENERATE_PDF(data, date = null) {
  let { tables, customer, memoNumber } = data;

  console.log("====================================");
  console.log("GENERATE_PDF got Date ", date);
  console.log("====================================");
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
                text: date ? `Date: ${date}` : `Date: ${Date().substr(0, 15)}`,
                alignment: "right"
              }
            ]
          }
        ]
      },

      { text: "\n\n" },
      // I have to create a function that will render tables
      renderTables(tables)[0], // Aluminium
      renderTables(tables)[1], // Glass
      renderTables(tables)[2], //SS
      renderTables(tables)[3], //Other
      { text: "\n" },
      {
        alignment: "right",
        type: "none",
        ul: [
          "All Tables Total = " +
            parseFloat(customer.allTotal.total).toFixed(2),
          friendlyDiscountRender(customer),
          {
            text: "Previous Due = " + customer.prevDue,
            italics: true,
            bold: true,
            color: "red"
          },
          "All Tables Total With Previous Due = " +
            parseFloat(customer.totalWithDue).toFixed(2),
          {
            text: "Deposit Now = " + customer.depositNow,
            italics: true,
            bold: true,
            color: "green"
          },
          {
            text: "New Due From Now = " + customer.newDue,
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
      "[" +
      customer.number +
      "]" +
      "history_memo_" +
      memoNumber +
      "_" +
      customer.name +
      "_" +
      Date().substr(0, 15);
  } else {
    pdf_name =
      "[" +
      customer.number +
      "]" +
      "sell_memo_" +
      memoNumber +
      "_" +
      customer.name +
      "_" +
      Date().substr(0, 15);
  }
  pdfMake.createPdf(docDefinition).download(pdf_name);
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

  sellingItems.table.forEach((singleItem, index) => {
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
  Content.push([
    {
      text: sellingItems.attribute.allCellTotal,
      bold: true,
      colSpan: 9,
      alignment: "right"
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]);
  if (parseInt(sellingItems.attribute.discount, 10) === 0) {
    Content.push([
      {
        text: "No Discount in (%)",
        bold: true,
        colSpan: 9,
        alignment: "right"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
  } else {
    Content.push([
      {
        text: `${sellingItems.attribute.discount}% = ${
          sellingItems.attribute.discountAmount
        } Now Total = ${sellingItems.attribute.allCellTotal} - ${
          sellingItems.attribute.discountAmount
        } = ${sellingItems.attribute.afterDiscountTotal}`,
        bold: true,
        colSpan: 9,
        alignment: "right"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
  }
  if (parseInt(sellingItems.attribute.friendlyDiscount, 10) !== 0) {
    Content.push([
      {
        text: `- ${sellingItems.attribute.friendlyDiscount}`,
        bold: true,
        colSpan: 9,
        alignment: "right"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
  }

  Content.push([
    {
      text: `Final Amount = ${sellingItems.attribute.atLastTotalAll}`,
      bold: true,
      color: "#006A4E",
      colSpan: 9,
      alignment: "right"
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]);

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
  sellingItems.table.forEach((singleItem, index) => {
    let item = [
      (index + 1).toString(),
      singleItem.productName,
      singleItem.sft,
      singleItem.rate,
      singleItem.total
    ];
    Content.push(item);
  });
  Content.push([
    {
      text: sellingItems.attribute.allCellTotal,
      bold: true,
      colSpan: 5,
      alignment: "right"
    },
    {},
    {},
    {},
    {}
  ]);
  if (parseInt(sellingItems.attribute.discount, 10) === 0) {
    Content.push([
      {
        text: "No Discount in (%)",
        bold: true,
        colSpan: 5,
        alignment: "right"
      },
      {},
      {},
      {},
      {}
    ]);
  } else {
    Content.push([
      {
        text: `${sellingItems.attribute.discount}% = ${
          sellingItems.attribute.discountAmount
        } Now Total = ${sellingItems.attribute.allCellTotal} - ${
          sellingItems.attribute.discountAmount
        } = ${sellingItems.attribute.afterDiscountTotal}`,
        bold: true,
        colSpan: 5,
        alignment: "right"
      },
      {},
      {},
      {},
      {}
    ]);
  }
  if (parseInt(sellingItems.attribute.friendlyDiscount, 10) !== 0) {
    Content.push([
      {
        text: `- ${sellingItems.attribute.friendlyDiscount}`,
        bold: true,
        colSpan: 5,
        alignment: "right"
      },
      {},
      {},
      {},
      {}
    ]);
  }
  Content.push([
    {
      text: `Final Amount = ${sellingItems.attribute.atLastTotalAll}`,
      bold: true,
      color: "#006A4E",
      colSpan: 5,
      alignment: "right"
    },
    {},
    {},
    {},
    {}
  ]);
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
  sellingItems.table.forEach((singleItem, index) => {
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
  Content.push([
    {
      text: sellingItems.attribute.allCellTotal,
      bold: true,
      colSpan: 8,
      alignment: "right"
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]);
  if (parseInt(sellingItems.attribute.discount, 10) === 0) {
    Content.push([
      {
        text: "No Discount in (%)",
        bold: true,
        colSpan: 8,
        alignment: "right"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
  } else {
    Content.push([
      {
        text: `${sellingItems.attribute.discount}% = ${
          sellingItems.attribute.discountAmount
        } Now Total = ${sellingItems.attribute.allCellTotal} - ${
          sellingItems.attribute.discountAmount
        } = ${sellingItems.attribute.afterDiscountTotal}`,
        bold: true,
        colSpan: 8,
        alignment: "right"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
  }
  if (parseInt(sellingItems.attribute.friendlyDiscount, 10) !== 0) {
    Content.push([
      {
        text: `- ${sellingItems.attribute.friendlyDiscount}`,
        bold: true,
        colSpan: 8,
        alignment: "right"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
  }
  Content.push([
    {
      text: `Final Amount = ${sellingItems.attribute.atLastTotalAll}`,
      bold: true,
      color: "#006A4E",
      colSpan: 8,
      alignment: "right"
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]);
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
  sellingItems.table.forEach((singleItem, index) => {
    let item = [
      (index + 1).toString(),
      singleItem.productName,
      singleItem.quantity,
      singleItem.rate,
      singleItem.total
    ];
    Content.push(item);
  });
  Content.push([
    {
      text: sellingItems.attribute.allCellTotal,
      bold: true,
      colSpan: 5,
      alignment: "right"
    },
    {},
    {},
    {},
    {}
  ]);
  if (parseInt(sellingItems.attribute.discount, 10) === 0) {
    Content.push([
      {
        text: "No Discount in (%)",
        bold: true,
        colSpan: 5,
        alignment: "right"
      },
      {},
      {},
      {},
      {}
    ]);
  } else {
    Content.push([
      {
        text: `${sellingItems.attribute.discount}% = ${
          sellingItems.attribute.discountAmount
        } Now Total = ${sellingItems.attribute.allCellTotal} - ${
          sellingItems.attribute.discountAmount
        } = ${sellingItems.attribute.afterDiscountTotal}`,
        bold: true,
        colSpan: 5,
        alignment: "right"
      },
      {},
      {},
      {},
      {}
    ]);
  }
  if (parseInt(sellingItems.attribute.friendlyDiscount, 10) !== 0) {
    Content.push([
      {
        text: `- ${sellingItems.attribute.friendlyDiscount}`,
        bold: true,
        colSpan: 5,
        alignment: "right"
      },
      {},
      {},
      {},
      {}
    ]);
  }
  Content.push([
    {
      text: `Final Amount = ${sellingItems.attribute.atLastTotalAll}`,
      bold: true,
      color: "#006A4E",
      colSpan: 5,
      alignment: "right"
    },
    {},
    {},
    {},
    {}
  ]);
  return Content;
};

export default GENERATE_PDF;
