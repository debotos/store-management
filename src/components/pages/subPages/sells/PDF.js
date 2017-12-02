import {
  COMPANY_NAME,
  COMPANY_ADDRESS,
  COMPANY_PHONE_NUMBER,
  COMPANY_OWENER
} from "../../../global/global";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function GENERATE_PDF(data) {
  let { customer, sellingItems } = data;

  //Start

  var docDefinition = {
    watermark: {
      text: COMPANY_NAME,
      color: "blue",
      opacity: 0.3,
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

      {
        text: "Date: " + Date().substr(0, 15),
        style: "subheader",
        alignment: "center"
      },

      { text: "\n\n" },

      "Customer Details:\n",
      {
        ul: [
          "Name: " + customer.name,
          "Phone Number: " + customer.number,
          "E-mail: " + customer.mail,
          "Address: " + customer.address
        ]
      },

      { text: "\n\n" },

      {
        style: "tableDesign",
        table: {
          widths: [15, 80, 100, 40, 30, 45, 40, 90],
          body: renderContent(sellingItems)
        }
      },
      { text: "\n\n" },
      { text: "------------------------------------", alignment: "right" },
      { text: COMPANY_NAME, alignment: "right" }
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

const setColorProperty = color => {
  if (color) {
    return JSON.stringify(color);
  } else {
    return "Not Selected";
  }
};

const renderContent = sellingItems => {
  let TableHeader = [
    "ID",
    "Item",
    "Color",
    "Length",
    "Dia",
    "Quantity",
    "Rate",
    "Total"
  ];
  let Content = [TableHeader];
  sellingItems.forEach((singleItem, index) => {
    let item = [
      (index + 1).toString(),
      singleItem.item,
      setColorProperty(singleItem.color),
      singleItem.length,
      singleItem.dia,
      singleItem.quantity,
      singleItem.rate,
      singleItem.total
    ];
    console.log("Item is...", item);
    Content.push(item);
  });
  console.log("getting.....", JSON.stringify(Content));
  return Content;
};

export default GENERATE_PDF;