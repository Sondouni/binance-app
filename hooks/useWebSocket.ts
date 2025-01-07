import {useEffect, useRef} from "react";
import {AppState} from "react-native";

type socketProps = {
    url: string;
    onMessage: (message: any) => void;
}

export const useWebSocket = ({onMessage,url}:socketProps) => {

    const socketInstance = useRef<WebSocket | null>(null);

    const connectSocket = () => {
        if(socketInstance.current===null){
            socketInstance.current = new WebSocket(url);
            socketEvent();
        }
    }

    const socketEvent = () => {
        if(socketInstance.current){
            socketInstance.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                onMessage(data);
            }
        }
    }

    const socketClose = () => {
        socketInstance.current?.close();
        socketInstance.current = null;
    }

    useEffect(() => {
        connectSocket();
        const appStateSub = AppState.addEventListener('change',(state)=>{
            if(state==='background'){
                socketClose();
            }else if(state==='active'){
                connectSocket();
            }
        });
        return () => {
            appStateSub.remove();
            socketClose();
        }
    }, []);

    return null;
}
