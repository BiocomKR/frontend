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
const [B1, B2, B3, B4, B5, B6] = ['체중 조절 능력', '항산화 능력','에너지 생성 능력','신체 방어 능력', '장 건강', '정신건강 및 집중력'];
const [G11,G12,G13,G14,G21,G22,G31,G32,G33,G41,G42,G51,G52,G53,G54,G61,G62] = ['지방산 대사','탄수화물 대사','단백질 대사','케톤 대사','항산화 기능','뼈 건강','에너지 대사','비타민 대사','유전자 발현 능력','독소 노출','세포 기능','소화 흡수 기능','장내 세균 균형','유해균 증식','장내 곰팡이/효모 균형','신경 전달 기능','인지 기능'];
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
const groups = {
    '체중 조절 능력': [G11,G12,G13,G14], 
    '항산화 능력': [G21,G22],
    '에너지 생성 능력': [G31,G32,G33],
    '신체 방어 능력': [G41,G42], 
    '장 건강': [G51,G52,G53,G54], 
    '정신건강 및 집중력': [G61,G62]
}
const s_groups = {
    '지방산 대사':3 ,'탄수화물 대사':2 ,'단백질 대사':7 ,'케톤 대사':1 ,'항산화 기능':1 ,'뼈 건강':1 ,'에너지 대사':8 ,'비타민 대사':7 ,'유전자 발현 능력':1 ,'독소 노출':7,'세포 기능': 2,'소화 흡수 기능':6 ,'장내 세균 균형':4 ,'유해균 증식':2 ,'장내 곰팡이/효모 균형': 6,'신경 전달 기능': 3,'인지 기능':3
}

const INDICATOR = [B1, B6, B5, B4, B3, B2];
const INDICATOR2 = [B1, B2, B3, B4, B5, B6];
const INDICATOR3 = [G11,G12,G13,G14,G21,G22,G31,G32,G33,G41,G42,G51,G52,G53,G54,G61,G62];
const UGISAN = ['UGI111', 'UGI112', 'UGI113', 'UGI121', 'UGI122', 'UGI131', 'UGI132', 'UGI133', 'UGI134', 'UGI135', 'UGI136', 'UGI137', 'UGI141', 'UGI211', 'UGI221', 'UGI311', 'UGI312', 'UGI313', 'UGI314', 'UGI315', 'UGI316', 'UGI317', 'UGI318', 'UGI321', 'UGI322', 'UGI323', 'UGI324', 'UGI325', 'UGI326', 'UGI327', 'UGI331', 'UGI411', 'UGI412', 'UGI413', 'UGI414', 'UGI415', 'UGI416', 'UGI417', 'UGI421', 'UGI422', 'UGI511', 'UGI512', 'UGI513', 'UGI514', 'UGI515', 'UGI516', 'UGI521', 'UGI522', 'UGI523', 'UGI524', 'UGI531', 'UGI532', 'UGI541', 'UGI542', 'UGI543', 'UGI544', 'UGI545', 'UGI546', 'UGI611', 'UGI612', 'UGI613', 'UGI621', 'UGI622', 'UGI623'];
const KINGSCORE = ['Ap','A0','A-','Bp','B0','B-','Cp','C0','C-','Dp','D0','D-','F0'];
const SMALLSCORE = ['A','B','C','D','F'];
const FACE = {'blue':'정상', 'yell':'주의', 'red':'나쁨'};
/**
 * 스코어맵 기반 차트 생성
 * @param {scoreMap} d 
 */
