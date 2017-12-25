import database from "../../../../../secrets/firebase";
var cron = require("node-schedule");

const schedular = todayReadyCash => {
  cron.scheduleJob(
    { hour: 0, minute: 50, dayOfWeek: [0, 1, 2, 3, 4, 5, 6] },
    function() {
      console.log("Schedulling working and saving Ready cash ", todayReadyCash);
    }
  );
};

const deleteEntryFromDB = () => {};

const updateReadyCash = () => {};

export default schedular;
