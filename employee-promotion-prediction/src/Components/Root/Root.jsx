
import { Outlet } from 'react-router-dom';
import Header from '../../Header';
import Footer from '../../Footer/Footer';

const Root = () => {

    return (
        <>
            <Header />
            <div className='bg-green-50'>
                <Outlet />
            </div>
            <Footer></Footer>
        </>
    );
};

export default Root;
