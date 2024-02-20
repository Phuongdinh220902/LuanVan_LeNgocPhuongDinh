
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TraCuuDiemThi = () => {
    const [noiDungBaiViet, setNoiDungBaiViet] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2209/api/v1/layThongTinDiemThi`);
                const { ND } = response.data;
                if (ND && ND.length > 0 && ND[0].noidung) {
                    setNoiDungBaiViet(ND[0].noidung);
                }
            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div class="container nganh-khoang-cach" style={{ "minHeight": "calc(100vh - 346px);" }}>
            <div class="col-md-12 khoang-cach-5" style={{ 'background-color': '#EFEFEF', border: '1px solid #CCC', borderRadius: '5px', marginBottom: "10px" }}>
                <h1 style={{ 'textAlign': 'center', color: '#0082c8', fontSize: '24px', fontWeight: '500', margin: "40px 0px" }}>TRA CỨU THÔNG TIN ĐIỂM THI</h1>
                <div class="col-xs-12 col-md-8 col-md-offset-2" style={{ marginBottom: '30px' }}>
                    <div class="form-group">
                        <label class="control-label col-sm-4" style={{ paddingRight: '0', textAlign: 'right', paddingTop: "8px" }}>Họ tên/Email/Điện thoại: </label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control tieuchi" placeholder="Họ và tên/ Email/ Điện thoại" style={{ "width": '80%', 'display': 'inline' }} id="Th_Tieu_chi" name="Th_Tieu_chi" onkeydown="keyPress(event)" />
                            <button type="button" class="btn btn-default" onclick="tra_cuu_diem()" style={{ fontSize: '20px', 'backgroundColor': '#0082c8', color: '#FFF', borderColor: '#0082c8', marginLeft: "5px" }}>
                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="form-group" id="chonngay" style={{ display: 'none', paddingTop: '5px', clear: "both" }}>
                        <label class="control-label col-sm-4" for="Th_Ngay_sinh" style={{ paddingRight: '0', textAlign: 'right', paddingTop: "8px" }}>Ngày sinh: </label>
                        <div class="col-sm-8">

                            <input type="text" class="form-control ngaysinh" placeholder="Ngày/Tháng/Năm hoặc Năm sinh" style={{ width: "80%" }} id="Th_Ngay_sinh" name="Th_Ngay_sinh" onkeydown="keyPress(event)" />
                        </div>
                    </div>

                </div>
                <div style={{ clear: 'both', height: '10px' }}></div>
            </div>
            <div id="Khung_thong_tin">
                <div id="ctl00_cphBody_NoiDungTrai" className="col-md-9 khoang-cach-5" style={{ paddingLeft: 0 }}>
                    <div className="col-md-12 khoang-cach-5">
                        <div className="noi-dung">
                            <p className="tieu-de-nho" style={{ display: 'none' }}><span className="glyphicon glyphicon-time"></span> ngày 03-11-2021</p>

                            <div dangerouslySetInnerHTML={{ __html: noiDungBaiViet }} />
                        </div>
                    </div>
                    <div style={{ clear: 'both' }}></div>
                </div>
            </div>
        </div>
    );
};


export default TraCuuDiemThi;

