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
const [G11,G12,G13,G14,G21,G22,G31,G32,G33,G41,G42,G51,G52,G53,G54,G61,G62] = ['지방산 대사','탄수화물 대사','단백질 대사','케톤 대사','항산화 기능','뼈 건강','에너지 대사','비타민 대사','유전자 발현 능력','독소','세포','소화','장내세균','유해균','곰팡이','신경','인지'];

const INDICATOR = [B1, B6, B5, B4, B3, B2];
const INDICATOR2 = [B1, B2, B3, B4, B5, B6];
const INDICATOR3 = [G11,G12,G13,G14,G21,G22,G31,G32,G33,G41,G42,G51,G52,G53,G54,G61,G62];
const UGISAN = ['UGI111', 'UGI112', 'UGI113', 'UGI121', 'UGI122', 'UGI131', 'UGI132', 'UGI133', 'UGI134', 'UGI135', 'UGI136', 'UGI137', 'UGI141', 'UGI211', 'UGI221', 'UGI311', 'UGI312', 'UGI313', 'UGI314', 'UGI315', 'UGI316', 'UGI317', 'UGI318', 'UGI321', 'UGI322', 'UGI323', 'UGI324', 'UGI325', 'UGI326', 'UGI327', 'UGI331', 'UGI411', 'UGI412', 'UGI413', 'UGI414', 'UGI415', 'UGI416', 'UGI417', 'UGI421', 'UGI422', 'UGI511', 'UGI512', 'UGI513', 'UGI514', 'UGI515', 'UGI516', 'UGI521', 'UGI522', 'UGI523', 'UGI524', 'UGI531', 'UGI532', 'UGI541', 'UGI542', 'UGI543', 'UGI544', 'UGI545', 'UGI546', 'UGI611', 'UGI612', 'UGI613', 'UGI621', 'UGI622', 'UGI623'];
const KINGSCORE = ['Ap','A0','A-','Bp','B0','B-','Cp','C0','C-','Dp','D0','D-','F0'];
const SMALLSCORE = ['A','B','C','D','F'];
const FACE = {'blue':'정상', 'yell':'주의', 'red':'나쁨'};

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

const weights = INDICATOR3.reduce((obj, i, idx)=>{
    const weight = [3,2,3,2,5,5,4,4,2,6,4,2.5,2.5,2.5,2.5,5,5];
    obj[i] = weight[idx];
    return obj;
},{});

const fn_kingScoring = (score)=>{
    score = Math.round(score)
    if(score >= 98) return 'Ap';
    else if(score >=94) return 'A0';
    else if(score >=89) return 'A-';
    else if(score >=85) return 'Bp';
    else if(score >=80) return 'B0';
    else if(score >=75) return 'B-';
    else if(score >=65) return 'Cp';
    else if(score >=60) return 'C0';
    else if(score >=55) return 'C-';
    else if(score >=50) return 'Dp';
    else if(score >=45) return 'D0';
    else if(score >=40) return 'D-';
    else return 'F0';
}
const fn_scoring = (score)=>{
    if(score >= 89) return 'A';
    else if(score >=75) return 'B';
    else if(score >=55) return 'C';
    else if(score >=40) return 'D';
    else return 'F';
}

const fn_faceScoreing = (f)=>{
    const blue = ['n1','n2','n3','n4','n5','n6','m1','m2','m3','p1','p2','p3'];
    const yell = ['n7','n8','m4','p4'];
    const red  = ['n9','n10','m5','p5'];
    if(blue.some(m=> m==f)) return 'blue';
    else if(yell.some(m=> m==f)) return 'yell';
    else return 'red';
}

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

const calcScore = (map, weights)=> {
    const res = Object.values(map).reduce((result, { fst, scd, value, score, name  }) => {
        result[fst] ??= { '합계': 0 };
        const _score = score*10;
        const valueToAdd = (_score - _score * value * 0.4) < -5? -5 : (_score - _score * value * 0.4);
        result[fst][scd] = (result[fst][scd] ?? 0) + valueToAdd;
        result[fst]['합계'] += (valueToAdd * (weights[scd] ?? 1) / 10);
        return result;
    }, Object.create(null));
    return res;
}

