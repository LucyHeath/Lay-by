import { useRef } from 'react'
import { useState, useEffect } from 'react'
import mapboxgl from '!mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoiYWp4cmgiLCJhIjoiY2xhc29zdWM1MjUyODNxbm01c2J3ZGRvYSJ9.YwGdljVH2McOr7cavCOd7Q'


export const MapBox = ({ location }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(0)
  const [lat, setLat] = useState(0)
  const [zoom, setZoom] = useState(3)


  useEffect(() => {
    setLat(location.latitude)
    setLng(location.longitude)
    console.log('location->', location.latitude)
    console.log('location->', location.longitude)
  }, [location])


  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    })
  }, [lng, lat])

  // useEffect(() => {
  //   if (!map.current) return // wait for map to initialize
  //   map.current.on('move', () => {
  //     setLng(map.current.getCenter().lng.toFixed(4))
  //     setLat(map.current.getCenter().lat.toFixed(4))
  //     setZoom(map.current.getZoom().toFixed(2))
  //   })
  // }, [])


  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default MapBox