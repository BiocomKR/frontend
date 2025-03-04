/***********************************
 * @description 유기산 리포트 생성 js
 * @author jisoo
 * @date 24-11-01
 * @update 
 ***********************************/

/**
 * @description print 기능 추가
 */
const print_mode = ()=>{
    document.body.classList.add('print-mode');
    window.print();
    setTimeout(() => {
        document.body.classList.remove('print-mode');
    }, 1000);
}
const solp_match = {
    '체중 조절 능력' : 'B1',
    '항산화 능력' : 'B2',
    '에너지 생성 능력' : 'B3',
    '신체 방어 능력' : 'B4',
    '장 건강' : 'B5',
    '정신건강 및 집중력' : 'B6',
    '지방산 대사' : 'G11',
    '탄수화물 대사' : 'G12',
    '단백질 대사' : 'G13',
    '케톤 대사' : 'G14',
    '항산화 기능' : 'G21',
    '뼈 건강' : 'G22',
    '에너지 대사' : 'G31',
    '비타민 대사' : 'G32',
    '유전자 발현 능력' : 'G33',
    '독소 노출' : 'G41',
    '세포 기능' : 'G42',
    '소화 흡수 기능' : 'G51',
    '장내 세균 균형' : 'G52',
    '유해균 증식' : 'G53',
    '장내 곰팡이/효모 균형' : 'G54',
    '신경 전달 기능' : 'G61',
    '인지 기능' : 'G62'
}
// const groups = {
//     '체중 조절 능력': [G11,G12,G13,G14], 
//     '항산화 능력': [G21,G22],
//     '에너지 생성 능력': [G31,G32,G33],
//     '신체 방어 능력': [G41,G42], 
//     '장 건강': [G51,G52,G53], 
//     '정신건강 및 집중력': [G61,G62]
// }

/**
 * 스코어맵 기반 차트 생성
 * @param {scoreMap} d 
 */
const createChart = (d)=>{
    const indicator = ['체중 조절 능력', '정신건강 및 집중력', '장 건강', '신체 방어 능력', '에너지 생성 능력', '항산화 능력'];
    const chartDom = getEl('.page-3 .chart');
    const scores = {'Ap':5,'A0':4.7,'A-':4.4,'Bp':4,'B0':3.7,'B-':3.4,'Cp':3,'C0':2.7,'C-':2.4,'Dp':2,'D0':1.7,'D-':1.4, 'F0':1}
    const data = indicator.map(e=>{return scores[d[e]['합계']]});
    echarts.init(chartDom).setOption({
            color: ['#15b3ac'], legend: {},
            radar: [{
                indicator: indicator.map(e=>{return {'text':e, 'max':5}}),
                center: ['51%','55%'],
                radius: 130,
                splitNumber: 5,
                axisName: { /*formatter: '【{value}】',*/  color: '#10b4ad', fontFamily: 'S-Core5', fontSize: 18, fontWeight: '600'},
                axisTick : { show : false},
                splitArea: {areaStyle: {color: ['#fff']}},
                axisLine: {lineStyle: {color: '#ffffff00' } },
                splitLine: {lineStyle: {color: '#b0b0b0' }}
                }],
            series: [{
                type: 'radar',
                emphasis: {lineStyle: { width: 10 }},
                data: [ {value: data,  areaStyle: { color: '#d9e8e2' }, symbolSize: 1,}, ]
                },]
        });
}

/**
 * 대분류별 랭크 반환(A+~F)
 * @param {Number} score 
 * @returns 
 */
