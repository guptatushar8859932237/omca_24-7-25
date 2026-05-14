// import React from 'react'

// export default function DoctorReviewModal() {
//   return (
//     <div>
      
//     </div>
//   )
// }
// components/common/DoctorReviewModal.jsx

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const DoctorReviewModal = ({
  open,
  handleClose,
  formData,
  handleChange,
  handleImageChange,
  handleSubmit,
  title,
}) => {
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
      <div className="main-card-header">
        <div className="note-hd">
          <h6>{title}</h6>
        </div>

        <div className="cross-icon" onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>

      <DialogContent className="main-box">

        {/* Review Notes */}
        <div className="field-set">
          <label>Review Notes</label>

          <textarea
            name="discussionNotes"
            rows="4"
            className="form-control"
            placeholder="Review"
            value={formData.discussionNotes}
            onChange={handleChange}
          />
        </div>

        {/* Upload Image */}
        <div className="field-set">
          <label>Upload Images</label>

          <input
            type="file"
            className="form-control"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {/* Recommendation */}
        <div className="field-set">
          <label>Recommendations</label>

          <textarea
            name="recommend"
            rows="4"
            className="form-control"
            placeholder="Recommendations"
            value={formData.recommend}
            onChange={handleChange}
          />
        </div>

        <DialogActions>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>

      </DialogContent>
    </Dialog>
  );
};

export default DoctorReviewModal;