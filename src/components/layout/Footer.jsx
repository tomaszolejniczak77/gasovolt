import React from "react";
import { DateTime } from "luxon";

const Footer = () => {
  const currentDate = DateTime.now();
  const today = currentDate.setLocale("pl").toLocaleString(DateTime.DATE_FULL);
  return (
    <div>
      <p>{today} Tomasz Olejniczak®</p>
    </div>
  );
};

export default Footer;