// const fn_kingScoring = (score)=>{
//     if(score <= 13.6) return 'Ap';
//     else if(score <= 40.8) return 'A0';
//     else if(score <= 68) return 'A-';
//     else if(score <= 74.2) return 'Bp';
//     else if(score <= 84.6) return 'B0';
//     else if(score <= 95) return 'B-';
//     else if(score <= 100.8) return 'Cp';
//     else if(score <= 110.4) return 'C0';
//     else if(score <= 120) return 'C-';
//     else if(score <= 126.8) return 'Dp';
//     else if(score <= 138.4) return 'D0';
//     else if(score <= 150) return 'D-';
//     else return 'F0';
// }
// /**
//  * 점수별 랭크(A~F)반환 - 병원용 결과지 버전x - 소분류
//  * @param {Number} score 
//  * @returns 
//  */
// const fn_scoring = (score)=>{
//     if(score <= 68) return 'A';
//     else if(score <= 95) return 'B';
//     else if(score <= 120) return 'C';
//     else if(score <= 150) return 'D';
//     else return 'F';
// }
const fn_kingScoring = (score)=>{
    // score = Math.round(score)
    if(score >= 99) return 'Ap';
    else if(score >=90) return 'A0';
    else if(score >=81) return 'A-';
    else if(score >=72) return 'Bp';
    else if(score >=63) return 'B0';
    else if(score >=54) return 'B-';
    else if(score >=45) return 'Cp';
    else if(score >=36) return 'C0';
    else if(score >=31) return 'C-';
    else if(score >=20) return 'Dp';
    else if(score >=16) return 'D0';
    // else if(score == 0) return 'F0';
    else if(score < 0) return 'F0';
    else return 'D-';
}
/**
 * 점수별 랭크(A~F)반환 - 병원용 결과지 버전x - 소분류
 * @param {Number} score 
 * @returns 
 */
const fn_scoring = (score)=>{
    if(score >0.99) return 'A';
    else if(score >=0.7) return 'B';
    else if(score >=0.5) return 'C';
    // else if(score == 0) return 'F';
    else if(score < 0) return 'F';
    else return 'D';
}

/**
 * 전체 map 기반으로 대분류-중분류 점수 측정 ( 병원용 알고리즘 )
 * @param {Object} map 
 * @returns 
 */
// const calcScore = (map)=> {
//     const groups = Object.values(map).reduce((obj, { fst, scd}) => {
//         obj[fst] ??= {};
//         obj[fst][scd] = (obj[fst][scd] ?? 0) + 1;
//         return obj;
//     }, Object.create(null));
//     const res = Object.values(map).reduce((result, { fst, scd , value, way}) => {
//         result[fst] ??= { '합계': 0 };
//         const all = groups[fst][scd];
//         const valueToAdd = Math.abs(value) / all ;
//         result[fst][scd] = (result[fst][scd] ?? 0) + (valueToAdd < 0 ? 0 : valueToAdd);
//         result[fst]['합계'] += valueToAdd / Object.keys(groups[fst]).length;
//         return result;
//     }, Object.create(null));
//     return res;
// }


const calcRank = (s)=>{
    if(s > 0.99) return 1;
    else if(s >= 0.7) return 0.7;
    else if(s >= 0.5) return 0.5;
    else if(s < 0) return -0.2;
    else return 0.1; 
    // else if(s == 0) return 0;
    // else return 0.3; 
}
const calcScore = (map)=> {
    const groups = Object.values(map).reduce((obj, { fst, scd}) => {
        obj[fst] ??= {};
        obj[fst][scd] = (obj[fst][scd] ?? 0) + 1;
        return obj;
    }, Object.create(null));
    const res = Object.values(map).reduce((result, { fst, scd , value, way}) => {
        result[fst] ??= { '합계': 0 };
        const all = groups[fst][scd];
        const scoreMapping = {'blue' : 1, 'green' : 0.7, 'yell' : 0.5, 'orange' : 0.1 , 'red' : -0.2} ;
        // const scoreMapping = {'blue' : 1, 'green' : 0.7, 'yell' : 0.5, 'orange' : 0.3 , 'red' : 0} ;
        const valueToAdd = scoreMapping[fn_faceScoreing(value, way)] / all;
        result[fst][scd] = (result[fst][scd] ?? 0) + valueToAdd;
        return result;
    }, Object.create(null));
    Object.entries(res).forEach(([k,v])=>{
        const all =Object.keys(groups[k]).length;
        res[k]['합계'] = Object.entries(v).reduce((s,[key, value])=>{
            s += ((calcRank(value) * 100) / all); return s},0);
    })
    return res;
}

/**
 * 대분류 / 중분류 등급 반환
 * @param {} map 
 * @returns 
 */
const fn_setRanking = (map) =>{
    Object.keys(map).forEach((key)=>{
        Object.keys(map[key]).forEach(k=>{
            map[key][k] = k == '합계'? fn_kingScoring(map[key][k]) : fn_scoring(map[key][k])});
    })
    return map;
}

/**
 * 결과지 동적 생성 용 헬퍼 함수1
 * @param {} ugiCode 
 * @returns 
 */
