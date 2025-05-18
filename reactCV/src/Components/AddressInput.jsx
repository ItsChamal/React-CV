
import { useEffect, useRef, useState } from 'react';

export default function AddressInput({ value, onSelect }) {
  const inputRef = useRef(null);
  const [displayAddress, setDisplayAddress] = useState(value || '');

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps API is not loaded correctly");
      return;
    }

    try {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, { 
        types: ['address'],
        fields: ['formatted_address', 'geometry']
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          console.error("No geometry returned from Google Maps");
          return;
        }

        const addressData = {
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        setDisplayAddress(place.formatted_address);
        onSelect(addressData);
      });
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
    }

    return () => {
      // Cleanup if needed
    };
  }, [onSelect]);

  const handleInputChange = (e) => {
    setDisplayAddress(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      value={displayAddress}
      onChange={handleInputChange}
      placeholder="Start typing address..."
      className="w-full rounded-lg border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-4 py-3 outline-none transition-all"
    />
  );
}
