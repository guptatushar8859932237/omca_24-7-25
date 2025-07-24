import React from 'react'
import "./Permission.css";
import { useSelector, useDispatch } from 'react-redux'
import { GetAllPermission } from '../../reducer/PermissionsSlice'
import { useState, useEffect } from 'react'
import { UpdatePermission } from '../../reducer/PermissionsSlice'
import Swal from "sweetalert2";
export default function () {
  const dispatch = useDispatch();
  const { Permissions, loading, error } = useSelector((state) => state.Permissions);
  const [permissionsData, setPermissionsData] = useState([]);

  useEffect(() => {
    dispatch(GetAllPermission());
  }, [dispatch]);

  useEffect(() => {
    if (Permissions) {
      setPermissionsData(Permissions); // Set the permissions data in state
    }
  }, [Permissions]);

  const handleCheckboxChange = (roleId, endpoint, isChecked) => {
    const updatedPermissions = permissionsData.map((role) => {
      if (role.Id === roleId) {
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [endpoint]: isChecked ? 1 : 0, // Update the checkbox state
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
    // Show the loading SweetAlert
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
      }
    });
  
    try {
      // Call the API
      const result = await dispatch(UpdatePermission({ permissions: formattedPermissions })).unwrap();
      clearInterval(timerInterval);
  
      // Show success message
      Swal.fire("Success!", "Successfully updated permissions for all specified roles!", "success");
  
      // Fetch updated data
      dispatch(GetAllPermission());
    } catch (err) {
      clearInterval(timerInterval);
  
      // Show error message
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">Manage Permission</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="table-responsive">
              <table className="table table-border custom-table datatable mb-0">
                <thead>
                  <tr>
                    <th className="col-3">Endpoints</th>
                    {permissionsData.length > 0 &&
                    permissionsData.map((role) => (
                      <th key={role.Id} className="col-3">{role.role}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(permissionsData[0]?.permissions || {}).map((endpoint) => (
                    <tr key={endpoint}>
                      <td>{endpoint.replace(/_/g, " ").replace(/^\//, "").toUpperCase()}</td>
                      {permissionsData.map((role) => (
                        <td key={role.Id}>
                          <input
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
            <div className="row mt-3">
              <div className="col-md-12 text-center">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
