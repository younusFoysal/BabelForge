
"use client";
import React, { createContext, useContext, useRef, useState } from "react";

const ScreenRecorderContext = createContext();

export const useScreenRecorder = () => {
    return useContext(ScreenRecorderContext);
};



export default ScreenRecorderProvider;
