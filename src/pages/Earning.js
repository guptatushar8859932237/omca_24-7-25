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
      row.Disease_agreement?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row mb-3">
            <div className="col-md-12 d-flex justify-content-between align-items-center">
              <h4 className="page-title">Payments</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="d-flex justify-content-between me-2 mb-2">
              <div>
                <div className="mr-3">
                  <TextField
                    sx={{ width: "100%" }}
                    label="Search By Patient Id and Name"
                    id="outlined-size-small"
                    size="small"
                    className="field-count"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(0);
                    }}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setSearchTerm("")}
                            edge="end"
                          >
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div>
                <button onClick={downloadPdf} className="add-button ms-2">
                  <span>
                    <i className="fa fa-file-pdf-o"></i>
                  </span>
                  PDF
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
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
                            <TableCell>{info.total_Amount}</TableCell>
                            <TableCell>{info.remaining_balance}</TableCell>
                            <TableCell>{info.amount_paid}</TableCell>
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
