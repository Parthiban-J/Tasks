import * as React from 'react';
import api from '../api/api';


const useUserDetail = (apiUrl: string) => {
    const [userData, setUserData] = React.useState<any | null>(null);
    const [loader, setLoader] = React.useState(true);
    const [error, setError] = React.useState<any | null>(false);
    const [success, setSucces] = React.useState<any | null>(false);

    const fetchUser = async () => {
        try {
            const response = await api.get(apiUrl);
            const data = response.data;
            const { results }: any = data;
            setUserData(results);
            setSucces("Success!");
            setLoader(false);
        } catch (error) {
            setLoader(false);
            setError("Something Went Wrong!")
        }
    }

    const handleClose = () => {
        setError(false);
        setSucces(false);
    }

    const handleRefreshFunc = () => {
        setLoader(true);
        fetchUser();
    }

    React.useEffect(() => {
        fetchUser();
    }, []);

    return { loader, userData, error, success, handleRefreshFunc, handleClose }
}

export default useUserDetail;