const parseUGICode = (ugiCode) => {
    // UGI132 => { category: 1, group: 3, item: 2 }
    const match = ugiCode.match(/UGI(\d)(\d)(\d)/);
    if (!match) return null;
    
    return {
        category: match[1],
        group: match[2],
        item: match[3]
    };
};
/**
 * 결과지 동적 생성 용 헬퍼 함수2
 * @param {Object} code 
 * @param {Number} categoryNum 
 * @param {Number} groupNum 
 * @returns 
 */
const getUGIItemsByGroup = (code, categoryNum, groupNum) => {
    const a = Object.entries(code)
        .filter(([key]) => {
            const parsed = parseUGICode(key);
            return parsed && 
                parsed.category == categoryNum && 
                parsed.group == groupNum;
        })
    const b = a.map(([_, value]) => value);
    return b;
};



/**
 * 전체 대분류 등급 및 차트
 * @param {Element} page 
 * @param {String} userName 
 * @param {Object} obj 
 * @param {JSON} word 
 */
const createTitle = (page, userName, obj, word)=>{
    const indicator = ['체중 조절 능력', '항산화 능력','에너지 생성 능력','신체 방어 능력', '장 건강', '정신건강 및 집중력'];
    const p3_div1 = createEl('div',{'class':'title3 s-core6', 'children':[createEl('span', {'class':'name3','textContent': `${userName} 님의`})]});
    const p3_div2 = createEl('div',{'class':'chart'});
    const p3_div3 = createEl('div',{'class':'grade3'});
    
    [p3_div1, p3_div2, p3_div3].forEach(el=>{getEl('.page-area', page).appendChild(el)});
    const p3_span1 = createEl('span',{'class': 'span3','children':['A','B','C','D','F'].map(e=>createEl('span',{'textContent':e}))});
    const p3_tbl1 = createEl('table',{'class': 'table3','children':indicator.reduce((_frag, ind)=>{
        const rank = obj[ind]['합계'];
        const ment = (ind == 'B5')? word.king[ind][rank.substring(0,1)]: word.king.defalt[rank.substring(0,1)];
        const el_ment = createEl('td',{'textContent':ind + ment})
        const el_rank = createEl('td',{'class':rank})
        const tr = createEl('tr',{'children':[el_ment, el_rank]});
        _frag.push(tr);
        return _frag
    },[])});
    p3_div3.appendChild(p3_tbl1)
    p3_div1.appendChild(p3_span1)
    createChart(obj);
}

/**
 * 대분류용 표지 생성
 * @param {Element} page : getEl('.page-번호')
 * @param {Object} obj : scoreMap['대분류 명']
 * @param {Array} small :['중분류1','중분류2'....]
 */
const createCover = (page, obj ,small)=>{
    const rank = ['Ap','A0','A-','Bp','B0','B-','Cp','C0','C-','Dp','D0','D-','F0'];
    const div1 = createEl('div', {'class':'king-rank', 'children':[createEl('div',{'class':obj['합계']})]});
    const div2 = createEl('div', {'class':'rank-graph', 'children':rank.map(m=>createEl('div',{'class':obj['합계'] == m?'check':''}))});
    const small_rank = createEl('div', {'class':'small-rank', 'children': small.map(m=>createEl('div',{'class':obj[m]}))});
    const div3 = createEl('div', {'class':'small-ranking', 'children': [small_rank]});
    [div1, div2, div3].forEach(el=>{getEl('.page-area', page).appendChild(el)});
}



/**
 * 그래프 등급 기반 얼굴 보여주기
 * @param {String} f : 그래프 등급(rank) 
 * @returns 
 */
const fn_faceScoreing = (value)=>{
    const score = Math.abs(value);
    if(score <= 68) return 'blue';
    else if(score <= 120) return 'green';
    else if(score <= 135) return 'yell';
    else if(score <= 150) return 'orange';
    else return 'red';
}

/**
 * 그래프 등급별 설명을 위한 N, L, H, VL, VH 반환
 * @param {String} f : 그래프 등급(rank) 
 * @returns 
 */
const fn_graphScoreing = (value, way)=>{
    if(way == 1) {
        if(value < -120) return 'VL';
        else if(value < -68) return 'L';
        else if(value <= 68) return 'N';
        else if(value <= 120) return 'H';
        else return 'VH';
    }else {
        if(value <= 68) return 'N';
        else if(value <= 120) return 'H';
        else return 'VH';
    }

}

