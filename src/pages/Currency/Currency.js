import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Pagination,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { baseurl } from "../../Basurl/Baseurl";
import { usePDF } from "react-to-pdf";
import { GetAllcurrency } from "../../reducer/CurrencySlice";

export default function Currency() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem("Role");
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const [page, setPage] = useState(0);
  const [showActions, setShowActions] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [pdfRowLimit, setPdfRowLimit] = useState(null);

  const { currencyList } = useSelector((state) => state.Currency);

  useEffect(() => {
    dispatch(GetAllcurrency());
  }, [dispatch]);

  useEffect(() => {
    if (currencyList) {
      setRows(currencyList);
      setSearchApiData(currencyList);
    }
  }, [currencyList]);

  const EditButton = (e, id) => {
    navigate("/Admin/edit-Currency", { state: { serviceId: id } });
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this currency?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    const response = await axios.delete(`${baseurl}deleteCurrencyById/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.success === true) {
      await dispatch(GetAllcurrency());
      Swal.fire("Deleted!", "Currency deleted successfully", "success");
    }
  };

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);

    if (!value) return setRows(searchApiData);

    const filtered = searchApiData.filter((item) => {
      return (
        item?.name?.toLowerCase().includes(value) ||
        item?.details?.toLowerCase().includes(value)
      );
    });

    setRows(filtered);
  };

  const handleClearFilter = () => {
    setFilterValue("");
    setRows(searchApiData);
  };

  return (
    <div className="page-wrapper">
      <div className="content">

        <div className="row">
          <div className="col-md-12">
            <div className="country-top">
              <div>
                <h4 className="page-title mb-0">Manage Currency</h4>
              </div>

              <div className="search-btn-main">
                <div className="mr-3">
                  <TextField
                    label="Search By Currency or Details"
                    size="small"
                    value={filterValue}
                    onChange={handleFilter}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {filterValue && (
                            <IconButton onClick={handleClearFilter}>
                              <ClearIcon />
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div>
                  <Link to="/Admin/Addcurrency" className="add-button">
                    <i className="fa fa-plus"></i> New Currency
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="main_content">
          <div className="row">
            <div className="col-md-12">

              <TableContainer component={Paper}>
                <Table stickyHeader ref={targetRef}>

                  <TableHead>
                    <TableRow>
                      <TableCell>Sr.No.</TableCell>
                      <TableCell>Currency Name</TableCell>
                      <TableCell>Currency Details</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(pdfRowLimit
                      ? rows.slice(0, pdfRowLimit)
                      : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ).map((info, i) => (
                      <TableRow key={info._id}>
                        <TableCell>{pdfRowLimit ? i + 1 : page * rowsPerPage + i + 1}</TableCell>

                        {/* FIXED — name instead of currencyName */}
                        <TableCell>{info?.name}</TableCell>
                        <TableCell>{info?.details}</TableCell>

                        <TableCell className="action-icon">
                          <i
                            className="fa-solid fa-pen-to-square"
                            onClick={(e) => EditButton(e, info._id)}
                          />

                          {role === "Admin" && (
                            <i
                              className="fa-solid fa-trash"
                              onClick={(e) => handleDelete(e, info._id)}
                            ></i>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}

                    {rows.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No Data Found
                        </TableCell>
                      </TableRow>
                    )}

                  </TableBody>
                </Table>

                {!pdfRowLimit && (
                  <Stack spacing={2} alignItems="end" mt={2}>
                    <Pagination
                      count={Math.ceil(rows.length / rowsPerPage)}
                      page={page + 1}
                      onChange={(e, value) => setPage(value - 1)}
                      shape="rounded"
                    />
                  </Stack>
                )}

              </TableContainer>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
