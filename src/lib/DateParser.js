export default function DateParser(dateIn) {
    const date = new Date(dateIn);
    const dn = date.getTime();
    const now = Date.now();
    if(now - dn < 1000 * 60 * 60 * 24){ // 1일 이내
        if (now - dn > 1000 * 60 * 60) { // 1시간 이후
            return `${Math.floor((now-dn)/(1000*60*60))} 시간 전`;
        }
        else if (now - dn > 1000 * 60) {
            return `${Math.floor((now-dn)/(1000*60))} 분 전`;
        }
        else {
            return `${Math.floor((now-dn)/(1000))} 초 전`;
        }
    }
    return `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`;
}