const setScore = (value, way) => {
    const v = value > 150 ? 150 : value < -150 ? -150 : value;
    const res =  way == 1? v >=  0 ? v / 150 * 50 + 50 : 50 + v/150 * 50 : v / 150 * 100;
    console.log(v, res)
    return res > 0.2 ? res : 0.2;
} 

const createTable = (page, ranking, arr, desc)=>{
    const div1 = createEl('div', {'class':'page-rank','children':[createEl('div',{'class':ranking})]})
    const div2 = createEl('div', {'class':'desc', 'children':[createEl('div',{'textContent':desc[ranking]})]})
    const ths = createEl('tr', {'children':['항 목','상 태','그 래 프'].map(m=>createEl('th',{'textContent':m}))})
    const ways = [];
    const tbl1 = arr.reduce((tbl, {name, value, way}, idx)=>{
        const FACE = {'blue':'정상', 'green':'주의', 'yell':'나쁨', 'orange':'나쁨', 'red':'나쁨'};
        const num = ['①','②','③','④','⑤','⑥','⑦','⑧'];
        const tr = createEl('tr');
        const graphScore = setScore(value, way) ;
        console.log(name, value, way, ' >>' ,graphScore)
        const graph = createEl('div',{'class':`graph-score way${way}`, 'children':[createEl('div',{'style':`width:${graphScore}%;`, class: 'graph-bar'})]});
        tr.appendChild(createEl('td',{'textContent':`${num[idx]} ${name}`}))
        tr.appendChild(createEl('td',{'class': fn_faceScoreing(value),'children':[createEl('div',{'textContent':FACE[fn_faceScoreing(value)]})]}))
        tr.appendChild(createEl('td',{'children':[graph]}))
        tbl.appendChild(tr);
        ways.push(way);
        return tbl;
    },document.createDocumentFragment());
    const div3 = createEl('div', {'class':'tables','children':[createEl('table',{'children':[ths, tbl1]})]});

    getEl('.page-area', page).appendChild(createEl('div',{'class':'graph-area'}));
    getEl('.page-area', page).classList.add('block');
    [div1, div2, div3].forEach((el)=>{getEl('.graph-area', page).appendChild(el);});
}

const createDesc = (page, arr, desc)=>{
    getEl('.page-area', page).appendChild(createEl('div',{'class':'desc-area'}));
    const priority = {'red': 1, 'orange': 2, 'yell': 3, 'green': 4, 'blue': 5};
    const divs = arr.sort((a,b)=>priority[fn_faceScoreing(a['value'])]-priority[fn_faceScoreing(b['value'])]).reduce((_fg, {name, en, value, way})=>{
        const div1 = createEl('div',{'class':'desc-title','children':[createEl('div', {'class':fn_faceScoreing(value)}),createEl('div',{'textContent':`${name} [${en}]`})]});
        const div2 = createEl('div',{'class':'desc-detail spoqa', 'textContent': desc[name][fn_graphScoreing(value, way)]});
        const div3 = createEl('div',{'class':'desc-block', 'children':[div1, div2]})
        _fg.appendChild(div3);
        return _fg;
    },document.createDocumentFragment());
    getEl('.desc-area', page).appendChild(divs);
    getEl('.page-area', page).classList.add('block');
}

const createBlank =(page)=>{
    getEl('.page-area', page).appendChild(createEl('div',{'class':'desc-blank'}));
}

// 영양제 그룹핑~
const fn_grouping = (ingrs, type3) =>{
    return [...new Set(ingrs.split(',').filter(e=>e).map(e=>{
        const lists = Object.entries(type3).reduce((arr,[k,v])=>{
            if(v.some(i=>i==e)) arr.push(k);
            return arr;
        },[])
        return lists;
    }).flat())].filter(e=>e!='').join(',').replace(',', ', ');
}

const setUserInfo = (page, data)=>{
    const nowDt = new Date();
    const {userName, userGender, userAge, userBirth, userPk, userDt} = data;
    document.title = `바이오 종합 대사기능 분석_${userName}님`;
    getEl('.report-name', page).textContent = `${userName} 님`;
    getEl('.user-gender span', page).textContent = `${userGender||''} / ${userAge||''}`;
    getEl('.user-birth span', page).textContent = birthFormatt(userBirth);
    getEl('.user-pk span', page).textContent = userPk;
    getEl('.user-dt span', page).textContent = userDt.substring(0,10);
    getEl('.user-report-dt span', page).textContent = getFormattedDate(nowDt);
}

