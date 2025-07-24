import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetAllNewPermission } from "../../reducer/NewpermissonsSlice";
import { NewUpdatePermission } from "../../reducer/NewpermissonsSlice";
import Swal from "sweetalert2";
import "./Permission.css";

export default function PermissionPage() {
  const dispatch = useDispatch();
  const { NewPermissions, loading, error } = useSelector((state) => state.NewPermissions);
  const [permissionsData, setPermissionsData] = useState([]);

  useEffect(() => {
    dispatch(GetAllNewPermission());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched NewPermissions:", NewPermissions);
    if (Array.isArray(NewPermissions)) {
      setPermissionsData(NewPermissions);
    } else {
      console.warn("NewPermissions is not an array:", NewPermissions);
      setPermissionsData([]); // Default to an empty array
    }
  }, [NewPermissions]);


  const handleCheckboxChange = (roleId, endpoint, isChecked) => {
    const updatedPermissions = permissionsData.map((role) => {
      if (role.Id === roleId) {
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [endpoint]: isChecked ? 1 : 0,
          },
        };
      }
      return role;
    });
    setPermissionsData(updatedPermissions);
  };

  const handleSubmit = async () => {
    const formattedPermissions = permissionsData.flatMap((role) =>
      Object.entries(role.permissions).map(([endpoint, allow]) => ({
        role: role.role,
        endpoint,
        allow,
      }))
    );

    let timerInterval;
    Swal.fire({
      title: "Processing...",
      html: "This may take a few seconds. Time elapsed: <b></b> ms.",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        let startTime = Date.now();
        timerInterval = setInterval(() => {
          timer.textContent = `${Date.now() - startTime}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });

    try {
      await dispatch(NewUpdatePermission({ permissions: formattedPermissions })).unwrap();
      clearInterval(timerInterval);
      Swal.fire("Success!", "Permissions updated successfully!", "success");
      dispatch(GetAllNewPermission());
    } catch (err) {
      clearInterval(timerInterval);
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="top-save-main">
              <h4 className="page-title mb-0">Manage Permissions</h4>
              <button className="add-button" onClick={handleSubmit}>Save Changes</button>
            </div>
          </div>
        </div>
        <div className="main_content">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-border  datatable table-no-card">
                  <thead>
                    <tr>
                      <th>ENDPOINTS</th>
                      {Array.isArray(permissionsData) && permissionsData.map((role) => (
                        <th key={role.Id} className="text-uppercase">{role.role}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {permissionsData?.length > 0 &&
                      Object.keys(permissionsData[0]?.permissions || {}).map((endpoint) => (
                        <tr key={endpoint}>
                          <td>{endpoint.replace(/_/g, " ").replace(/^\//, "").toUpperCase()}</td>
                          {permissionsData?.map((role) => (
                            <td key={role.Id}>
                              <input
                                className="form-check-input checkbox-align"
                                type="checkbox"
                                checked={role.permissions[endpoint] === 1}
                                onChange={(e) =>
                                  handleCheckboxChange(role.Id, endpoint, e.target.checked)
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}