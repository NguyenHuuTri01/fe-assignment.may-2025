import React from 'react'
import Breadcrumb from './Breadcrumb'

export default function Header({ contentKey }) {
    return (
        <div className="border-b border-gray-300 py-4 bg-white shadow-sm">
            <Breadcrumb contentKey={contentKey} />
        </div>
    )
}
