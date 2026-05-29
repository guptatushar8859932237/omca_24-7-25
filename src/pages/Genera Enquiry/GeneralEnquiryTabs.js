import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import GerGeneralEnquiry from "./GerGeneralEnquiry";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function GeneralEnquiryTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          <Tab label="General Enquiries" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
          <Tab label="Tab 4" />
          <Tab label="Tab 5" />
          <Tab label="Tab 6" />
          <Tab label="Tab 7" />
          <Tab label="Tab 8" />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <GerGeneralEnquiry />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>Tab 2 Content</CustomTabPanel>
      <CustomTabPanel value={value} index={2}>Tab 3 Content</CustomTabPanel>
      <CustomTabPanel value={value} index={3}>Tab 4 Content</CustomTabPanel>
      <CustomTabPanel value={value} index={4}>Tab 5 Content</CustomTabPanel>
      <CustomTabPanel value={value} index={value}>Tab 6 Content</CustomTabPanel>
      <CustomTabPanel value={value} index={6}>Tab 7 Content</CustomTabPanel>
      <CustomTabPanel value={value} index={7}>Tab 8 Content</CustomTabPanel>
    </Box>
  );
}
