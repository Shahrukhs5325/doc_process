import React from 'react';


type UserContextProviderType = {
    children?: any;
}

type UserType = {
    address: string;
    cityName: string;
    correlationId: number;
    countryId: number;
    customerId: number;
    customerName: string;
    email: string;
    employeeId: string;
    errorMsg: string;
    phoneNo: string;
    pinCode: string;
    stateId: number;
    statusId: number;
    statusName: number;
    userName: string;
    userTypeId: number;
}


type UserContextType = {
    user?: any;
    setUser?: any;
    location?: any;
    setLocation?: any;
    appLanguage?: any;
    setAppLanguage?: any;
    geoLocation?: any;
    seGeoLocation?: any;
}

export const UserContext = React.createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderType) => {

    const [user, setUser] = React.useState<UserType | null>(null);


    React.useEffect(() => {
        getLangDataAsyncStorage();
    }, []);

    const getLangDataAsyncStorage = async () => {
        try {

        } catch (e) {
            // read error
        }
    }

    return (
        <UserContext.Provider value= {{ user, setUser, }}>
    { children }
    < /UserContext.Provider>
    );
}