const fn_setRanking = (map) =>{
    INDICATOR.forEach((el)=>{
        Object.keys(map).forEach((key)=>{
            if(el == key) Object.keys(map[el]).forEach((k)=>map[el][k] = k == '합계'? fn_kingScoring(map[el][k]) : fn_scoring(map[el][k]))
        });
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

/**
 * @description 페이지별 js
 * @param {*} data 
 */
const createPage = (data, map, sol) =>{
    // code : 요소별 정보, word : 랭크 문구, desc : 요소별 문구
    const {code, word, desc} = map;
    // 사용자 정보
    const {userPk, userDt, userName, userBirth, userGender, userAge} = data;
    UGISAN.forEach(m=>{code[m].value = data[`${m}_rank`]; code[m].rank = data[m].trim();});
    const scores = calcScore(code, weights);
    console.log(scores);
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
    creeateTable(page5, scoreMap[B1][G11], [UGI111,UGI112,UGI113], word.small[G11]);
    createDesc(page5, [UGI111,UGI112,UGI113], desc)
    /**페이지6 */
    const page6 = getEl('.page-6');
    creeateTable(page6, scoreMap[B1][G12], [UGI121,UGI122], word.small[G12]);
    createDesc(page6, [UGI121,UGI122], desc)
    /**페이지7 */
    creeateTable(getEl('.page-7'), scoreMap[B1][G13], [UGI131,UGI132,UGI133,UGI134,UGI135,UGI136,UGI137], word.small[G13]);
    /**페이지8 */
    createBlank(getEl('.page-8'))  // 공백용
    createDesc(getEl('.page-8'), [UGI131,UGI132,UGI133,UGI134,UGI135,UGI136,UGI137], desc)
    /**페이지9 */
    const page9 = getEl('.page-9');
    creeateTable(page9, scoreMap[B1][G14], [UGI141], word.small[G14]);
    createDesc(page9, [UGI141], desc)
    /**페이지10 -- 항산화 능력 */
    createCover(getEl('.page-10'),scoreMap[B2], [G21,G22]);
    const {UGI211, UGI221} = code;
    /**페이지11 */
    const page11 = getEl('.page-11');
    creeateTable(page11, scoreMap[B2][G21], [UGI211], word.small[G21]);
    createDesc(page11, [UGI211], desc)
    /**페이지12 */
    const page12 = getEl('.page-12');
    creeateTable(page12, scoreMap[B2][G22], [UGI221], word.small[G22]);
    createDesc(page12, [UGI221], desc)
    /**페이지13 -- 에너지 생성 능력*/
    createCover(getEl('.page-13'),scoreMap[B3], [G31,G32,G33]);
    const {UGI311, UGI312, UGI313, UGI314, UGI315, UGI316, UGI317, UGI318, UGI321, UGI322, UGI323, UGI324, UGI325, UGI326, UGI327, UGI331}=code;
    /**페이지14 */
    creeateTable(getEl('.page-14'), scoreMap[B3][G31], [UGI311, UGI312, UGI313, UGI314, UGI315, UGI316, UGI317, UGI318], word.small[G31]);
    /**페이지15 */
    createBlank(getEl('.page-15'))  // 공백용
    createDesc(getEl('.page-15'), [UGI311, UGI312, UGI313, UGI314, UGI315, UGI316, UGI317, UGI318], desc)
    /**페이지16 */
    creeateTable(getEl('.page-16'), scoreMap[B3][G32], [UGI321, UGI322, UGI323, UGI324, UGI325, UGI326, UGI327], word.small[G32]);
    /**페이지17 */
    createBlank(getEl('.page-17'))  // 공백용
    createDesc(getEl('.page-17'), [UGI321, UGI322, UGI323, UGI324, UGI325, UGI326, UGI327], desc)
    /**페이지18 */
    const page18 = getEl('.page-18');
    creeateTable(page18, scoreMap[B3][G33], [UGI331], word.small[G33]);
    createDesc(page18, [UGI331], desc)
    /**페이지19 -- 신체 방어 능력*/
    const {UGI411, UGI412, UGI413, UGI414, UGI415, UGI416, UGI417, UGI421, UGI422} = code;
    createCover(getEl('.page-19'),scoreMap[B4], [G41,G42]);
    /**페이지20 */
    creeateTable(getEl('.page-20'), scoreMap[B4][G41], [UGI411, UGI412, UGI413, UGI414, UGI415, UGI416, UGI417], word.small[G41]);
    /**페이지21 */
    createBlank(getEl('.page-21'))  // 공백용
    createDesc(getEl('.page-21'), [UGI411, UGI412, UGI413, UGI414, UGI415, UGI416, UGI417], desc)
    /**페이지22 */
    const page22 = getEl('.page-22');
    creeateTable(page22, scoreMap[B4][G42], [UGI421, UGI422], word.small[G42]);
    createDesc(page22, [UGI421, UGI422], desc)
    /**페이지23 -- 장 건강*/
    const {UGI511, UGI512, UGI513, UGI514, UGI515, UGI516, UGI521, UGI522, UGI523, UGI524, UGI531, UGI532, UGI541, UGI542, UGI543, UGI544, UGI545, UGI546} = code;
    createCover(getEl('.page-23'),scoreMap[B5], [G51,G52,G53,G54]);
    /**페이지24 */
    creeateTable(getEl('.page-24'), scoreMap[B5][G51], [UGI511, UGI512, UGI513, UGI514, UGI515, UGI516], word.small[G51]);
    /**페이지25 */
    createBlank(getEl('.page-25'))  // 공백용
    createDesc(getEl('.page-25'), [UGI511, UGI512, UGI513, UGI514, UGI515, UGI516], desc)
    /**페이지26 */
    creeateTable(getEl('.page-26'), scoreMap[B5][G52], [UGI521, UGI522, UGI523, UGI524], word.small[G52]);
    /**페이지27 */
    createBlank(getEl('.page-27'))  // 공백용
    createDesc(getEl('.page-27'), [UGI521, UGI522, UGI523, UGI524], desc)
    /**페이지28 */
    const page28 = getEl('.page-28');
    creeateTable(page28, scoreMap[B5][G53], [UGI531, UGI532], word.small[G53]);
    createDesc(page28, [UGI531, UGI532], desc)
    /**페이지29 */
    creeateTable(getEl('.page-29'), scoreMap[B5][G54], [UGI541, UGI542, UGI543, UGI544, UGI545, UGI546], word.small[G54]);
    /**페이지30 */
    createBlank(getEl('.page-30'))  // 공백용
    createDesc(getEl('.page-30'), [UGI541, UGI542, UGI543, UGI544, UGI545, UGI546], desc)
    /**페이지31 -- 정신 건강 및 집중력*/
    const {UGI611, UGI612, UGI613, UGI621, UGI622, UGI623} = code;
    createCover(getEl('.page-31'),scoreMap[B6], [G61,G62]);
    /**페이지32 */
    const page32 = getEl('.page-32');
    creeateTable(page32, scoreMap[B6][G61], [UGI611, UGI612, UGI613], word.small[G61]);
    createDesc(page32, [UGI611, UGI612, UGI613], desc)
    /**페이지33 */
    const page33 = getEl('.page-33');
    creeateTable(page33, scoreMap[B6][G62], [UGI621, UGI622, UGI623], word.small[G62]);
    createDesc(page33, [UGI621, UGI622, UGI623], desc)
    /**페이지34 */
    /**페이지35 */

    /* 솔루션 페잊*/
    INDICATOR3
    INDICATOR2
    
    scores, scoreMap

    const solp = getEl('.page.hide').cloneNode(true);
    solp.classList.remove('hide');
    solp.classList.add('solution');
    const majList = Object.entries(scores).map(e=>[e[0],e[1]['합계']]).sort((x,y)=>x[1]<y[1]?-1:1);;
    const subList = Object.entries(scores).reduce((arr,i)=>{
        const obj = Object.entries(i[1]).filter(e=>e[0]!='합계');
        arr = arr.concat(obj);
        return arr;
    },[]).sort((x,y)=>x[1]<y[1]?-1:1);
    
    console.log(majList)
    console.log(subList)
    console.log(scoreMap)
    
    const sol_1 = solp.cloneNode(true);
    getEl('.page-area',sol_1).appendChild(createEl('div',{'textContent':userName}));
    getEl('.report-area').appendChild(sol_1)

    const sol_2 = ''
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
        const sol = await jsonProvider(`/json/supplement.json`);
        if (data.error) throw new Error(data.error);
        createPage(data.results[0], dataEl, sol);
    } catch (error) {
        console.error('데이터 로딩 실패:', error);
    }
    getEl('.back').addEventListener('click',()=>{window.open('/report/insertInfo')})

    /**
     * print 기능 eventListener
     */
    document.querySelector('.header-btn').addEventListener('click',async ({target})=>{
        if(target.classList == 'print'){
            print_mode();
        }
    });
}
window.addEventListener('load', load);