/**
 * @description 페이지별 js
 * @param {*} data 
 */
const createPage = async (data, map, sol) =>{
    // code : 요소별 정보, word : 랭크 문구, desc : 요소별 문구
    const {code, word, desc} = map;
    // 사용자 정보
    const userName = data.userName;
    Object.keys(code).forEach(m=>{code[m].value = data[`${m}`];});

    // 점수 계산 및 랭킹 생성
    const scores = calcScore(code);
    const scoreMap = fn_setRanking(calcScore(code));
    //  결과지 크리에이터
    const pageCreators = {
        createTitle: ()=>{
            const page1 = getEl('.title-page');
            setUserInfo(page1, data);
        },
        createOverviewPage: () => {
            createTitle(getEl('.page-3'), userName, scoreMap, word);
        },
        createCategoryPage : ()=>{
            const category = [
                {name: '체중 조절 능력', startPage:  4, groups: [ // 체중 조절 능력
                    {code: '지방산 대사', itemCount: 3}, 
                    {code: '탄수화물 대사', itemCount: 2}, 
                    {code: '단백질 대사', itemCount: 7}, 
                    {code: '케톤 대사', itemCount: 1}
                ]}, 
                {name: '항산화 능력', startPage: 10, groups: [ // 항산화 능력
                    {code: '항산화 기능', itemCount: 1}, 
                    {code: '뼈 건강', itemCount: 1}
                ]}, 
                {name: '에너지 생성 능력', startPage: 13, groups: [ // 에너지 생성 능력
                    {code: '에너지 대사', itemCount: 8}, 
                    {code: '비타민 대사', itemCount: 7}, 
                    {code: '유전자 발현 능력', itemCount: 1}
                ]}, 
                {name: '신체 방어 능력', startPage: 19, groups: [ // 신체 방어 능력
                    {code: '독소 노출', itemCount: 7}, 
                    {code: '세포 기능', itemCount: 2}
                ]}, 
                {name: '장 건강', startPage: 23, groups: [ // 장 건강
                    {code: '장내 세균 균형', itemCount: 6}, 
                    {code: '소화 흡수 기능', itemCount: 6}, 
                    {code: '장내 곰팡이/효모 균형', itemCount: 6}
                ]}, 
                {name: '정신건강 및 집중력', startPage: 30, groups: [ // 정신건강 및 집중력
                    {code: '신경 전달 기능', itemCount: 3}, 
                    {code: '인지 기능', itemCount: 3}
                ]} 
            ]
            category.forEach(({name, startPage, groups}, b_idx) => {
                let currentPage = startPage;
                
                // 카테고리 커버 페이지 생성
                createCover(getEl(`.page-${currentPage}`), scoreMap[name], groups.map(g => g.code));
                currentPage++;
                 // 각 그룹별 상세 페이지 생성
                groups.forEach(({code: groupCode, itemCount}, g_idx) => {
                    const groupItems = getUGIItemsByGroup(code, b_idx+1, g_idx+1);
                    // 현재 페이지에 테이블 생성
                    const page = getEl(`.page-${currentPage}`);
                    createTable(page, scoreMap[name][groupCode], groupItems, word.small[groupCode]);
                     // 항목이 많은 경우 설명을 다음 페이지에
                    if (itemCount > 3) {
                        currentPage++;
                        createBlank(getEl(`.page-${currentPage}`));
                        createDesc(getEl(`.page-${currentPage}`), groupItems, desc);
                    } else {
                        createDesc(page, groupItems, desc);
                    }
                    
                    currentPage++;
                });
            });
        },
    };
    pageCreators.createCategoryPage();
    pageCreators.createTitle();
    pageCreators.createOverviewPage();

        /* 솔루션 페이지*/
    const {suppl, assist, suppl_match, sol_cover} = sol;
    const solp = getEl('.page.hide').cloneNode(true);
    solp.classList.remove('hide');
    solp.classList.add('solution');
    const category = [
        {name: '체중 조절 능력', startPage:  4, groups: [ // 체중 조절 능력
            {code: '지방산 대사', itemCount: 3}, 
            {code: '탄수화물 대사', itemCount: 2}, 
            {code: '단백질 대사', itemCount: 7}, 
            {code: '케톤 대사', itemCount: 1}
        ]}, 
        {name: '항산화 능력', startPage: 10, groups: [ // 항산화 능력
            {code: '항산화 기능', itemCount: 1}, 
            {code: '뼈 건강', itemCount: 1}
        ]}, 
        {name: '에너지 생성 능력', startPage: 13, groups: [ // 에너지 생성 능력
            {code: '에너지 대사', itemCount: 8}, 
            {code: '비타민 대사', itemCount: 7}, 
            {code: '유전자 발현 능력', itemCount: 1}
        ]}, 
        {name: '신체 방어 능력', startPage: 19, groups: [ // 신체 방어 능력
            {code: '독소 노출', itemCount: 7}, 
            {code: '세포 기능', itemCount: 2}
        ]}, 
        {name: '장 건강', startPage: 23, groups: [ // 장 건강
            {code: '장내 세균 균형', itemCount: 6}, 
            {code: '소화 흡수 기능', itemCount: 6}, 
            {code: '장내 곰팡이/효모 균형', itemCount: 6}
        ]}, 
        {name: '정신건강 및 집중력', startPage: 30, groups: [ // 정신건강 및 집중력
            {code: '신경 전달 기능', itemCount: 3}, 
            {code: '인지 기능', itemCount: 3}
        ]} 
    ]
    const allList = category.reduce((acc, {groups}, b_idx) => {
        groups.forEach(({itemCount}, g_idx) =>{
            const ar = [];
            for(let i=0;i<itemCount;i++){
                ar.push(getUGIItemsByGroup(code, b_idx+1, g_idx+1)[i]);
            }
            acc.push(ar);
        })
        return acc;
    }, []);
    const groups = category.reduce((acc, {name, groups}, idx)=>{
        acc[name] = allList[idx];
        return acc;
    },{})
    const indicator = ['지방산 대사','탄수화물 대사','단백질 대사','케톤 대사',
                    '항산화 기능','뼈 건강',
                    '에너지 대사','비타민 대사','유전자 발현 능력',
                    '독소 노출','세포 기능',
                    '장내 세균 균형', '소화 흡수 기능','장내 곰팡이/효모 균형',
                    '신경 전달 기능','인지 기능'];

    const type1 = Object.entries(scores).map(e=>[e[0],e[1]['합계']]).sort((x,y)=>x[1]<y[1]?-1:1).map(e=>[e[0], e[1]]).map(e=>e[0]);
    const type2 = Object.entries(scores).reduce((arr,i)=>{
        const obj = Object.entries(i[1]).filter(e=>e[0]!='합계');
        arr = arr.concat(obj);
        return arr;
    },[]).sort((x,y)=>x[1]<y[1]?-1:1).map(([k,rank])=>[k,fn_scoring(rank)]);
    // type3 => 대분류별 영양소 끍끍
    const type3 = allList.reduce((obj, e, idx)=>{
        const data = e.map(({name, value, way})=>suppl[name][fn_graphScoreing(value, way)]);
        obj[indicator[idx]]=[...new Set(data.flat())].filter((e)=>e!='없음');
        return obj;
    },{});
    const type4 = type2.map(([k,v])=>{ return [k, v, [...new Set(Object.values(type3[k]).flat())].filter(e=>e!='').join(',')] });
    
    const ingredient = [...new Set(Object.values(type3).flat())].filter(e=>e!='').join(',');
    const assistResult = await Promise.all(
        type4.filter(([,,i]) => i !== "").map(async (e) => {
            const supple = await jsonProvider(`/api/UGIReport/suppl?supple=${e[2]}`);
            return supple;
        })
    );
    const supplement = assistResult.reduce((ob, supple, _, arr)=>{
        if(ob.length < 7) {
            supple.results.forEach((s, idx)=>{
                const limit = arr.length < 3 ? 6:3;
                if(!ob.some(({name})=>name == s.name) && idx <= limit) ob.push(s)
                })
        }
        return ob;
    }, []).filter((_,idx)=>idx < 6);
    // console.log(supplement)
    const suppResult = supplement;
    /** 솔루션 표지 */
    const sol_1_1 = solp.cloneNode(true);
    sol_1_1.classList.add('sol-2');
    getEl('.page-area',sol_1_1).appendChild(createEl('div',{'children':[userName+'님', '종합 대사기능 분석'].map((n)=>createEl('div',{'textContent':n}))}));
    getEl('.report-area').appendChild(sol_1_1);
    /**대분류 */
    const sol_2 = solp.cloneNode(true);
    sol_2.classList.add('sol-3');
    const type1_tbl = type1.reduce((_f, k, idx)=>{
        const tr = createEl('tr',{'class':scoreMap[k]['합계'], 'children':[k].map(e=>createEl('td',{'textContent': e}))})
        _f.appendChild(tr);
        return _f;
    },createEl('table',{'class':'major'}));
    getEl('.page-area',sol_2).appendChild(createEl('div',{'children':[createEl('div',{'textContent':userName+'님의 건강 적신호 순위'})]}));
    getEl('.page-area',sol_2).appendChild(createEl('div',{'class':'sol-type1','children':[type1_tbl]}));
    getEl('.report-area').appendChild(sol_2);
    /**중분류 */
    const sol_3 = solp.cloneNode(true);
    sol_3.classList.add('sol-4');
    const type2_tbl = type2.reduce((_f, [k, rank], idx)=>{
        const tr = createEl('div',{'class':'col_'+rank, 'children':[k,rank, type3[k].filter((_,i)=>i<10).join(', ')].map(e=>createEl('div',{'textContent': e||'없음'}))})
        _f.appendChild(tr);
        return _f;
    },createEl('div',{'class':'sub'}));
    getEl('.page-area',sol_3).appendChild(createEl('div',{'children':[createEl('div',{'textContent':userName+'님의 대사기능 개선 우선순위'})]}));
    getEl('.page-area',sol_3).appendChild(createEl('div',{'class':'sol-type1','children':[type2_tbl]}));
    getEl('.report-area').appendChild(sol_3);
    /**영양제 추천 */
    const sol_4 = solp.cloneNode(true);
    sol_4.classList.add('sol-5');
    if(suppResult.length){ // 영양제 하나라도 있으면
        const type3_tbl = suppResult.reduce((_f, {name, detail, ingr, link, ingrs})=>{
            const grouping = createEl('div',{'children':['도움이 되는 대사 기능 : ', fn_grouping(ingrs, type3)].map(e=>createEl('span',{'textContent':e}))});
            const div1 = createEl('div',{'class':'left-sup', 'children':[name, detail, '성분 : '+ingr].map(e=>createEl('div',{'textContent': e})).concat(grouping)})
            const div2 = createEl('div',{'class':'right-sup', 'children':['제품 확인하기', link ].map(e=>createEl('div',{'textContent': e}))})
            const div = createEl('div',{'class':'supple-detail '+suppl_match[name],'children':[div1, div2]});
            _f.appendChild(div);
            return _f;
        },createEl('div',{'class':'supple'}));
        getEl('.page-area',sol_4).appendChild(createEl('div',{'children':[createEl('div',{'textContent':userName+'님께 필요한 성분을 '+suppResult.length+'개로 압축했어요'})]}));
        getEl('.page-area',sol_4).appendChild(createEl('div',{'class':'sol-type1','children':[type3_tbl]}));
        getEl('.report-area').appendChild(sol_4);
    }else{
        //d영양제 암거도 없을떼
        sol_4.classList.add('a-supple');
        getEl('.report-area').appendChild(sol_4);
    }
    /**상담 */
    const counsle = solp.cloneNode(true);
    counsle.classList.add('counsel');
    getEl('.report-area').appendChild(counsle);
    
    /** 솔루션 페이지 동적 생성 */
    const sol_list = Object.entries(scoreMap).reduce((acc, [k, v]) => {
        const filtered = Object.entries(v).reduce((subAcc, [sub, rank])=>{
            if(sub !== '합계' && rank !== 'A') subAcc[sub] = rank;
            return subAcc;
        },{});
        if (Object.keys(filtered).length)  acc[k] = { ...filtered, 합계: v['합계'] };
        return acc;
    }, {});
    
    if(Object.entries(sol_list).length){
        const divList = (arr)=> createEl('div',{'class':'solc-word','children':arr.map(e=> createEl('div',{'textContent':e}))});
        

        const pages = type1.reduce((_f, t)=>{
            if(!sol_list[t]) return _f;
            const title_p = solp.cloneNode(true);
            const g_group = category.filter(({name})=>name == t).flatMap(({groups})=>groups).map(({code})=>code);
            title_p.classList.add(solp_match[t]);
            title_p.classList.add('living-cover');
            getEl('.page-area',title_p).appendChild(createEl('div',{'class': sol_list[t]['합계'],'children':[divList(sol_cover[t])]}));
            getEl('.page-area',title_p).appendChild(createEl('div',{'class':'min-sol','children':g_group.map(e=>createEl('div',{'class':scoreMap[t][e], 'data-group' : e}))}));
            
            const sol_pages = Object.entries(sol_list[t]).filter(([k,_])=>k!='합계').reduce((_frag,[k,rank])=>{
                const res_p = solp.cloneNode(true);
                res_p.classList.add(solp_match[k]);
                res_p.classList.add('sol-living');
                getEl('.page-area',res_p).appendChild(createEl('div',{'class': rank}));
                _frag.appendChild(res_p);
                return _frag
            },document.createDocumentFragment())
    
            _f.appendChild(title_p);
            _f.appendChild(sol_pages);
            return _f;
        },document.createDocumentFragment());
        getEl('.report-area').appendChild(pages);
    }else{
        const sol_A = solp.cloneNode(true);
        sol_A.classList.add('a-living');
        getEl('.report-area').appendChild(sol_A);
    }

    console.log(scores, scoreMap);

}

