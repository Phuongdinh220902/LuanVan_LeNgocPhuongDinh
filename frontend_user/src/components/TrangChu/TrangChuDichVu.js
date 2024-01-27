
import logoImage4 from '../../images/tien-ich-ho-tro-icon.png';
import logoImage5 from '../../images/tra-cuu-chung-chi.png';
import logoImage6 from '../../images/tra-cuu-diem-thi.png';

const DichVu = () => {

    return (
        <>
            <div className="dich-vu-container" style={{ 'paddingTop': '20px', 'paddingBottom': '30px' }}>
                <div className="container">
                    <div className="section-title" style={{ "marginBottom": "40px" }}>
                        <h2 className="tieu-de-muc">
                            <img src={logoImage4} alt="" />&nbsp;
                            Hỗ trợ</h2>
                    </div>

                    <div className="tien-ich lazy visible">
                        <div className="col-sm-6 col-md-6 canh-le">
                            <div className="tien-ich-mo-ta">
                                <a href="/tra-cuu-diem-thi" target="_blank">
                                    <img className="img-responsive hidden-xs"
                                        src={logoImage6} alt="" />
                                </a>
                                <h3><img className="visible-xs"
                                    src={logoImage6}
                                    alt="" /> <a href="/tra-cuu-diem-thi" target="_blank">Tra cứu kết quả thi</a></h3>
                                <p>Học viên có thể tra cứu điểm thi và tải Chứng nhận hoàn thành khóa học sau ngày thi 2 tuần.</p>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="col-sm-6 col-md-6 canh-le">
                            <div className="tien-ich-mo-ta">
                                <a href="/tra-cuu-diem-thi" className="tra-cuu-cc" style={{ "cursor": "pointer" }}>
                                    <img className="img-responsive hidden-xs"
                                        src={logoImage5} alt="" />
                                </a>
                                <h3>
                                    <img className="visible-xs"
                                        src={logoImage5}
                                        alt="" /> <a href="/tra-cuu-diem-thi"
                                            className="tra-cuu-cc"
                                            style={{ "cursor": "pointer" }}
                                        >Tra cứu chứng chỉ</a></h3>
                                <p>Hỗ trợ học viên tra cứu Chứng chỉ được<br />Trung Tâm cấp sau ngày thi 1,5 tháng.</p>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
};

export default DichVu;