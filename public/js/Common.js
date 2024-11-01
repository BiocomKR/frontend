/** 요소 선택
 * @author jisoo
 * @param {String} el = 요소이름
 * @param {Element} text = (선택) 부모 요소 이름
 */
function getEl(el, text) {
    if (!el || "string" != typeof el)
        throw new TypeError(gfnGetErrMsg("문자열을 넣으세요"));
    return (text || document).querySelector(el)
}
/** 요소 전체 선택해서 배열로 반환
 * @author jisoo
 * @param {String} el = 요소이름
 * @param {Element} text = (선택) 부모 요소 이름
 */
function getElAll(el, text) {
    if (!el || "string" != typeof el)
        throw new TypeError(gfnGetErrMsg("문자열을 넣으세요"));
    return Array.prototype.slice.call((text || document).querySelectorAll(el))
}

/** json data 조회
 * @author jisoo
 * @param {String} name 
 * @returns (promise) data
 */
const jsonProvider = (url, options = {}) => {
    if(typeof url != 'string'){
        throw new error('문자열을 입력하세요');
    }
    
    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const fetchOptions = { ...defaultOptions, ...options };
    
    return fetch(url, fetchOptions).then(r => r.json());
}

/** 요소 생성 및 속성 부여
 * @author jisoo
 * @param {Element} el 
 * @param {Object} op 
 * @returns 
 */
const setAttr = (el, op) => {
    Object.entries(op).forEach(([k, v]) => {
        if (k == 'textContent') {
            el[k] = v;
        } else if (k == 'children') {
            v.forEach(ch => el.appendChild(ch));
        } else {
            el.setAttribute(k, v);
        }
    })
    return el;
}
const createEl = (el, op) => setAttr(document.createElement(el), op);

/** 사파리용 DATE() 타입 변환
 * @author jisoo
 * @param {String} date 
 * @returns {Date} 
 */
const DateReplace4Safari = (date)=>{
    if(!date) throw new Error('date is undefined or null;;; check PLZ')
    return new Date(date.replaceAll(' ','').replaceAll('.', '/'));
}

/** 날짜포매터
 * @author jisoo
 * @param {String} date 
 * @returns {Date} 
 */
const getFormattedDate = (dt, date) => {
    if (dt instanceof Date)  date = dt;
    else if (typeof dt === 'string')  date = DateReplace4Safari(dt);
    else  date = new Date();
    
    if(date == 'Invalid Date') throw new Error('날짜형식을 입력해야해요.....')
    return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
};

/** 시작기간과 종료기간간의 모든 날짜 반환 - default: yyyy.mm.dd
 * @author jisoo
 * @param {String || Date} sDt 
 * @param {String || Date} eDt 
 * @param {String} type (선택) 
 * @returns 
 */
const dateRange = (sDt, eDt, type='.')=>{
    const start = sapariDateReplace(`20${sDt}`);
    const end = sapariDateReplace(`20${eDt}`);
    const dateArray = [];
    let currDt = start;
    while(currDt <= end){
        const dt = new Date(currDt).getFullYear()+type
                    +(new Date(currDt).getMonth()+1)+type+new Date(currDt).getDate();
        dateArray.push(dt);
        currDt.setDate(currDt.getDate() +1);
    }
    return dateArray;
}
