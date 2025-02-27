import { lightningCssTransform } from "next/dist/build/swc/generated-native";
import { useLogStore } from "../stores/useLogStore";
import { Http2ServerRequest } from "http2";

const LogViewer = () => {
    const { log, clearLog } = useLogStore();

    return (
        <div>
            <h2>로그 목록</h2>
            <button onClick={clearLog}>로그 지우기</button>
            <ul>
                {
                    log.map((logItem, idx)=>{
                        <li key={idx}>
                            [{logItem.timestamp}] {logItem.type}: {logItem.message}
                        </li>
                    })
                }
            </ul>
        </div>
    )
}