const createChart = (d)=>{
    const chartDom = getEl('.page-3 .chart');
    const scores = {'Ap':5,'A0':4.7,'A-':4.4,'Bp':4,'B0':3.7,'B-':3.4,'Cp':3,'C0':2.7,'C-':2.4,'Dp':2,'D0':1.7,'D-':1.4, 'F0':1}
    const data = INDICATOR.map(e=>{return scores[d[e]['합계']]});
    echarts.init(chartDom).setOption({
            color: ['#15b3ac'], legend: {},
            radar: [{
                indicator: INDICATOR.map(e=>{return {'text':e, 'max':5}}),
                center: ['51%','55%'],
                radius: 130,
                splitNumber: 5,
                axisName: { /*formatter: '【{value}】',*/  color: '#10b4ad', fontFamily: 'S-Core5', fontSize: 18, fontWeight: '600'},
                axisTick : { show : false},
                splitArea: {areaStyle: {color: ['#fff'],/*shadowColor: '#FFE434',shadowBlur: 10*/}},
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
 * 가중치
 */
const weights = INDICATOR3.reduce((obj, i, idx)=>{
    // const weight = [3,2,3,2,5,5,4,4,2,6,4,2.5,2.5,2.5,2.5,5,5];
    const weight = [2.5,2.5,2.5,2.5, 5,5, 3.5,3.5,3, 5,5, 2.5,2.5,2.5,2.5, 5,5];
    obj[i] = weight[idx];
    return obj;
},{});

/**
 * 대분류별 랭크 반환(A+~F)
 * @param {Number} score 
 * @returns 
 */
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
    else if(score ==0) return 'F0';
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
    else if(score == 0) return 'F';
    else return 'D';
}


/**
 * 그래프 등급 기반 얼굴 보여주기
 * @param {String} f : 그래프 등급(rank) 
 * @returns 
 */
const fn_faceScoreing = (f)=>{
    const blue = ['n1','n2','n3','n4','n5','n6','m1','m2','m3','p1','p2','p3'];
    const yell = ['n7','n8','m4','p4'];
    const red  = ['n9','n10','m5','p5'];
    if(blue.some(m=> m==f)) return 'blue';
    else if(yell.some(m=> m==f)) return 'yell';
    else return 'red';
}

/**
 * 그래프 등급별 설명을 위한 N, L, H, VL, VH 반환
 * @param {String} f : 그래프 등급(rank) 
 * @returns 
 */
const fn_graphScoreing = (f)=>{
    const N = ['n1','n2','n3','n4','n5','n6','m1','m2','m3','p1','p2','p3'];
    const L = 'm4'
    const H = ['n7','n8','p4'];
    const VL = 'm5'
    const VH = ['n9','n10','p5'];

    if(f == L) return 'L';
    else if(f == VL) return 'VL';
    else if(H.some(m=> m==f)) return 'H';
    else if(VH.some(m=> m==f)) return 'VH';
    else return 'N';
}

const calcScore2 = (s)=>{
    if(s > 0.99) return 1;
    else if(s >= 0.7) return 0.7;
    else if(s >= 0.5) return 0.5;
    else if(s == 0) return 0;
    else return 0.3; 
}


/**
 * 전체 map 기반으로 대분류-중분류 점수 측정 ( 병원용 알고리즘 )
 * @param {Object} map 
 * @param {Object} weights 
 * @returns 
 */
// const calcScore_old = (map, weights)=> {
//     const res = Object.values(map).reduce((result, { fst, scd, value, score, name , rank }) => {
//         result[fst] ??= { '합계': 0 };
//         const _score = score*10;
//         const valueToAdd = (_score - _score * value * 0.5) < 0? 0 : (_score - _score * value * 0.5);
//         result[fst][scd] = (result[fst][scd] ?? 0) + valueToAdd;
//         result[fst]['합계'] += (valueToAdd * (weights[scd] ?? 1) / 10);
//         return result;
//     }, Object.create(null));
//     return res;
// }

const calcScore = (map, weights)=> {
    const res = Object.values(map).reduce((result, { fst, scd,  name , value, score , rank }) => {
        result[fst] ??= { '합계': 0 };
        // const _score = score*10;
        const _score = {'blue' : 1, 'yell' : 0.5, 'red' : 0.3 } ;
        const _score2 = (rk)=>{
            if(['n1','n2','n3','n4','n5','n6'].some(e => e == rk)) return 1;
            else if(rk == 'n7') return 0.7;
            else if(rk == 'n8') return 0.5;
            else if(rk == 'n9') return 0.3;
            else if(rk == 'n10') return 0.3;
        };
        const score_f = ((score*10) - (score*10) * value * 0.4) ;
        console.log(name, score_f);
        const all = s_groups[scd];
        const valueToAdd = all == 1? _score2(rank) : _score[fn_faceScoreing(rank)]/all;
        result[fst][scd] = (result[fst][scd] ?? 0) + (score_f < 0 ? 0 : valueToAdd);
        return result;
    }, Object.create(null));
    Object.entries(res).forEach(([k,v])=>{
        res[k]['합계'] = Object.entries(v).reduce((s,[key, value])=>{
            s += (calcScore2(value) * (weights[key] ?? 1) *10); return s},0);
    })
    return res;
}


const fn_setRanking = (map) =>{
    Object.keys(map).forEach((key)=>{
        Object.keys(map[key]).forEach(k=>{
            map[key][k] = k == '합계'? fn_kingScoring(map[key][k]) : fn_scoring(map[key][k])});
    })
    return map;
}

/**
 * 전체 대분류 등급 및 차트
 * @param {Element} page 
 * @param {String} userName 
 * @param {Object} obj 
 * @param {JSON} word 
 */
const createTitle = (page, userName, obj, word)=>{
    const p3_div1 = createEl('div',{'class':'title3 s-core6', 'children':[createEl('span', {'class':'name3','textContent': `${userName} 님의`})]});
    const p3_div2 = createEl('div',{'class':'chart'});
    const p3_div3 = createEl('div',{'class':'grade3'});
    
    [p3_div1, p3_div2, p3_div3].forEach(el=>{getEl('.page-area', page).appendChild(el)});
    const p3_span1 = createEl('span',{'class': 'span3','children':['A','B','C','D','F'].map(e=>createEl('span',{'textContent':e}))});
    const p3_tbl1 = createEl('table',{'class': 'table3','children':INDICATOR2.reduce((_frag, ind)=>{
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
    const div1 = createEl('div', {'class':'king-rank', 'children':[createEl('div',{'class':obj['합계']})]});
    const div2 = createEl('div', {'class':'rank-graph', 'children':KINGSCORE.map(m=>createEl('div',{'class':obj['합계'] == m?'check':''}))});
    const small_rank = createEl('div', {'class':'small-rank', 'children': small.map(m=>createEl('div',{'class':obj[m]}))});
    const div3 = createEl('div', {'class':'small-ranking', 'children': [small_rank]});
    [div1, div2, div3].forEach(el=>{getEl('.page-area', page).appendChild(el)});
}

const creeateTable = (page, ranking, arr, desc)=>{
    const div1 = createEl('div', {'class':'page-rank','children':[createEl('div',{'class':ranking})]})
    const div2 = createEl('div', {'class':'desc', 'children':[createEl('div',{'textContent':desc[ranking]})]})
    const ths = createEl('tr', {'children':['항 목','상 태','그 래 프'].map(m=>createEl('th',{'textContent':m}))})
    const tbl1 = arr.reduce((tbl, {name, rank}, idx)=>{
        const num = ['①','②','③','④','⑤','⑥','⑦','⑧'];
        const tr = createEl('tr');
        const score = fn_faceScoreing(rank);
        tr.appendChild(createEl('td',{'textContent':`${num[idx]} ${name}`}))
        tr.appendChild(createEl('td',{'class': score,'children':[createEl('div',{'textContent':FACE[score]})]}))
        tr.appendChild(createEl('td',{'class':rank}))
        tbl.appendChild(tr)
        return tbl;
    },document.createDocumentFragment());
    const div3 = createEl('div', {'class':'tables','children':[createEl('table',{'children':[ths, tbl1]})]});
    getEl('.page-area', page).appendChild(createEl('div',{'class':'graph-area'}));
    getEl('.page-area', page).classList.add('block');
    [div1, div2, div3].forEach((el)=>{getEl('.graph-area', page).appendChild(el);});
}

const createDesc = (page, arr, desc)=>{
    getEl('.page-area', page).appendChild(createEl('div',{'class':'desc-area'}));
    const priority = {'red': 1, 'yell': 2, 'blue': 3};
    const divs = arr.sort((a,b)=>priority[fn_faceScoreing(a['rank'])]-priority[fn_faceScoreing(b['rank'])]).reduce((_fg, {name, en, rank})=>{
        const div1 = createEl('div',{'class':'desc-title','children':[createEl('div', {'class':fn_faceScoreing(rank)}),createEl('div',{'textContent':`${name} [${en}]`})]});
        const div2 = createEl('div',{'class':'desc-detail spoqa', 'textContent': desc[name][fn_graphScoreing(rank)]});
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

const fn_sol_pick = (type3, allList, assist)=>{
    const result = [];
    const born = fn_graphScoreing(allList[5][0].rank);
    const mental = allList[16].map(({name,rank})=>name == '퀴놀린산'||name == '키누렌산'? fn_graphScoreing(rank):'').filter(e=>e!='').some(e=>e!='N')
    const vita = [0,1,2,4,6].map((e)=>fn_graphScoreing(allList[7][e].rank)).some(e=>e!='N');
    if(born == 'L'||born == 'VL') result.push(assist['비타민 D3']);
    if(mental) result.push(assist['커큐민']);
    if(type3['장내 곰팡이/효모 균형'].length||type3['유해균 증식'].length) result.push(assist['자몽씨']);
    if(type3['소화 흡수 기능'].length) result.push(assist['엔자임베네핏']);
    if(type3['장내 세균 균형'].length) result.push(assist['썬화이버']);
    if(type3['독소 노출'].length||type3['항산화 기능'].length) result.push(assist['글루타치온']);
    if(vita) result.push(assist['뉴로마스터']);
    return result;
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

/**
 * @description 페이지별 js
 * @param {*} data 
 */
const createPage = async (data, map, sol) =>{
    // code : 요소별 정보, word : 랭크 문구, desc : 요소별 문구
    const {code, word, desc} = map;
    // 사용자 정보
    const {userPk, userDt, userName, userBirth, userGender, userAge} = data;
    UGISAN.forEach(m=>{code[m].value = data[`${m}_rank`]; code[m].rank = data[m].trim();});
    const scores = calcScore(code, weights);
    const scoreMap = fn_setRanking(calcScore(code, weights));
    const nowDt = new Date();
    document.title = `바이오 종합 대사기능 분석_${userName}님`;

    /** 표지 */
    const page1 = getEl('.title-page');
    getEl('.report-name', page1).textContent = `${userName} 님`;
    getEl('.user-gender span', page1).textContent = `${userGender||''} / ${userAge||''}`;
    getEl('.user-birth span', page1).textContent = birthFormatt(userBirth);
    getEl('.user-pk span', page1).textContent = userPk;
    getEl('.user-dt span', page1).textContent = userDt.substring(0,10);
    getEl('.user-report-dt span', page1).textContent = getFormattedDate(nowDt);
    /**페이지 3 */
    createTitle(getEl('.page-3'),userName,scoreMap, word);
    /**페이지4 -- 체중 조절 능력*/
    createCover(getEl('.page-4'), scoreMap[B1] ,[G11,G12,G13,G14]);
    const {UGI111,UGI112,UGI113,UGI121,UGI122,UGI131,UGI132,UGI133,UGI134,UGI135,UGI136,UGI137,UGI141} = code;
    /**페이지5 */
    const page5 = getEl('.page-5');
    const g11 = [UGI111,UGI112,UGI113];
    creeateTable(page5, scoreMap[B1][G11], g11, word.small[G11]);
    createDesc(page5, g11, desc)
    /**페이지6 */
    const page6 = getEl('.page-6');
    const g12 = [UGI121,UGI122];
    creeateTable(page6, scoreMap[B1][G12], g12, word.small[G12]);
    createDesc(page6, g12, desc)
    /**페이지7 */
    const g13 = [UGI131,UGI132,UGI133,UGI134,UGI135,UGI136,UGI137];
    creeateTable(getEl('.page-7'), scoreMap[B1][G13], g13, word.small[G13]);
    /**페이지8 */
    createBlank(getEl('.page-8'))  // 공백용
    createDesc(getEl('.page-8'), g13, desc)
    /**페이지9 */
    const page9 = getEl('.page-9');
    const g14 = [UGI141];
    creeateTable(page9, scoreMap[B1][G14], g14, word.small[G14]);
    createDesc(page9,g14 , desc)
    /**페이지10 -- 항산화 능력 */
    createCover(getEl('.page-10'),scoreMap[B2], [G21,G22]);
    const {UGI211, UGI221} = code;
    /**페이지11 */
    const page11 = getEl('.page-11');
    const g21 = [UGI211];
    creeateTable(page11, scoreMap[B2][G21], g21, word.small[G21]);
    createDesc(page11, g21, desc)
    /**페이지12 */
    const page12 = getEl('.page-12');
    const g22 = [UGI221];
    creeateTable(page12, scoreMap[B2][G22], g22, word.small[G22]);
    createDesc(page12, g22, desc)
    /**페이지13 -- 에너지 생성 능력*/
    createCover(getEl('.page-13'),scoreMap[B3], [G31,G32,G33]);
    const {UGI311, UGI312, UGI313, UGI314, UGI315, UGI316, UGI317, UGI318, UGI321, UGI322, UGI323, UGI324, UGI325, UGI326, UGI327, UGI331}=code;
    /**페이지14 */
    const g31 = [UGI311, UGI312, UGI313, UGI314, UGI315, UGI316, UGI317, UGI318];
    creeateTable(getEl('.page-14'), scoreMap[B3][G31], g31, word.small[G31]);
    /**페이지15 */
    createBlank(getEl('.page-15'))  // 공백용
    createDesc(getEl('.page-15'), g31, desc)
    /**페이지16 */
    const g32 = [UGI321, UGI322, UGI323, UGI324, UGI325, UGI326, UGI327];
    creeateTable(getEl('.page-16'), scoreMap[B3][G32], g32, word.small[G32]);
    /**페이지17 */
    createBlank(getEl('.page-17'))  // 공백용
    createDesc(getEl('.page-17'), g32, desc)
    /**페이지18 */
    const page18 = getEl('.page-18');
    const g33 = [UGI331];
    creeateTable(page18, scoreMap[B3][G33], g33, word.small[G33]);
    createDesc(page18, g33, desc)
    /**페이지19 -- 신체 방어 능력*/
    const {UGI411, UGI412, UGI413, UGI414, UGI415, UGI416, UGI417, UGI421, UGI422} = code;
    createCover(getEl('.page-19'),scoreMap[B4], [G41,G42]);
    /**페이지20 */
    const g41 = [UGI411, UGI412, UGI413, UGI414, UGI415, UGI416, UGI417]
    creeateTable(getEl('.page-20'), scoreMap[B4][G41], g41, word.small[G41]);
    /**페이지21 */
    createBlank(getEl('.page-21'))  // 공백용
    createDesc(getEl('.page-21'), g41, desc)
    /**페이지22 */
    const page22 = getEl('.page-22');
    const g42 = [UGI421, UGI422]
    creeateTable(page22, scoreMap[B4][G42], g42, word.small[G42]);
    createDesc(page22, g42, desc)
    /**페이지23 -- 장 건강*/
    const {UGI511, UGI512, UGI513, UGI514, UGI515, UGI516, UGI521, UGI522, UGI523, UGI524, UGI531, UGI532, UGI541, UGI542, UGI543, UGI544, UGI545, UGI546} = code;
    createCover(getEl('.page-23'),scoreMap[B5], [G51,G52,G53,G54]);
    /**페이지24 */
    const g51 = [UGI511, UGI512, UGI513, UGI514, UGI515, UGI516];
    creeateTable(getEl('.page-24'), scoreMap[B5][G51], g51, word.small[G51]);
    /**페이지25 */
    createBlank(getEl('.page-25'))  // 공백용
    createDesc(getEl('.page-25'), g51, desc)
    /**페이지26 */
    const g52 = [UGI521, UGI522, UGI523, UGI524];
    creeateTable(getEl('.page-26'), scoreMap[B5][G52], g52, word.small[G52]);
    /**페이지27 */
    createBlank(getEl('.page-27'))  // 공백용
    createDesc(getEl('.page-27'), g52, desc)
    /**페이지28 */
    const page28 = getEl('.page-28');
    const g53 = [UGI531, UGI532]
    creeateTable(page28, scoreMap[B5][G53], g53, word.small[G53]);
    createDesc(page28, g53, desc)
    /**페이지29 */
    const g54 = [UGI541, UGI542, UGI543, UGI544, UGI545, UGI546];
    creeateTable(getEl('.page-29'), scoreMap[B5][G54], g54, word.small[G54]);
    /**페이지30 */
    createBlank(getEl('.page-30'))  // 공백용
    createDesc(getEl('.page-30'), g54, desc)
    /**페이지31 -- 정신 건강 및 집중력*/
    const {UGI611, UGI612, UGI613, UGI621, UGI622, UGI623} = code;
    createCover(getEl('.page-31'),scoreMap[B6], [G61,G62]);
    /**페이지32 */
    const g61 = [UGI611, UGI612, UGI613]
    const page32 = getEl('.page-32');
    creeateTable(page32, scoreMap[B6][G61], g61, word.small[G61]);
    createDesc(page32, g61, desc)
    /**페이지33 */
    const page33 = getEl('.page-33');
    const g62 = [UGI621, UGI622, UGI623]
    creeateTable(page33, scoreMap[B6][G62], g62, word.small[G62]);
    createDesc(page33, g62, desc)
    /**페이지34 */
    /**페이지35 */

    /* 솔루션 페이지*/
    const {suppl, assist, suppl_match, sol_cover} = sol;
    const solp = getEl('.page.hide').cloneNode(true);
    solp.classList.remove('hide');
    solp.classList.add('solution');
    const allList = [g11, g12, g13, g14, g21, g22, g31, g32, g33, g41, g42, g51, g52, g53, g54, g61, g62];
    const type1 = Object.entries(scores).map(e=>[e[0],e[1]['합계']]).sort((x,y)=>x[1]<y[1]?-1:1).map(e=>[e[0], e[1]]).map(e=>e[0]);
    const type2 = Object.entries(scores).reduce((arr,i)=>{
        const obj = Object.entries(i[1]).filter(e=>e[0]!='합계');
        arr = arr.concat(obj);
        return arr;
    },[]).sort((x,y)=>x[1]<y[1]?-1:1).map(([k,rank])=>[k,fn_scoring(rank)]);
    // type3 => 대분류별 영양소 끍끍
    const type3 = allList.reduce((obj, e, idx)=>{
        // console.log(suppl, e)
        const data = e.map(({name, rank})=>suppl[name][fn_graphScoreing(rank)]);
        obj[INDICATOR3[idx]]=[...new Set(data.flat())].filter((e)=>e!='없음');
        return obj;
    },{});
    console.log(type3)
    const ingredient = [...new Set(Object.values(type3).flat())].filter(e=>e!='').join(',');
    const supplement = await jsonProvider(`/api/UGIReport/suppl?supple=${ingredient}`);
    // const supplement2 = await jsonProvider(`/api/UGIReport/suppl?supple=${ingredient}`);
    // const supplement3 = await jsonProvider(`/api/UGIReport/suppl?supple=${ingredient}`);
    const assistResult = fn_sol_pick(type3, allList, assist);
//     const suppResult = supplement.results.filter((_,idx)=>idx < 6-assistResult.length).concat(assistResult);
    const suppResult = supplement.results;
    /** 솔루션 표지 */
    // const sol_1 = solp.cloneNode(true);
    // sol_1.classList.add('sol-1');
    // getEl('.page-area',sol_1).appendChild(createEl('div',{'children':[userName+'님', '종합 대사기능 분석'].map((n)=>createEl('div',{'textContent':n}))}));
    // getEl('.report-area').appendChild(sol_1);
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
    // console.log(type3)
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
            title_p.classList.add(solp_match[t]);
            title_p.classList.add('living-cover');
            getEl('.page-area',title_p).appendChild(createEl('div',{'class': sol_list[t]['합계'],'children':[divList(sol_cover[t])]}));
            getEl('.page-area',title_p).appendChild(createEl('div',{'class':'min-sol','children':groups[t].map(e=>createEl('div',{'class':scoreMap[t][e]}))}));
            
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

    console.log(scores, scoreMap)
}

const load = async () => {
    // 페이지 생성
    for(idx=2;idx<=35;idx++){
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
            window.open('/report/insertInfo');
        }else{
            alert('시스템 오류 입니다. \n전산 관련 문의는 연구개발팀에 문의해주세요. 내선:0981')
            window.open('/report/insertInfo');
        }
    }
    getEl('.back').addEventListener('click',()=>{window.open('/report/insertInfo')})

    /**
     * print 기능 eventListener
     */
    document.querySelector('.header-btn').addEventListener('click',async ({target})=>{
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
    });
}
window.addEventListener('load', load);