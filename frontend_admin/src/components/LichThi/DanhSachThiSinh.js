import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import {
    laydsThiSinh, deleteThiSinhDK
} from "../../services/apiService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
// import ModalUpdateLopHoc from "./ModalUpdateLopHoc";
import axios from "axios";

const DSThiSinh = (props) => {
    const [DSThiSinh, setListThiSinh] = useState([]);
    const { maCaThi } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [selectedLH, setselectedLH] = useState(null);
    const [showModalUpdateLopHoc, setshowModalUpdateLopHoc] = useState(false);
    const [selectID, setselectID] = useState(null);

    let [tukhoa, setTuKhoa] = useState("")

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchDSThiSinh();
    }, [currentPage, tukhoa]);


    const handleDelete = async () => {
        try {
            await deleteThiSinhDK(selectID);
            console.log(maCaThi)
            setShowModal(false);
            toast.success("Xoá thí sinh thành công");

            fetchDSThiSinh();
            console.log("Xoá thí sinh thành công!");
        } catch (error) {
            toast.error("Lỗi khi xoá thí sinh")
            console.error("Lỗi khi xóa thí sinh:", error);
        }
    };

    const changePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            // Chỉ tăng currentPage nếu không phải là trang cuối cùng
            setCurrentPage(currentPage + 1);
        }
    };

    // Hàm xử lý khi nhấn nút sang trái
    const handlePrevPage = () => {
        if (currentPage > 1) {
            // Chỉ giảm currentPage nếu không phải là trang đầu tiên
            setCurrentPage(currentPage - 1);
        }
    };

    const fetchDSThiSinh = async () => {
        try {
            let tukhoa_ = localStorage.getItem("tukhoa");
            let res = await laydsThiSinh(maCaThi, currentPage, tukhoa_);
            console.log(res);

            if (res.status === 200) {
                setListThiSinh(res.data.dataCD);
                // const newCheckboxStates = res.data.dataCD.map((item) => item.trang_thai === 1);
                // setCheckboxStates(newCheckboxStates);
                // setNewState(newCheckboxStates); 
            } else {
                console.error("Lỗi khi gọi API:", res.statusText);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error.message);
        }
    };

    const handleSearch = async () => {
        if (tukhoa === "" || !tukhoa) {
            tukhoa = "null"
        }
        localStorage.setItem("tukhoa", tukhoa)
        await fetchDSThiSinh();
    };

    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const [checkboxStates, setCheckboxStates] = useState([]);

    const [newState, setNewState] = useState([]);

    useEffect(() => {
        if (DSThiSinh.length > 0) {
            const initialCheckboxStates = DSThiSinh.map((item) => item.trang_thai === 1);
            setCheckboxStates(initialCheckboxStates);
            setNewState(initialCheckboxStates); // Khởi tạo trạng thái mới ban đầu
        }
    }, [DSThiSinh]);




    const handleCheckboxChange = async (maDSDK, isChecked, index) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);

        const newNewState = [...newState];
        newNewState[index] = !newNewState[index]; // Cập nhật trạng thái mới
        setNewState(newNewState);

        const dataToSave = DSThiSinh.map((item, index) => ({
            maHocPhiTS: item.maHocPhiTS, // Replace with the actual property name
            isChecked: newNewState[index],
        }));

        try {
            const response = await axios.post('http://localhost:2209/api/v1/SaveCheckboxStatesHPTS', {
                maDSDK: maDSDK,
                isChecked: dataToSave,
            });

            if (response.status === 200) {
                toast.success('Cập nhật trạng thái thành công')
            } else {
                toast.error('Cập nhật trạng thái thất bại')
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu API:', error);
        }
    };

    return (
        <>
            <div className="container-fluid app__content">
                <h2 className="text-center">Danh Sách Thí Sinh</h2>

                <div className="search">
                    <div className="searchHV">
                        <div className="">
                            <div className="searchHV-input">
                                <input
                                    placeholder="Nhập giá trị tìm kiếm"
                                    type="text"
                                    value={tukhoa}
                                    onChange={(e) => setTuKhoa(e.target.value)}
                                />
                            </div>
                            <button className="formatButton" onClick={handleSearch}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm
                            </button>

                        </div>
                    </div>
                </div>

                <div className="listDV">
                    <div className="table-container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="table-item">STT</th>
                                    <th className="table-item ">Tên thí sinh</th>
                                    <th className="table-item ">Email</th>
                                    <th className="table-item ">Học phí</th>
                                    <th className="table-item ">Đã nộp</th>
                                    <th className="table-item ">  </th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {DSThiSinh &&
                                    DSThiSinh.length > 0 &&
                                    DSThiSinh.map((item, index) => {
                                        return (
                                            <tr key={`table-doanvien-${index}`} className="tableRow">
                                                <td className="table-item col-right">{index + 1}</td>
                                                <td className="">{item.hoten}</td>
                                                <td className="">{item.email}</td>
                                                <td className="col-right">{formatCurrency(item.hocphi)}đ</td>
                                                <td className="col-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={checkboxStates[index]}
                                                        onChange={() => handleCheckboxChange(item.maDSDK, checkboxStates[index], index)}
                                                    />
                                                </td>


                                                <td className="table-item">
                                                    {/* <button className="btn btn-warning mx-2" onClick={() => handleOpenModalUpdate(item)}>
                                                        Cập nhật
                                                    </button> */}
                                                    <button className="btn btn-danger" onClick={() => { setselectID(item.maDSDK); setShowModal(true) }}
                                                    >Xoá</button>

                                                </td>
                                            </tr>
                                        );
                                    })}
                                {DSThiSinh && DSThiSinh.length === 0 && (
                                    <tr className="tablenone">
                                        <td className="tablenone">Không có thí sinh nào!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="pagination">
                            <button className="btn-footer" onClick={handlePrevPage}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <div className="footer" key={index}>
                                    <button
                                        className={`btn-footer ${currentPage === index + 1 ? "active" : ""
                                            }`}
                                        onClick={() => changePage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </div>
                            ))}

                            <button className="btn-footer" onClick={handleNextPage}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>

            {/* <ModalUpdateLopHoc
                show={showModalUpdateLopHoc}
                handleClose={() => setshowModalUpdateLopHoc(false)}
                selectedLH={selectedLH}
                onUpdate={fetchDSThiSinh}
            /> */}

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                className="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xoá thí sinh khỏi lớp này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete()}>
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DSThiSinh;