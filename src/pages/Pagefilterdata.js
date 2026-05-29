import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Pagefilterdata() {

      const handleclick = () => {
    window.history.back();
  };
  return (
     <div className="page-wrapper">
        <div className="content">
               <div className="row">
              <div className="col-md-12">
                <h4 className="page-title">
                  <span>
                    <i
                      class="fi fi-sr-angle-double-small-left"
                      onClick={handleclick}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </span>
                  View Patient 
                </h4>
              </div>
            </div>
    <div className="main_content">
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <TableContainer
                    component={Paper}
                    style={{ overflowX: "auto" }}
                    // ref={targetRef}
                  >
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      className="table-no-card"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr.No.</TableCell>
                          <TableCell>Enquiry IDs</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Country</TableCell>
                          <TableCell>Contact</TableCell>
                          <TableCell>Disease name</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                          <TableCell>Notes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {(pdfRowLimit
                          ? rows.slice(0, pdfRowLimit)
                          : rows.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                        ).length > 0 ? (
                          (pdfRowLimit
                            ? rows.slice(0, pdfRowLimit)
                            : rows.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                          ).map((info, i) => (
                            <TableRow
                              role="checkbox"
                              tabIndex={-1}
                              key={info.code}
                            >
                              <TableCell>
                                {pdfRowLimit
                                  ? i + 1
                                  : page * rowsPerPage + i + 1}
                              </TableCell>
                              <TableCell>{info.enquiryId}</TableCell>
                              <TableCell>{info.name}</TableCell>
                              <TableCell>{info.email}</TableCell>
                              <TableCell>{info.country}</TableCell>
                              <TableCell>{info.emergency_contact}</TableCell>
                              <TableCell>{info.disease_name}</TableCell>
                              <TableCell>
                                <FormControl
                                  sx={{ m: 1, minWidth: 120 }}
                                  size="small"
                                  className="cont-main"
                                >
                                  <Select
                                    value={
                                      seekerStatus[info.enquiryId]
                                        ? seekerStatus[info.enquiryId]
                                        : info.Enquiry_status === "Confirmed"
                                        ? "1"
                                        : info.Enquiry_status === "Hold"
                                        ? "2"
                                        : info.Enquiry_status === "Follow-Up"
                                        ? "3"
                                        : info.Enquiry_status === "Dead"
                                        ? "4"
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleChange(e, info.enquiryId)
                                    }
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    className="status-direct"
                                    renderValue={(selected) => {
                                      switch (selected) {
                                        case "1":
                                          return "Confirmed";
                                        case "2":
                                          return "Hold";
                                        case "3":
                                          return "Follow-up";
                                        case "4":
                                          return "Closed";
                                        default:
                                          return "Pending";
                                      }
                                    }}
                                  >
                                    <MenuItem value="1">Confirmed</MenuItem>
                                    <MenuItem value="2">Hold</MenuItem>
                                    <MenuItem value="3">Follow-up</MenuItem>
                                    <MenuItem value="4">Closed</MenuItem>
                                  </Select>
                                </FormControl>
                              </TableCell>
                              <TableCell className="action-icon">
                                <VisibilityIcon
                                  className="eye-icon"
                                  onClick={(e) => ViewDetail(e, info.enquiryId)}
                                />
                                <i
                                  className="fa-solid fa-pen-to-square"
                                  onClick={(e) => EditButton(e, info.enquiryId)}
                                ></i>
                                {localStorage.getItem("Role") === "Admin" && (
                                  <i
                                    className="fa-solid fa-trash"
                                    onClick={() => handledelete(info)}
                                  ></i>
                                )}
                              </TableCell>
                              <TableCell className="action-icon">
                                <i
                                  className="fa-solid fa-notes-medical"
                                  onClick={(e) =>
                                    handleClickOpen2(e, info.enquiryId)
                                  }
                                ></i>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : ( */}
                          <TableRow>
                            <TableCell colSpan={11}>
                              <div className="flex justify-center py-4">
                                <p className="text-center text-gray-500">
                                  No Data Found
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        {/* )} */}
                      </TableBody>
                    </Table>
                    {/* {!pdfRowLimit && (
                      <Stack spacing={2}>
                        <Pagination
                          className="page-nation"
                          count={Math.ceil(rows.length / rowsPerPage)}
                          page={page + 1}
                          onChange={(event, value) => setPage(value - 1)}
                          color="primary"
                        />
                      </Stack>
                    )} */}
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
    </div>
    </div>
  )
}
