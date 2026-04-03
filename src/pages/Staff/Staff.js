import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  GetAllStaffUser,
  ActiveStaffUser,
  DeleteStaff,
} from "../../reducer/StaffSlice";
import { baseurl, image } from "../../Basurl/Baseurl";
import Swal from "sweetalert2";
import axios from "axios";
import { usePDF } from "react-to-pdf";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import TableSortLabel from "@mui/material/TableSortLabel";

export default function Staff() {
  const role = localStorage.getItem("Role");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toPDF, targetRef } = usePDF({ filename: "staff.pdf" });
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState("asc");

  const rowsPerPage = 10;
  const [pdfRowLimit, setPdfRowLimit] = useState(null);
  const { staff, loading, error } = useSelector((state) => state.staff);
  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    dispatch(GetAllStaffUser());
  }, [dispatch]);
  useEffect(() => {
    if (staff) setRows(staff);
  }, [staff]);
  /* ---------------- SEARCH FILTER ---------------- */
  const filteredRows = rows.filter(
    (item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase()) ||
      item?.email?.toLowerCase().includes(search.toLowerCase()) ||
      item?.role?.toLowerCase().includes(search.toLowerCase())
  );
  /* ---------------- HANDLERS ---------------- */
  const handleEdit = (id) => {
    navigate("/Admin/edit-staff", { state: { staffID: id } });
  };
  const handleStatusToggle = async (id, status) => {
    try {
      await dispatch(ActiveStaffUser({ id })).unwrap();
      dispatch(GetAllStaffUser());
      Swal.fire(
        "Success",
        status ? "Deactivated" : "Activated",
        "success"
      );
    } catch (err) {
      Swal.fire("Error", "Status update failed", "error");
    }
  };
  const dataActiveInactive = async (id, currentState) => {
    try {
      const newState = currentState === 1 ? 0 : 1; // Invert status
      const result = await dispatch(ActiveStaffUser({ id: id })).unwrap();
      dispatch(GetAllStaffUser());
      Swal.fire(
        "Status!",
        newState === 1 ? "Activate." : "DeActivate.",
        "success"
      );
    } catch (err) {
      console.error("Error object:", err);
      const errorMessage =
        typeof err === "string"
          ? err
          : typeof err?.message === "string"
          ? err.message
          : typeof err?.message?.message === "string"
          ? err.message.message
          : JSON.stringify(err);
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
    }
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteStaff({ id }))
          .unwrap()
          .then(() => dispatch(GetAllStaffUser()))
          .then(() =>
            Swal.fire("Deleted!", "Staff deleted successfully", "success")
          )
          .catch(() =>
            Swal.fire("Error!", "Delete operation failed", "error")
          );
      }
    });
  };
  const handleExportExcel = async () => {
    const response = await axios.get(`${baseurl}export_staffs`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Staff_List.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
   const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    const direction = isAsc ? "desc" : "asc";

    setOrderBy(field);
    setOrderDirection(direction);

    const sortedData = [...rows].sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      // ✅ Date sorting
      if (field === "createdAt") {
        return direction === "asc"
          ? new Date(valA) - new Date(valB)
          : new Date(valB) - new Date(valA);
      }

      // ✅ Boolean sorting (status)
      if (field === "status") {
        return direction === "asc"
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      }

      // ✅ String sorting
      if (typeof valA === "string") {
        return direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return 0;
    });

    setRows(sortedData);
  };
  const handleGeneratePDF = () => {
    Swal.fire({
      title: "Enter number of rows",
      input: "number",
      inputAttributes: {
        min: 1,
        max: filteredRows.length,
      },
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setPdfRowLimit(Number(result.value));
        setTimeout(() => {
          toPDF();
          setPdfRowLimit(null);
        }, 300);
      }
    });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="country-top">
          <h4 className="page-title mb-0">Manage Staff</h4>
          <div className="search-btn-main">
            <TextField
              label="Search"
              size="small"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              className="field-count"
            />
            <Link to="/Admin/add-staff" className="add-button">
              <i className="fa fa-plus"></i> New Staff
            </Link>
            <button onClick={handleExportExcel} className="add-button ms-2">
              Export File
            </button>
            {role === "Admin" && (
              <button onClick={handleGeneratePDF} className="add-button ms-2">
                PDF
              </button>
            )}
          </div>
        </div>
        <TableContainer ref={targetRef} className="table-responsive">
          <Table className="table-no-card">
            <TableHead>
              <TableRow>
                <TableCell>Sr.No.</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderDirection}
                    onClick={() => handleSort("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                 <TableCell>
                  <TableSortLabel
                    active={orderBy === "role"}
                    direction={orderDirection}
                    onClick={() => handleSort("role")}
                  >
                    Role
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "email"}
                    direction={orderDirection}
                    onClick={() => handleSort("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                                <TableCell>
                  <TableSortLabel
                    active={orderBy === "createdAt"}
                    direction={orderDirection}
                    onClick={() => handleSort("createdAt")}
                  >
                    Date/Time
                  </TableSortLabel>
                </TableCell>
               <TableCell>
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderDirection}
                    onClick={() => handleSort("status")}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>

                <TableCell>Action</TableCell>
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
                <TableRow key={info._id}>
                  <TableCell>
                    {pdfRowLimit ? i + 1 : page * rowsPerPage + i + 1}
                  </TableCell>
                  <TableCell>
                    <img
                      src={`${image}${info.profileImage}`}
                      className="hos-img"
                      alt=""
                    />
                  </TableCell>
                  <TableCell>{info.name}</TableCell>
                  <TableCell>{info.role}</TableCell>
                  <TableCell>{info.email}</TableCell>
                  <TableCell>{new Date(info.createdAt).toLocaleDateString("en-GB")}/{new Date(info.createdAt).toLocaleTimeString('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
})}</TableCell>
                 <TableCell>
                              {   
                                   <label className="active-switch">
                                     <input
                                       className="active-switch-input "
                                       type="checkbox"
                                       checked={Boolean(info.status)}
                                       onChange={() => {
                                         dataActiveInactive(
                                           info._id,
                                           info.status
                                         );
                                       }}
                                     />
                                     <span
                                       className="active-switch-label "
                                       data-on="Active"
                                       data-off="Inactive"
                                     ></span>
                                     <span className="active-switch-handle"></span>
                                   </label>
                                 }
                               </TableCell>
                  <TableCell className="action-icon">
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => handleEdit(info._id)}
                    ></i>
                    {role === "Admin" && (
                      <i
                        className="fa fa-trash ms-1"
                        onClick={() => handleDelete(info._id)}
                      ></i>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!pdfRowLimit && (
            <div className="d-flex justify-content-end mt-2">
              <Pagination
                count={Math.ceil(filteredRows.length / rowsPerPage)}
                page={page + 1}
                onChange={(e, value) => setPage(value - 1)}
              />
            </div>
          )}
        </TableContainer>
      </div>
    </div>
  );
}



