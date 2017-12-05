// Color Picker Class

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "40px",
          height: "30px",
          borderRadius: "2px",
          background: `rgba(${this.props.color.r}, ${this.props.color.g}, ${
            this.props.color.b
          }, ${this.props.color.a})`
        },
        swatch: {
          marginTop: "3px",
          padding: "10px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer"
        },
        popover: {
          position: "absolute",
          zIndex: "2"
        }
      }
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
      </div>
    );
  }
}