const load = async () => {
    window.jsPDF = window.jspdf.jsPDF;
    // 페이지 생성
    for(idx=2;idx<=34;idx++){
        const page = getEl('.page.hide').cloneNode(true);
        page.classList.remove('hide');
        page.classList.add('result');
        page.classList.add(`page-${idx}`);
        getEl('.report-area').appendChild(page);
    }

    // 데이터 로드
    try {
        const username = document.getElementById('hiddenUsername').value;
        const data = await jsonProvider(`/api/UGIReport?username=${encodeURIComponent(username)}`);
        const dataEl = await jsonProvider(`/json/Ugisan.json`);
        const sol = await jsonProvider(`/json/Ugisan_Sol.json`);
        if (data.error) throw new Error(data.error);
        createPage(data.results[0], dataEl, sol);
    } catch (error) {
        console.error('데이터 로딩 실패:', error);
        if(error == '사용자 이름이 없습니다.'){
            alert('차트번호가 없거나, 사용자 정보가 존재하지 않습니다. \n다시 확인해주세요.')
            window.open('/report/insertInfo?analysis=UGI');
        }else{
            alert('시스템 오류 입니다. \n전산 관련 문의는 연구개발팀에 문의해주세요. 내선:0981')
            window.open('/report/insertInfo?analysis=UGI');
        }
    }
    getEl('.back').addEventListener('click',()=>{window.open('/report/insertInfo?analysis=UGI')})

    /**
     * print 기능 eventListener
     */
    document.querySelector('.header-btn').addEventListener('click', async ({target}) => {
        const report = getEl('.report-area');
        const userName = getEl('.report-name').textContent;
        const date = getEl('.user-report-dt span').textContent.replaceAll('-','').substr(2);
        const ids = getEl('.user-pk span').textContent;

        if(target.classList == 'print'){
            report.classList.remove('solution')
            report.classList.remove('result')
            document.title = `바이오 종합 대사기능 분석_${userName}_${date}`;
            print_mode();
        }
        if(target.classList == 'print-result'){ // 결과지만
            report.classList.remove('solution')
            report.classList.add('result')
            document.title = `${date}_${userName}_${ids}_바이오 종합 대사기능 분석 결과`;
            print_mode();
        }
        if(target.classList == 'print-solution'){ //솔루션만
            report.classList.add('solution')
            report.classList.remove('result')
            document.title = `${date}_${userName}_${ids}_솔루션`;
            print_mode();
        }
        //////////////////////////////////////////////////////////////////
        if (target.classList.contains('pdf-save')) {
            try {
                const response = await fetch('/api/generate-pdf', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: userName.replace(' 님', ''), // '님' 제거
                        reportType: report.classList.contains('solution') ? 'solution' : 'result'
                    })
                });

                const data = await response.json();
                if (data.success) {
                    const link = document.createElement('a');
                    link.href = data.downloadUrl;
                    link.download = data.downloadUrl.split('/').pop();
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    console.error('PDF 생성 실패:', data.error);
                    alert(`PDF 생성 실패: ${data.error}`);
                }
            } catch (error) {
                console.error('PDF 저장 오류:', error);
                alert('PDF 저장 중 오류가 발생했습니다. 개발자 도구의 콘솔을 확인해주세요.');
            }
            return;
        }
    });
}

window.addEventListener('load', load);