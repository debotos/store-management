import { Component } from "react";
import { connect } from "react-redux";

import database from "../../../../../secrets/firebase";
import { addReadyCashAmount } from "../../../../../actions/ready-cash/ready-cash-amount-actions";
var cron = require("node-schedule");

const schedular = todayReadyCash => {
  cron.scheduleJob(
    // It means that everyday at 12:00 AM do something
    { hour: 0, minute: 0, dayOfWeek: [0, 1, 2, 3, 4, 5, 6] },
    function() {
      console.log("Schedulling working and saving Ready cash ", todayReadyCash);
      // updateReadyCash(todayReadyCash);
    }
  );
};

const deleteEntryFromDB = () => {};

const updateReadyCash = todayReadyCash => {};

export default schedular;
