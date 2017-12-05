class TableComponent extends Component {
  // setColorProperty = color => {
  //   if (color) {
  //     return <ColorPicker color={color} />;
  //   } else {
  //     return "No Selection";
  //   }
  // };

  renderTableRow = () => {
    return this.props.sellItems.map((singleItem, index) => {
      return (
        <TableRow key={index}>
          <TableRowColumn>{index + 1}</TableRowColumn>
          <TableRowColumn>{singleItem.item}</TableRowColumn>
          <TableRowColumn>
            {singleItem.color
              ? {
                  /* <ColorPicker color={singleItem.color} /> */
                }
              : "No Color Selected"}
          </TableRowColumn>
          <TableRowColumn>{singleItem.length}</TableRowColumn>
          <TableRowColumn>{singleItem.dia}</TableRowColumn>
          <TableRowColumn>{singleItem.quantity}</TableRowColumn>
          <TableRowColumn>{singleItem.rate}</TableRowColumn>
          <TableRowColumn>{singleItem.total}</TableRowColumn>
        </TableRow>
      );
    });
  };

  calculateSUM = () => {
    let SUM = 0;
    // eslint-disable-next-line
    this.props.sellItems.map((singleItem, index) => {
      SUM = parseFloat(SUM) + parseFloat(singleItem.total);
    });
    let finalDiscountAmount =
      SUM.toFixed(2) *
      (this.state.discount ? parseFloat(this.state.discount) : 0) /
      100;
    if (finalDiscountAmount !== 0 && finalDiscountAmount) {
      this.props.showSnackBar(`Discount amount = ${finalDiscountAmount}`);
    }
    let finalResult = (SUM.toFixed(2) - finalDiscountAmount).toFixed(2);
    this.props.AllTotal(finalResult); // Setting up the all total
    return finalResult;
  };

  handleDiscountChange = event => {
    const discount = event.target.value;
    if (!discount || discount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      if (discount > 100 || discount < 0) {
        this.props.showSnackBar("Wrong Input ! [max:100 & min:0]");
      } else {
        this.setState({ discount });
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      discount: 0,
      detailsModelOpen: false,
      ModalData: ""
    };
  }

  handleDetailsModelDeleteAction = () => {
    const id = this.state.ModalData.id;
    this.props.removeSellItem(id);
    this.handleDetailsModelClose();
  };

  render() {
    return (
      <div>
        <Dialog
          title="Details : "
          actions={detailsModalActions}
          modal={false}
          open={this.state.detailsModelOpen}
          onRequestClose={this.handleDetailsModelClose}
        >
          Item: <strong>{this.state.ModalData.item}</strong> <br /> Length:{" "}
          <strong>{this.state.ModalData.length}</strong> <br /> Dia:{" "}
          <strong>{this.state.ModalData.dia}</strong> <br /> Color:{" "}
          <strong>{this.setColorProperty(this.state.ModalData.color)}</strong>{" "}
          <br /> Quantity: <strong>{this.state.ModalData.quantity}</strong>{" "}
          <br /> Rate: <strong>{this.state.ModalData.rate}</strong> <br />
          Total: <strong>{this.state.ModalData.total}</strong> <br />
        </Dialog>
      </div>
    );
  }
}


