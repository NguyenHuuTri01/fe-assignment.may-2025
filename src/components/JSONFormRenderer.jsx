import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VietnamAddressField from './VietnamAddressField';
import { saveFormData, resetFormData } from '../reducers/formSlice';

export default function JSONFormRenderer() {
    const dispatch = useDispatch();
    const savedData = useSelector((state) => state.form.data);

    const [schemaText, setSchemaText] = useState(`
        {
            "type": "object",
            "properties": {
            "name": { "type": "string", "title": "Họ và tên" },
            "address": { "type": "string", "title": "Địa chỉ", "format": "vietnam-address" },
            "email": { "type": "string", "title": "Email" }
            },
            "required": ["name", "address", "email"]
        }
    `);
    const [schema, setSchema] = useState(null);
    const [formData, setFormData] = useState(savedData || {});

    useEffect(() => {
        setFormData(savedData || {});
    }, [savedData]);

    const handleParseSchema = () => {
        try {
            const parsed = JSON.parse(schemaText);
            setSchema(parsed);
        } catch (err) {
            alert('Invalid JSON Schema');
        }
    };

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        dispatch(saveFormData(formData));
    };

    const handleReset = () => {
        dispatch(resetFormData());
        setFormData({});
    };

    const renderField = (key, definition) => {
        if (definition.format === 'vietnam-address') {
            return (
                <VietnamAddressField
                    key={key}
                    label={definition.title}
                    value={formData[key] || ''}
                    onChange={(val) => handleChange(key, val)}
                />
            );
        }
        if (definition.type === 'string') {
            return (
                <div key={key} className="flex flex-col gap-1">
                    <label className="font-medium">{definition.title}</label>
                    <input
                        className='border-2 border-gray-400 pl-3 py-1 rounded-[5px]'
                        value={formData[key] || ''}
                        onChange={(e) => handleChange(key, e.target.value)}
                    />
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-1 mx-auto space-y-4 flex h-[640px]">
            <div className='w-[50%] h-full'>
                <textarea
                    className="w-full h-[90%] p-2 border border-gray-300 rounded-md"
                    placeholder="Paste your JSON Schema here"
                    value={schemaText}
                    onChange={(e) => setSchemaText(e.target.value)}
                ></textarea>
                <button
                    onClick={handleParseSchema}
                    type="button"
                    className="mt-2 cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >Render Form</button>
            </div>
            <div className='w-[50%] pl-2'>
                {schema && schema.properties && (
                    <div className="space-y-4">
                        {Object.entries(schema.properties).map(([key, def]) => renderField(key, def))}
                    </div>
                )}

                {schema && (
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={handleSave}
                            type="button"
                            className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >Lưu</button>
                        <button
                            type="button"
                            className="cursor-pointer focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                            onClick={handleReset}
                        >Reset</button>
                    </div>
                )}
                <div className='mt-2'>
                    <div>Current Value:</div>
                    <pre>
                        {JSON.stringify(JSON.parse(localStorage.formData), null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
}
