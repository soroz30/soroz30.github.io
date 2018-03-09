import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import googleMapStyle from '../../data/googleMapStyle';

const LocationMap = withScriptjs(withGoogleMap((props) => {
    return (
        <GoogleMap
            defaultZoom={9}
            defaultCenter={{ lat: 52.237049, lng: 21.017532 }}
            defaultOptions={{ styles: googleMapStyle }}
        >
            {props.isMarkerShown && <Marker position={{ lat: 52.237049, lng: 21.017532 }} />}
        </GoogleMap>
    )
}))

export default LocationMap;