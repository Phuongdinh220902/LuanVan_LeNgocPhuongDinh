
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import TT from '../../images/THÔNG BÁO LỊCH THI UDCNTT.png';

const LichThi = () => {
    const [noiDungBaiViet, setNoiDungBaiViet] = useState('');
    const [caThi, setcaThi] = useState([]);
    const [ngaythi, setNgayThi] = useState('');
    const [ngayhethan, setNgayhethan] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2209/api/v1/layThongTinLTTSTD`);
                const { ND } = response.data;
                if (ND && ND.length > 0 && ND[0].noidung) {
                    setNoiDungBaiViet(ND[0].noidung);
                }

                const responsecaThi = await axios.get(`http://localhost:2209/api/v1/laydsCaThiND`);
                const { CT } = responsecaThi.data;
                setcaThi(CT);

                if (CT && CT.length > 0 && CT[0].ngaythi) {
                    setNgayThi(CT[0].ngaythi);
                }

                if (CT && CT.length > 0 && CT[0].ngayhethan) {
                    setNgayhethan(CT[0].ngayhethan);
                }


            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };

        fetchData();
    }, []);



    return (
        <div className="container nganh-khoang-cach" style={{ "minHeight": "calc(100vh - 346px)", marginTop: '10px' }}>

            <h1 className="tieu-de-bai-viet-chi-tiet">Thông báo lịch thi tự do Chứng chỉ Ứng dụng CNTT Cơ bản </h1>

            <div id="Khung_thong_tin">
                <div style={{ textAlign: "center", marginBottom: '20px' }}>
                    <img src={TT} style={{ width: '868px', height: '434px' }} />
                </div>

                <div id="ctl00_cphBody_NoiDungTrai" className="col-md-9 khoang-cach-5" style={{ paddingLeft: 0, marginBottom: '20px' }}>
                    <div className="col-md-12 khoang-cach-5">
                        <div className="noi-dung" style={{ marginBottom: '10px' }}>
                            <p className="tieu-de-nho" style={{ display: 'none' }}><span className="glyphicon glyphicon-time"></span> ngày 03-11-2021</p>

                            <div dangerouslySetInnerHTML={{ __html: noiDungBaiViet }} style={{ fontSize: '16px' }} />
                        </div>
                        <div>
                            <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Ngày thi: </span>
                            <span style={{ color: 'red' }}>{ngaythi}</span>
                        </div>

                        <div>
                            <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Ngày hết hạn đăng ký: </span>
                            <span style={{ color: 'red' }}>{ngayhethan}</span>
                        </div>

                    </div>

                    <div style={{ clear: 'both' }}></div>
                </div>
                <div className="center-table" style={{ marginLeft: '200px' }}>
                    <table className="table" style={{ width: '80%' }}>
                        <thead>
                            <tr>
                                <th className="col-center">STT</th>
                                <th className="col-center">Ca thi</th>
                                <th className="col-center"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {caThi && caThi.map((lop, index) => (
                                <tr key={lop.maCaThi}>
                                    <td className="col-center">{index + 1}</td>
                                    <td>{lop.thoigian}</td>
                                    <td>
                                        <Link to={`/dangkythitudo/${lop.maCaThi}`}>
                                            <button className="button-dk"> Đăng ký</button>
                                        </Link>

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>


        </div >
    );
};


export default LichThi;


