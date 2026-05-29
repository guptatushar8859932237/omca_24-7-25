import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { baseurl } from "../Basurl/Baseurl";
import {
  Pagination,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Swal from "sweetalert2";
import { usePDF } from "react-to-pdf";
import ClearIcon from "@mui/icons-material/Clear";
export default function Earning() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [pdfRowLimit, setPdfRowLimit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const fetchJobTitles = () => {
    axios
      .get(`${baseurl}totalEarnings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success) {
          setRows(response.data.earnings);
          console.log(response.data.earnings);
        } else {
          console.error("Failed to fetch job titles:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };
  useEffect(() => {
    fetchJobTitles();
  }, []);
  const downloadPdf = async () => {
    const maxRows = rows.length || 1;
    Swal.fire({
      title: "Enter number of rows for PDF",
      input: "number",
      inputLabel: `Choose between 1 and ${maxRows}`,
      inputAttributes: {
        min: "1",
        max: maxRows.toString(),
        step: "1",
      },
      inputValue: rowsPerPage,
      showCancelButton: true,
      confirmButtonText: "Generate PDF",
    }).then((result) => {
      if (result.isConfirmed) {
        const userInput = parseInt(result.value, 10);
        if (isNaN(userInput) || userInput < 1 || userInput > maxRows) {
          Swal.fire(
            "Invalid entry",
            `Please enter a number between 1 and ${maxRows}`,
            "error"
          );
          return;
        }
        setPdfRowLimit(userInput);
        setTimeout(() => {
          toPDF();
          setPdfRowLimit(null); // reset to normal view
        }, 300);
      }
    });
  };
  const filteredRows = rows.filter(
    (row) =>
      row.patientId
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      row.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.total_Amount
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      row.remaining_balance
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      row.amount_paid
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      row.country
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      row.Disease_agreement?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row gx-3">
            <div className="col-md-12">
              <div className="country-top">
                <div className="topmainhd mb-0">
                  <h6>Manage Payments</h6>
                </div>
                <div className="search-btn-main">
                  <div className="">
                    <TextField
                      className="field-count"
                      label="Search"
                      size="small"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(0);
                      }}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" className="input-set">
                            <IconButton onClick={() => setSearchTerm("")} edge="end">
                              <ClearIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <button onClick={downloadPdf} className="add-button"><i className="fa fa-file-pdf-o me-2"></i>PDF</button>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <div className="table-responsive">
                  <TableContainer
                    component={Paper}
                    style={{ overflowX: "auto" }}
                    ref={targetRef}
                  >
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      className="table-no-card"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr.No.</TableCell>
                          <TableCell>Patient ID</TableCell>
                          <TableCell>Patient Name</TableCell>
                          <TableCell>Country</TableCell>
                          <TableCell>Total Amount</TableCell>
                          <TableCell>Remaining Balance</TableCell>
                          <TableCell>Amount Paid</TableCell>
                          <TableCell>Disease Agreement</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(pdfRowLimit
                          ? filteredRows.slice(0, pdfRowLimit)
                          : filteredRows.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        ).map((info, i) => (
                          <TableRow
                            role="checkbox"
                            tabIndex={-1}
                            key={info.enquiryId}
                          >
                            <TableCell>
                              {pdfRowLimit ? i + 1 : page * rowsPerPage + i + 1}
                            </TableCell>
                            <TableCell>{info.patientId}</TableCell>
                            <TableCell>{info.patient_name}</TableCell>
                            <TableCell>{info?.country}</TableCell>
                            <TableCell>${info.total_Amount}</TableCell>
                            <TableCell>${info.remaining_balance}</TableCell>
                            <TableCell>${info.amount_paid}</TableCell>
                            <TableCell>{info.Disease_agreement}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {!pdfRowLimit && (
                      <Stack spacing={2} alignItems="end" marginTop={2}>
                        <Pagination
                          count={Math.ceil(filteredRows.length / rowsPerPage)}
                          page={page + 1}
                          onChange={(event, value) => setPage(value - 1)}
                          shape="rounded"
                          className="page-item"
                        />
                      </Stack>
                    )}
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
