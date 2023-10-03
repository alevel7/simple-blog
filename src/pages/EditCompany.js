import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getACompany } from '../apis/company.api';
import { useState } from 'react';
import { uploadLogo } from "../apis/company.api";
import { toast } from 'react-toastify';
import Navbar from "../components/Navbar";
const EditCompany = () => {
    const { id } = useParams();
    const [image, setImage] = useState('');
    let user = JSON.parse(localStorage.getItem('user'));


    const { data, error, isError } = useQuery([id], getACompany);
    let currentUser = localStorage.getItem('user');
    currentUser = JSON.parse(currentUser);

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }



    const uploadImage = () => {
        const formData = new FormData();
        formData.append('logo', image);

        uploadLogo({ id, data: formData })
            .then(res => {
                toast.success('upload successful');
                window.location.reload();
            })
            .catch(err => {
                toast.error('An error occurred! try again')
            })
    }

    return (
        <div className="container">
            <Navbar username={user} />

            <div className="content">
                <div className="company-detail">
                    <h3>Edit company </h3>
                    <p><span>Company Name:</span> <span> {data?.name}</span></p>
                    <p><span>Number of Users:</span> <span>{data?.numberOfUsers}</span></p>
                    <p><span>Number of products:</span> <span>{data?.numberOfProducts}</span></p>
                    <p><span>Percentage:</span> <span>{data?.Percentage}</span></p>
                    <div className="company-image">
                        {data?.logo && <img src={'http://localhost:3333/' + data?.logo} alt="company logo" />}
                    </div>
                    {currentUser?.isAdmin === true && <div className="action">
                        <input type="file" name="logo" id="logo" accept=".png,.jpg,.jpeg,.gif" onChange={handleImage} />
                        <button onClick={() => uploadImage()}>upload logo</button>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default EditCompany;