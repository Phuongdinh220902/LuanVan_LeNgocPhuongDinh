import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
    faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import axios from "axios";

const ThemLT = ({ show, handleCloseModalLT, onUpdate }) => {
    const [ngaythi, setNgayThi] = useState('');
    const [hocphi, setHocPhi] = useState('');
    const [ngayhethan, setNgayhethan] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [showModalCreateKH, setShowModalCreateKH] = useState(false);

    const handleClose = () => {
        setShowModalCreateKH(false);
        setNgayThi("");
        setHocPhi("");
        setNgayhethan("")
        handleCloseModalLT();
    }

    const handleShow = () => setModalOpen(true);


    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('ngaythi', ngaythi);
            formData.append('hocphi', hocphi);
            formData.append('ngayhethan', ngayhethan);
            for (const value of formData.values()) {
                console.log(value);
            }

            let mdata = {
                ngaythi: ngaythi,
                hocphi: hocphi,
                ngayhethan: ngayhethan,
            }
            console.log(mdata)
            await axios.post('http://localhost:2209/api/v1/themLT', mdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            toast.success('Thêm thành công');
            onUpdate();
            handleClose();

        }
        catch (error) {
            console.error("Lỗi khi gọi API thêm giảng viên:", error.message);
            toast.error("Đã xảy ra lỗi khi thêm giảng viên");
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}
                size="xl"
                backdrop='static'
                className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới khoá học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Ngày thi</label>
                            <input type="date" className="form-control" value={ngaythi}
                                onChange={(event) => setNgayThi(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Ngày hết hạn</label>
                            <input type="date" className="form-control" value={ngayhethan}
                                onChange={(event) => setNgayhethan(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Lệ phí</label>
                            <input type="text" className="form-control" value={hocphi}
                                onChange={(event) => setHocPhi(event.target.value)} />
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ThemLT;