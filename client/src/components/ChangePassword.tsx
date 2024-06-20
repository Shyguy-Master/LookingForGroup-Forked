import { useState, useEffect } from 'react';

const ConfirmDelete = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="change-pass-modal">
            <div className="modal">
                <div className="modal-content">
                    <h3>Change Password</h3>

                    <input type="password" className="password-change" name="oldPassword" placeholder='Old Password' />
                    <input type="password" className="password-change" name="newPassword" placeholder='New Password' />
                    <input type="password" className="password-change" name="newPassword2" placeholder='Confirm New Password' />

                    <div className="modal-buttons">
                        <button className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button className="btn-confirm change-pass-btn" onClick={onConfirm}>Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
