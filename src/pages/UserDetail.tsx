import * as React from 'react';
import useUserDetail from '../hooks/useUserDetail';
import { Button, Card, Backdrop, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, CircularProgress } from '@mui/material';

import { red } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import moment from 'moment';
import SnackbarMessage from '../components/toast';


const UserDetail: React.FC = () => {
    const apiUrl = '/api';
    const { loader, userData, error, success, handleRefreshFunc, handleClose } = useUserDetail(apiUrl);

    const handleUserLocation = (coordinates: any) => {
        const googleMapsUrl = `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`;
        window.open(googleMapsUrl, '_blank');
    }

    return (
        <div>
            {loader ? (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open
                >
                    <CircularProgress color="success" />
                </Backdrop>
            ) : (<>{userData && userData.length > 0 ? userData.map((elm: any, index: any) => {
                const { name, email, picture, location, dob }: any = elm;
                const { coordinates }: any = location;

                return (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                                <Avatar src={picture.medium} sx={{ bgcolor: red[500] }} aria-label="recipe">

                                </Avatar>
                            }
                            title={`${name.first} ${name.last}`}
                            subheader={dob.date && moment(dob.date).format('MMMM DD YYYY')}
                            action={
                                <IconButton aria-label="add to favorites">
                                    <LocationOnIcon onClick={() => handleUserLocation(coordinates)} />
                                </IconButton>
                            }
                        />
                        <CardContent style={{ textAlign: "left" }}>
                            <Typography variant="body2" color="text.secondary" style={{ margin: "5px 0px" }}>
                                Email: {email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ margin: "5px 0px" }}>
                                Address: <div className="description">{location.street.number} {location.street.name}</div>
                                <div className='description2'>{location.city} {location.state} {location.country} <br />{location.postcode}</div>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ margin: "5px 0px" }}>
                            Phone: {elm.phone}
                            </Typography>
                        </CardContent>
                        <iframe style={{ border: 'none' }} width="100%" height="200" src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319`}
                        ></iframe>
                        <CardActions disableSpacing>
                            <Button style={{ marginTop: '20px' }} onClick={handleRefreshFunc}>Refresh</Button>
                        </CardActions>
                    </Card>
                )
            }) : 'No User Found'}
            </>)
            }
            {(error || success) && <SnackbarMessage open={true} message={error || success} severity={error ? 'error' : 'success'} handleClose={handleClose} />}
        </div>
    );
}

export default UserDetail;