import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Image from '../../images/img_backtoschool.jpg';
import Image1 from '../../images/img_clr.jpg';
import Image2 from '../../images/img_code.jpg';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';

const TrangLopHocHV = () => {
    const [thongbao, setThongBao] = useState([]);
    const [tenGV, setTenGV] = useState("");
    // const maGV = localStorage.getItem('maGV');
    const [tenHA, setTenHA] = useState("");
    const [randomImage, setRandomImage] = useState('');
    const images = [Image, Image1, Image2];
    const [isShowingThongBao, setIsShowingThongBao] = useState(true);
    const [giangVien, setGiangVien] = useState([]);
    const [hocVien, setHocVien] = useState([]);
    const [showThongBao, setShowThongBao] = useState(true);
    const [highlightBangTin, setHighlightBangTin] = useState(true);
    const [highlightMoiNguoi, setHighlightMoiNguoi] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [showModal, setShowModal] = useState(false);
    const { maLopHoc } = useParams();
    const maHV = localStorage.getItem('maHV');
    const [alreadyReviewed, setAlreadyReviewed] = useState(false);
    const [trangThaiCamNhan, setTrangThaiCamNhan] = useState(null);
    useEffect(() => {
        // Kiểm tra xem người dùng đã đánh giá lớp học hay chưa
        axios.get(`http://localhost:2209/api/v1/KiemTraDanhGia?maLopHoc=${maLopHoc}&maHV=${maHV}`)
            .then(response => {
                setAlreadyReviewed(response.data.alreadyReviewed);
                console.log(response.data.alreadyReviewed)
                console.log(alreadyReviewed, 'hi')
                const trangThai = response.data.trangThaiCamNhan;
                setTrangThaiCamNhan(trangThai);
            })
            .catch(error => {
                console.error('Lỗi khi kiểm tra đánh giá:', error);
            });
    }, [alreadyReviewed]);

    const handleOpenModal = () => {
        if (trangThaiCamNhan === 0) {
            toast.info('Lớp học này vẫn chưa đến thời gian đánh giá, vui lòng quay lại sau');
        } else {
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setInputValue('');
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {

        // Tạo object dữ liệu để gửi lên server
        const dataToSend = {
            noidung: inputValue,
            maLopHoc: maLopHoc,
            maHV: maHV
        };

        // Gọi API để gửi cảm nhận
        axios.post('http://localhost:2209/api/v1/GuiCamNhan', dataToSend)
            .then(response => {
                // Xử lý response từ server nếu cần
                console.log('Gửi cảm nhận thành công!', response.data);
                // Đóng modal sau khi gửi thành công
                handleCloseModal();
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi gửi cảm nhận:', error);
            });
    };

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseTB = await axios.get(`http://localhost:2209/api/v1/layThongBaoLopHocHV/${maLopHoc}`);
                const sortedThongBao = responseTB.data.TB.sort((a, b) => moment(b.ngaydang) - moment(a.ngaydang));
                setThongBao(sortedThongBao);
                setRandomImage(getRandomImage());

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [maLopHoc]);

    const formatDate = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1;
        const year = dateTime.getFullYear();
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };

    const handleShowThongBao = () => {
        setShowThongBao(!showThongBao);
        setHighlightBangTin(true);
        setHighlightMoiNguoi(false);
    };

    const handleToggleData = async () => {
        if (isShowingThongBao) {
            // Lấy dữ liệu danh sách mọi người
            try {
                const responseND = await axios.get(`http://localhost:2209/api/v1/layNguoiDung/${maLopHoc}`);
                const { MN } = responseND.data;

                const gv = [];
                const hv = [];
                MN.forEach((nguoi) => {
                    if (nguoi.maGV) {
                        gv.push(nguoi);
                    } if (nguoi.maHV) {
                        hv.push(nguoi);
                    }
                });

                setGiangVien(gv);
                setHocVien(hv);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
        }
        setShowThongBao(!showThongBao);
        setHighlightMoiNguoi(true);
        setHighlightBangTin(false);
    };

    return (
        <>
            <div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <div style={{ marginBottom: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '5px', display: 'flex', justifyContent: 'center' }}>
                        <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0, marginLeft: '25px', fontSize: '16px' }}>
                            <li className={highlightBangTin ? " highlighted-link" : "highlighted-link1"} style={{ marginRight: '20px', cursor: 'pointer' }} onClick={handleShowThongBao}>
                                Bảng tin
                            </li>
                            <li className={highlightMoiNguoi ? "highlighted-link" : "highlighted-link1"} style={{ cursor: 'pointer' }} onClick={handleToggleData}>
                                Mọi người
                            </li>
                            <li className='highlighted-link1' style={{ cursor: 'pointer' }} onClick={handleOpenModal}>
                                Đánh giá
                            </li>
                        </ul>
                    </div>

                    <div>
                        {showThongBao ? (
                            <div>
                                <div style={{ marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: '0' }}>
                                    <div style={{ position: 'relative', width: '80%', height: '250px', backgroundImage: `url(${randomImage})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: '0', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}></div>
                                    <h1 style={{ textAlign: 'center', position: 'absolute', zIndex: '1', color: '#fff', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Lớp học {thongbao.length > 0 && thongbao[0].tenLopHoc}</h1>
                                </div>
                                <div>
                                    {thongbao.length > 0 ? (
                                        thongbao.map((tb, index) => (
                                            <div style={{ display: 'flex', alignItems: 'center' }} key={index} className='centered-div1'>
                                                <Link to={`/thongbao/${tb.maTB}`}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div className="user-info-container" style={{ display: 'flex', alignItems: 'center' }}>
                                                            <img src={`http://localhost:2209/images/${tb.tenHA}`} alt="Avatar" style={{ width: '50px', height: '50px', marginLeft: '15px' }} />
                                                        </div>
                                                        <div style={{ marginTop: '10px' }}>
                                                            <p style={{ marginLeft: '20px', fontSize: '0.875rem', fontWeight: '500', color: '#3c4043', fontFamily: "Google Sans, Roboto, Arial, sans-serif", letterSpacing: '.01785714em', lineHeight: '1.25rem' }}>{tb.tenGV} đã đăng một thông báo mới: {tb.tieude_thongbao}</p>
                                                            <p style={{ marginLeft: '20px', fontSize: '13px', opacity: 0.7, color: 'black' }}>{formatDate(tb.ngaydang)}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Không có thông báo nào.</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>


                                <div className='centered-div-nd'>
                                    <div style={{ marginBottom: '70px' }}>
                                        <h2 className='gv'>Giáo viên</h2>
                                        {giangVien.map((gv, index) => (
                                            <div className='user-info-container' key={index} style={{ marginLeft: '20px', marginBottom: '25px' }}>
                                                <img src={`http://localhost:2209/images/${gv.tenHA}`} alt="Avatar" style={{ width: '40px', height: '40px' }} />
                                                <p style={{ fontSize: '14px', marginTop: '10px' }}> {gv.tenGV}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div >
                                        <h2 className='gv'>Bạn học</h2>
                                        {hocVien.map((hv, index) => (
                                            <div className='user-info-container' key={index} style={{ marginLeft: '20px', marginBottom: '25px' }}>
                                                <img src={`http://localhost:2209/images/${hv.tenHinhAnhHV}`} alt="Avatar" style={{ width: '40px', height: '40px' }} />
                                                <p style={{ fontSize: '14px', marginTop: '10px' }}> {hv.tenHV}</p>
                                            </div>
                                        ))}
                                    </div>


                                </div>
                            </div>
                        )}
                    </div>

                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
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

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton style={{ backgroundColor: '#0082c8', color: 'white' }}>
                    <Modal.Title>Đánh giá</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '16px' }}>
                    {alreadyReviewed ? (
                        <p>Bạn đã đánh giá lớp học này rồi.</p>
                    ) : (
                        <textarea
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Nhập cảm nhận của bạn"
                            style={{ width: '100%', padding: '10px', marginBottom: '10px', resize: 'vertical' }}
                            rows={3}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                    {!alreadyReviewed && (
                        <Button variant="primary" onClick={handleSubmit}>
                            Gửi
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TrangLopHocHV;
