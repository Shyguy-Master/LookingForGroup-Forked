import { useState, useEffect } from 'react';

const ConfirmDelete = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="delete-modal">
            <div className="modal">
                <div className="modal-content">
                    <h3>Are you sure? <br></br>
                    This action cannot be undone.</h3>
                    <br></br>
                    <p>Enter your password to confirm:</p>
                    <input type="password" className="password-change" />

                    <div className="modal-buttons">
                        <button className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button className="btn-confirm delete-account-btn" onClick={onConfirm}>Delete Forever</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
