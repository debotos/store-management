import React from "react";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";

import { APP_NAME } from "../global/global";
import MenuItems from './MenuItems';

class AppBarMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDrawer: false };
  }

  handleToggle = () => this.setState({ showDrawer: !this.state.showDrawer });

  handleClose = () => this.setState({ showDrawer: false });
  render() {
    return (
      <div>
        <AppBar title={APP_NAME} onLeftIconButtonTouchTap={this.handleToggle} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.showDrawer}
          onRequestChange={showDrawer => this.setState({ showDrawer })}
        >
          <AppBar
            iconElementLeft={
              <IconButton>
                <NavigationClose />
              </IconButton>
            }
            onLeftIconButtonTouchTap={event => {
              this.setState({ showDrawer: false });
            }}
            title={<span>Menu</span>}
          />
          
          <MenuItems/>

        </Drawer>
      </div>
    );
  }
}

export default AppBarMain;
