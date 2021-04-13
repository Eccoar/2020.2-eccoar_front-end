import { Circle, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LatLng, Marker as LeafLetMarker } from 'leaflet';

interface ILocationMarker {
	maxRadius: number;
	position: LatLng | null;
	setPosition: React.Dispatch<React.SetStateAction<LatLng | null>>;
}

const LocationMarker: React.FC<ILocationMarker> = ({
	maxRadius,
	position,
	setPosition,
}) => {
	const [center, setCenter] = useState<LatLng | null>(position);

	const map = useMap();
	const markerRef = useRef<LeafLetMarker | null>(null);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((result) => {
			const latlng = new LatLng(
				result.coords.latitude,
				result.coords.longitude,
			);
			setCenter(latlng);
			setPosition(latlng);
			map.setView(latlng, 15);
		});
	}, []);

	const markerEvents = useMemo(
		() => ({
			dragend() {
				if (center !== null) {
					const marker = markerRef.current;
					if (center !== null && position !== null) {
						if (
							marker !== null &&
							Math.abs(center.distanceTo(marker.getLatLng())) <=
								maxRadius
						) {
							setPosition(marker.getLatLng());
						} else {
							marker?.setLatLng(center);
						}
					}
				} else {
					navigator.geolocation.getCurrentPosition((result) => {
						setCenter(
							new LatLng(
								result.coords.latitude,
								result.coords.longitude,
							),
						);
					});
				}
			},
		}),
		[],
	);

	return position === null ? null : (
		<>
			<Marker
				position={position}
				draggable={true}
				eventHandlers={markerEvents}
				ref={markerRef}
			>
				<Popup>Você está aqui</Popup>
			</Marker>
			{center && <Circle center={center} radius={maxRadius} />}
		</>
	);
};

export default LocationMarker;
