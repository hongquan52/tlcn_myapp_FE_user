import React, {useRef} from 'react'
import CommonSection from '../components/UI/common-section/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { useForm } from 'react-hook-form'
import { Publish, } from "@mui/icons-material"
import FileBase from "react-file-base64";
import '../styles/contact-page.css'
import { useParams } from 'react-router-dom'
import '../styles/userinformation.css'
// import '../styles/user.css'
import { Box, CircularProgress } from '@mui/material'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { updateUSer, getUSer } from '../api/fetchers/user'
import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { thunkUserTypes } from '../constants/thunkTypes'
const userInfo = sessionStorage.getItem('userInfo')
const UserInformation = () => {
    const upLoadRef = useRef();

    const [enterFirstName, setEnterFirstName] = useState()
    const [enterLastName, setEnterLastName] = useState()
    const [enterPhone, setEnterPhone] = useState()
    const [enterEmail, setEnterEmail] = useState()


    //const { userId } = useParams();
    const [tab, setTab] = useState('information')
    const [imageUrl, setImageUrl] = useState(null);
    const [wrongImageType, setWrongImageType] = useState(false);
    const [valueGender, setValueGender] = useState(null);

    const { userId } = useParams()
    // const [userData, setUserData] = useState([])
    const { isLoading, data } = useQuery([thunkUserTypes.GET_USER],
        () => getUSer(userId))

    const handleChange = ((e) => {
        setValueGender(e.target.value)
    
      })
    // console.log(data)
    // console.log(typeof data.data.results.dateOfBirth)
    
    

    // create form by useForm()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    const onSubmit = async (dataForm) => {
        const { firstname, lastname, email, phone,gender, address, username, password } = dataForm;
        let formData = new FormData()
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("gender", gender);
        formData.append("address", address);
        formData.append("username", username);
        formData.append("password", password);
        

        // const {
        //     data: { status, message },
        // } = await updateUSer(2, formData);
        // if (status === "BAD_REQUEST") {
        //     alert(message);
        // }
        // console.log(upLoadRef.current.file[0])
        
    }

    useEffect(() => {
        if (data) {
            setValue("firstname", data.data.results.firstName);
            setValue("lastname", data.data.results.lastName);
            setValue("email", data.data.results.email);
            setValue("phone", data.data.results.phone);
            setValue("address", data.data.results.email);
            setValue("dateofbirth", data.data.results.dateOfBirth)
            setValue("username", data.data.results.username);
            setValue("password", data.data.results.password);

            setValueGender(data.data.results?.sex)

        }
    }, [data,setValue]);

    // upload images function
    const uploadImage = (file) => {
        const { type } = file;
        if (
        type === "image/png" ||
        type === "image/svg" ||
        type === "image/jpg" ||
        type === "image/jpeg"
        ) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setImageUrl(reader.result);
        };
        setWrongImageType(false);
        } else {
        setWrongImageType(true);
        setImageUrl(null);
        }
    };
    //--------------------------------------
    const saveInfo = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        
        "firstName": enterFirstName,
        "lastName": enterLastName,
        "sex": valueGender,
        "phone": enterPhone,
        "email": enterEmail,
        "avatar": imageUrl,
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`localhost:3000/api/v1/customer/${userInfo.uid}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    if (isLoading) {
        return (
            <div style={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
        )
    }

    return (
        <Helmet title='User Information'>
            <CommonSection title='User information'></CommonSection>

            <div className="tabs d-flex align-items-center gap-3 py-3"
                style={{
                    'marginLeft': '20px',
                }}
            >
                <h6 className={`${tab === 'information' ? 'tab__active' : ''}`} onClick={() => setTab('information')}>Information</h6>
                <h6 className={`${tab === 'changPassword' ? 'tab__active' : ''}`}
                    onClick={() => setTab('changPassword')}>Change Password</h6>
            </div>

            {
                tab === 'information' ? (
                    <>
                        {data.data.results?.avatar ? (
                            <img src={data.data.results?.avatar} alt={"avatar"} className="userShowImg" />
                        ) : (
                            <img
                                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                alt=""
                                className="userShowImg"
                            />
                        )
                        }

                        <form
                            className='form userUpdateForm'
                            id='form'
                            onSubmit={handleSubmit(onSubmit)}
                            style={{
                                'marginBottom': '40px',
                            }}
                        >
                            <div className="userUpdateLeft">
                                <div className="form__group">
                                    <label>First Name</label>
                                    <input
                                        onChange={(e) => setEnterFirstName(e.target.value)}
                                        type='text'
                                        placeholder='Full name'
                                        className=''
                                        {...register('firstname', { required: true })}
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Last Name</label>
                                    <input
                                        onChange={(e) => setEnterLastName(e.target.value)}
                                        type='text'
                                        placeholder='Last name'
                                        className=''
                                        {...register('lastname', { required: true })}
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Giới tính</label>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={valueGender}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                        {...register('gender', { required: true })}

                                    >
                                        <div className='gender__radio-btn'>
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="form__group">
                                    <label>Ngày sinh</label>
                                    <input 
                                        type='text'
                                        placeholder='Ngay sinh'
                                        className=''
                                        {...register('dateofbirth', { required: true })}
                                        
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Email</label>
                                    <input
                                        onChange={(e) => setEnterEmail(e.target.value)}
                                        type='email'
                                        placeholder='Email'
                                        className=''
                                        {...register('email', { required: true })}
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Số điện thoại</label>
                                    <input
                                        onChange={(e) => setEnterPhone(e.target.value)}
                                        type='text'
                                        placeholder='Phone'
                                        className=''
                                        {...register('phone', { required: true })}
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Địa chỉ</label>
                                    <input
                                        type='text'
                                        placeholder='Address'
                                        className=''
                                        {...register('address', { required: true })}
                                    />
                                </div>

                            </div>

                            {/* <div className="userFormRight">
                                    {imageUrl ? (
                                    <img src={imageUrl} alt={"avatar"} className="userAvatar" />
                                ) : (
                                    <img
                                        src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                                        alt=""
                                        className="userAvatar"
                                    />
                                )
                                }
                                <div className="userUpdateUpload">
                                    {wrongImageType ? (
                                        <div>
                                            <span
                                                style={{ fontSize: "12px", color: "red", top: "15%" }}
                                            >
                                                Wrong image type.
                                            </span>
                                        </div>
                                    ) : null}
                                    <label>
                                        <Publish className="userUpdateIcon" />
                                        
                                        <input
                                            type="file"
                                            multiple
                                            id="upload"
                                            ref={upLoadRef}
                                            onChange={(e) => uploadImage(e.target.files[0])}
                                        />
                                    </label>
                                </div>
                                <button className="addToCart__btn"
                                    onClick={handleSubmit(onSubmit)}>
                                    <button onClick={saveInfo}>Lưu</button>
                                    
                                </button>
                            </div> */}
                            <div className="userFormRight">
                                <button className="addToCart__btn"
                                        onClick={handleSubmit(onSubmit)}>
                                        Lưu
                                        
                                </button>
                            </div>
                            
                        </form>
                    </>
                )
                    :
                    // (
                    //     <form className='form mb-5' onSubmit={handleSubmit(onSubmit)}>
                    //         <div className="form__group">
                    //             <label>Tên tài khoản</label>
                    //             <input
                    //                 type='text'
                    //                 placeholder='Username'
                    //                 className=''
                    //                 {...register('username', { required: true })}
                    //             />
                    //         </div>
                    //         <div className="form__group">
                    //             <label>Mật khẩu</label>
                    //             <input
                    //                 type='password'
                    //                 placeholder=''
                    //                 className=''
                    //                 {...register('password', { required: true })}
                    //             />
                    //         </div>
                    //         <div className="form__group">
                    //             <label>Mật khẩu mới</label>
                    //             <input
                    //                 type='password'
                    //                 placeholder='password'
                    //                 className=''
                    //                 {...register('password', { required: true })}
                    //             />
                    //         </div>

                    //         <button className="addToCart__btn">
                    //             Lưu mật khẩu
                    //         </button>
                    //     </form>
                    // )
                    null
            }

        </Helmet>
    )
}

export default UserInformation