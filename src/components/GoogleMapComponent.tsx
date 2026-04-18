import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { APIProvider } from '@vis.gl/react-google-maps'

const containerStyle = {
  width: '100%',
  height: '30vh',
}

const center = {
  lat: 1.3489136756926794,
  lng: 103.84104739827178,
}

const defaultZoom = 18

const GoogleMapComponent = () => {
  const mapApiKey = import.meta.env.VITE_PUBLIC_MAP_API_KEY ?? ''

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapApiKey,
  })

  return isLoaded ? (
    <APIProvider apiKey={mapApiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: 1.3489136756926794,
          lng: 103.84104739827178,
        }}
        zoom={defaultZoom}
        mapTypeId="satellite"
        tilt={0}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </APIProvider>
  ) : (
    <></>
  )
}

export default GoogleMapComponent
