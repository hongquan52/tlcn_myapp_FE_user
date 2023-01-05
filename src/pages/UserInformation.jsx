import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import CommonSection from '../components/UI/common-section/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { useForm } from 'react-hook-form'
import { Publish, } from "@mui/icons-material"
import FileBase from "react-file-base64";
import '../styles/contact-page.css'
import { useParams } from 'react-router-dom'
import '../styles/userinformation.css'
// import '../styles/user.css'
import { Box, CircularProgress, FormControl, FormLabel } from '@mui/material'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { updateUSer, getUSer } from '../api/fetchers/user'
import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { thunkAddressTypes, thunkUserTypes } from '../constants/thunkTypes'
import { deleteAddressDetail, getAddressByUser } from '../api/fetchers/address'


const UserInformation = () => {
    const queryGetUser = useQuery([thunkUserTypes.GET_USER], () => getUSer(userId))
    const queryAddressByUser = useQuery([thunkAddressTypes.GET_ADDRESS_BY_USER], () => getAddressByUser(userId))


    const [addressUser, setAddressUser] = useState([])
    const [informationUser, setInformationUser] = useState([])

    const addressId = document.getElementById("addressId")?.value

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


    const handleChange = ((e) => {
        setValueGender(e.target.value)

    })

    // create form by useForm()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    const onSubmit = async (dataForm) => {
        const { name, phone, email, enable } = dataForm;

        // let formData = new FormData()
        // formData.append("firstname", firstname);
        // formData.append("lastname", lastname);
        // formData.append("email", email);
        // formData.append("phone", phone);
        // formData.append("gender", gender);
        // formData.append("address", address);
        // formData.append("username", username);
        // formData.append("password", password);

        // const {
        //     data: { status, message },
        // } = await updateUSer(2, formData);
        // if (status === "BAD_REQUEST") {
        //     alert(message);
        // }
        // console.log(upLoadRef.current.file[0])

        // fetch API:
        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("phone", phone);
        formdata.append("password", "1234567890"); //informationUser.password : bổ sung dưới responseDTO User trường password
        formdata.append("enable", enable);
        formdata.append("role", "3");
        sessionStorage.setItem("userName", name)
        var requestOptions = {
            method: 'PUT',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/v1/user/${userId}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        window.location.reload();
    }

    useEffect(() => {
        if (informationUser) {
            setValue("name", informationUser.name);
            setValue("phone", informationUser.phone);
            setValue("email", informationUser.email);
            setValue("role", informationUser?.role?.description);
            setValue("enable", informationUser.enable);

            // setValueGender(data.data.results?.name)

        }
    }, [informationUser, setValue]);
    useEffect(() => {
        if (queryAddressByUser.data && queryGetUser.data) {
            setAddressUser(queryAddressByUser.data.data);
            setInformationUser(queryGetUser.data.data);
        }
    }, [queryAddressByUser.data, queryGetUser.data])

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

        fetch(`localhost:3000/api/v1/customer/${userId}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    if (queryAddressByUser.isLoading && queryGetUser.isLoading) {
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
                    onClick={() => setTab('changPassword')}>Address</h6>
            </div>

            {
                tab === 'information' ? (
                    <>
                        {/* {data.data.results?.avatar ? (
                            <img src={data.data.results?.avatar} alt={"avatar"} className="userShowImg" />
                        ) : (
                            <img
                                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                alt=""
                                className="userShowImg"
                            />
                        )
                        } */}

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
                                    <label>Tên người dùng</label>
                                    <input
                                        onChange={(e) => setEnterFirstName(e.target.value)}
                                        type='text'
                                        placeholder='Tên người dùng'
                                        className=''
                                        {...register('name', { required: true })}
                                    />
                                </div>

                                {/* <div className="form__group">
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
                                </div> */}

                                <div className="form__group">
                                    <label>Email</label>
                                    <input
                                        onChange={(e) => setEnterEmail(e.target.value)}
                                        type='email'
                                        placeholder='Email'
                                        className=''
                                        {...register('email', { required: true })}
                                        disabled
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
                                    <label>Vai trò</label>
                                    <input
                                        type='text'
                                        placeholder='Vai trò'
                                        className=''
                                        {...register('role', { required: true })}
                                        disabled
                                    />
                                </div>
                                <div className="form__group">
                                    
                                    <select className='defaultAddress_select'
                                        {...register("enable")}
                                        disabled
                                        
                                    >
                                        <option value={true}>Hoạt động</option>
                                        <option value={false}>Không hoạt động</option>
                                    </select>
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
                                    Lưu thông tin

                                </button>
                            </div>

                        </form>
                    </>
                )
                    :
                    (
                        addressUser?.map((item) => {

                            const handleSaveAddress = () => {
                                // var formdata = new FormData();
                                // formdata.append("province", province);
                                // formdata.append("district", district);
                                // formdata.append("ward", ward);
                                // formdata.append("apartmentNumber", apartmentNumber);
                                // formdata.append("defaultAddress", defaultAddress);

                                // var requestOptions = {
                                // method: 'PUT',
                                // body: formdata,
                                // redirect: 'follow'
                                // };

                                // fetch(`http://localhost:8080/api/v1/address/user?userId=${2}&addressId=${addressId}`, requestOptions)
                                // .then(response => response.text())
                                // .then(result => console.log(result))
                                // .catch(error => console.log('error', error));

                                // window.location.reload();

                                sessionStorage.setItem("addressIDDDDD", addressId);
                            }

                            return (
                                <form className='form mb-5' key={item.address.id}>
                                    <div className="form__group">
                                        <label>Mã địa chỉ</label>
                                        <input
                                            id='addressId'
                                            type='text'
                                            placeholder='Mã địa chỉ'
                                            className=''
                                            value={item.address.id}

                                        />
                                    </div>
                                    <div className="form__group">
                                        <label>Số nhà</label>
                                        <input
                                            id='apartmentNumber'
                                            type='text'
                                            placeholder='Số nhà'
                                            className=''
                                            value={item.address.apartmentNumber}

                                        />
                                    </div>
                                    <div className="form__group">
                                        <label>Phường / Xã</label>
                                        <input
                                            id='ward'
                                            type='text'
                                            placeholder='Tên phường / xã'
                                            className=''
                                            value={item.address.ward}

                                        />
                                    </div>
                                    <div className="form__group">
                                        <label>Quận / Huyện</label>
                                        <input
                                            id='district'
                                            type='text'
                                            placeholder='Quận / Huyện'
                                            className=''
                                            value={item.address.district}

                                        />
                                    </div>
                                    <div className="form__group">
                                        <label>Tỉnh / Thành phố</label>
                                        <input
                                            id='province'
                                            type='text'
                                            placeholder='Tỉnh / Thành phố'
                                            className=''
                                            value={item.address.province}

                                        />
                                    </div>

                                    <div className='d-flex justify-content-between'>

                                        <div>
                                            <h6>Default Address</h6>
                                            <select className='defaultAddress_select' id="defaultAddress"
                                                defaultValue={item.defaultAddress}
                                                disabled
                                            >
                                                <option value={true}>True</option>
                                                <option value={false}>False</option>
                                            </select>
                                        </div>
                                        <div>
                                            <button className="addToCart__btn" onClick={handleSaveAddress}>
                                                <i class="ri-pencil-line"></i>
                                            </button>
                                            <button className="addToCart__btn" onClick={() => deleteAddressDetail(userId, item.address.id)}>
                                                <i class="ri-delete-bin-line"></i>
                                            </button>
                                            <Link to={'/address/create'}><button className="addToCart__btn" >
                                                <i class="ri-file-add-fill"></i>

                                            </button></Link>
                                        </div>
                                    </div>

                                </form>
                            )
                        }
                        )
                    )

            }

        </Helmet>
    )
}

export default UserInformation

const addressByUser = [
    {
        "user": 2,
        "address": {
            "id": 8,
            "apartmentNumber": "35 Bùi Quang Là",
            "ward": "Phường 12",
            "district": "Gò Vấp",
            "province": "TPHCM"
        },
        "defaultAddress": false
    },
    {
        "user": 2,
        "address": {
            "id": 10,
            "apartmentNumber": "391/42 Sư Vạn Hạnh",
            "ward": "Phường 12",
            "district": "Quận 10",
            "province": "TPHCM"
        },
        "defaultAddress": true
    }
]