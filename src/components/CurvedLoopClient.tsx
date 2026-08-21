"use client";

import dynamic from 'next/dynamic';

const CurvedLoop = dynamic(() => import('./CurvedLoop'), { ssr: false });

export default CurvedLoop;
