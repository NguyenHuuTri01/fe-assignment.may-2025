import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { loadLocationData } from '../reducers/locationSlice';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        (result[item[key]] = result[item[key]] || []).push(item);
        return result;
    }, {});
};

const StreetInput = React.memo(({ value, onChange }) => (
    <input
        type="text"
        placeholder="Đường và số nhà"
        className="w-60 border-2 border-gray-400 pl-3 py-1"
        value={value}
        onChange={onChange}
    />
));

const SelectAddressFields = React.memo(({
    cities,
    districtMap,
    wardMap,
    selectedCity,
    selectedDistrict,
    setSelectedCity,
    setSelectedDistrict,
    setSelectedWard,
}) => {
    const filteredDistricts = useMemo(() => districtMap[selectedCity] || [], [selectedCity, districtMap]);
    const filteredWards = useMemo(() => wardMap[selectedDistrict] || [], [selectedDistrict, wardMap]);

    return (
        <div className="flex flex-wrap gap-4">
            <Select onValueChange={setSelectedCity}>
                <SelectTrigger className="w-60 border-2 border-gray-400 rounded">
                    <SelectValue placeholder="Tỉnh / Thành phố" />
                </SelectTrigger>
                <SelectContent>
                    {cities.map((city) => (
                        <SelectItem key={city.code} value={city.code}>{city.name_with_type}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select onValueChange={setSelectedDistrict} disabled={!selectedCity}>
                <SelectTrigger className="w-60 border-2 border-gray-400 rounded disabled:opacity-50">
                    <SelectValue placeholder="Quận / Huyện" />
                </SelectTrigger>
                <SelectContent>
                    {filteredDistricts.map((d) => (
                        <SelectItem key={d.code} value={d.code}>{d.name_with_type}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select onValueChange={setSelectedWard} disabled={!selectedDistrict}>
                <SelectTrigger className="w-60 border-2 border-gray-400 rounded disabled:opacity-50">
                    <SelectValue placeholder="Phường / Xã" />
                </SelectTrigger>
                <SelectContent>
                    {filteredWards.map((w) => (
                        <SelectItem key={w.code} value={w.code}>{w.name_with_type}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
});

export default function VietnamAddressField({ label, value, onChange }) {
    const dispatch = useDispatch();
    const { cities, districts, wards } = useSelector((state) => state.location, shallowEqual);

    const [districtMap, setDistrictMap] = useState({});
    const [wardMap, setWardMap] = useState({});

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [street, setStreet] = useState('');

    useEffect(() => {
        dispatch(loadLocationData());
    }, [dispatch]);

    useEffect(() => {
        setDistrictMap(groupBy(districts, 'parent_code'));
        setWardMap(groupBy(wards, 'parent_code'));
    }, [districts, wards]);

    useEffect(() => {
        const city = cities.find(c => c.code === selectedCity)?.name_with_type || '';
        const district = districts.find(d => d.code === selectedDistrict)?.name_with_type || '';
        const ward = wards.find(w => w.code === selectedWard)?.name_with_type || '';
        const full = [street, ward, district, city].filter(Boolean).join(', ');
        onChange(full);
    }, [selectedCity, selectedDistrict, selectedWard, street]);

    return (
        <div className="flex flex-col gap-2">
            <label className="font-medium">{label}</label>
            <SelectAddressFields
                cities={cities}
                districtMap={districtMap}
                wardMap={wardMap}
                selectedCity={selectedCity}
                selectedDistrict={selectedDistrict}
                setSelectedCity={setSelectedCity}
                setSelectedDistrict={setSelectedDistrict}
                setSelectedWard={setSelectedWard}
            />
            <StreetInput
                value={street}
                onChange={(e) => setStreet(e.target.value)}
            />
        </div>
    );
}
