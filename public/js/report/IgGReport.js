/***********************************
 * @description 지연성알러지 리포트 생성 js
 * @author jisoo
 * @date 25-01-23
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

const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // 직접 로컬 시간 컴포넌트를 사용
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}시 ${minutes}분`;
}

const setLevelText = (levels) =>{
    return createEl('span', {'textContent':levels, 'class': `level${levels.substring(0,1)}-txt`});
}

const setLevel = (value, levels) =>{
    if(value < levels['level1']){
        return '1단계';
    }else if(value < levels['level2']){
        return '2단계';
    }else if(value < levels['level3']){
        return '3단계';
    }else if(value < levels['level4']){
        return '4단계';
    }else{
        return '5단계';
    }
}

const createUserInfo = (data) =>{
    const {userName, userId, date, userAge, userGender} = data;
    const pageItem = createEl('div', {'class': 'user-info'});
    const table = createEl('table', {'children':[
        createEl('tr', {'children':[
            createEl('td'),
            createEl('td', {'class': 'name-area', 'textContent': userName}),
            createEl('td'),
            createEl('td', {'class': 'date-area', 'textContent': date.substring(0,10)})
        ]}),
        createEl('tr', {'children':[
            createEl('td'),
            createEl('td', {'class': 'uuid-area', 'textContent': userId}),
            createEl('td'),
            createEl('td', {'class': 'age-area', 'textContent': `${userGender}성 / ${userAge}세`})
        ]})
    ]});
    pageItem.appendChild(table);
    return pageItem;
}

const formatNumber = (number) => {
    return Number.isInteger(number) ? Number(number) : Number(number).toFixed(2);
}

/**
 * @description 페이지 생성
 */
const createPage = async (data, levels) => {
    // console.log(data, levels);
    const levelInfo = getEl('.level-info');
    const {level1, level2, level3, level4, level5} = levels;
    getEl('.level1',levelInfo).value = level1;
    getEl('.level2',levelInfo).value = level2;
    getEl('.level3',levelInfo).value = level3;
    getEl('.level4',levelInfo).value = level4;
    getEl('.level5',levelInfo).value = level5;
    getEl('.rgstUser',levelInfo).value = levels.rgstUser;
    getEl('.last-rgst',levelInfo).textContent = formatDate(levels.ragstDate);

    const category = [
        {name : '육류 / 가금류', page: 6 , group : [
            {'item':'소고기'},{'item':'돼지고기'},{'item':'양고기'},{'item':'닭고기'},{'item':'오리고기'},{'item':'계란노른자'},{'item':'계란흰자'},{'item':'메추리알'}
        ]},
        {name : '해산물', page: 7 , group : [
            {'item':'고등어'},{'item':'광어'},{'item':'대구'},{'item':'멸치'},{'item':'연어'},{'item':'장어'},{'item':'참치'},{'item':'청어'},{'item':'문어'},{'item':'오징어'},{'item':'게'},{'item':'바닷가재'},{'item':'새우'},{'item':'굴'},{'item':'홍합'}
        ]},
        {name : '채소', page: 8 , group : [
            {'item':'가지'},{'item':'감자'},{'item':'고구마'},{'item':'고추'},{'item':'당근'},{'item':'무'},{'item':'배추'},{'item':'버섯'},{'item':'상추'},{'item':'시금치'},{'item':'양배추'},{'item':'양파'},{'item':'오이'},{'item':'올리브'},{'item':'토마토'},{'item':'호박'}
        ]},
        {name : '과일', page: 9 , group : [
            {'item':'딸기'},{'item':'레몬'},{'item':'망고'},{'item':'멜론'},{'item':'바나나'},{'item':'배'},{'item':'복숭아'},{'item':'사과'},{'item':'수박'},{'item':'오렌지'},{'item':'자몽'},{'item':'키위'},{'item':'파인애플'},{'item':'포도'}
        ]},
        {name : '유제품', page: 10, group : [
            {'item':'치즈'},{'item':'산양유'},{'item':'요거트'},{'item':'우유'},{'item':'우유단백질(카제인)'}
        ]},
        {name : '곡물', page: 11, group : [
            {'item':'메밀'},{'item':'밀'},{'item':'보리'},{'item':'쌀'},{'item':'오트밀'},{'item':'옥수수'},{'item':'호밀'},{'item':'글루텐'}
        ]},
        {name : '콩류 / 견과류', page: 12, group : [
            {'item':'완두콩'},{'item':'대두콩'},{'item':'땅콩'},{'item':'밤'},{'item':'아몬드'},{'item':'녹두'},{'item':'잣'},{'item':'참깨'},{'item':'피스타치오'},{'item':'해바라기씨'},{'item':'호두'}
        ]},
        {name : '향신료 / 기타', page: 13, group : [
            {'item':'겨자'},{'item':'계피'},{'item':'꿀'},{'item':'녹차'},{'item':'마늘'},{'item':'생강'},{'item':'설탕'},{'item':'카레'},{'item':'커피'},{'item':'코코아'},{'item':'후추'},{'item':'효모균'},{'item':'칸디다균(곰팡이)'}
        ]}
    ];

    const resultInfo = {
        '5단계': {'title': '섭취 배제' , 'content': '건강을 위해 식단에서 배제함'},
        '4단계': {'title': '섭취 제한' , 'content': '최대한 섭취를 제한하는 것을 추천. 6개월 이상 섭취 배제를 추천하며, 증상이 장기적으로 개선되면 소량으로 섭취 가능'},
        '3단계': {'title': '섭취 주의' , 'content': '섭취를 가급적 피하고 불가피한 경우도 소량으로만 섭취 최소 3개월 이상 섭취를 제한하면 증상이 개선될 수 있음'},
        '2단계': {'title': '소량 섭취' , 'content': `해당 항목은 과민반응이 약하게 나타날 수 있음 ㅤㅤㅤㅤ 단, 개인 차이에 따라 증상이나 반응이 있는 경우 주의 해서 섭취해야 함`},
        '1단계': {'title': '섭취 가능' , 'content': '섭취가 가능학 식품들'}
    };

    category.forEach(({group}) => {
        group.forEach((i) => {
            const level = setLevel(data[i.item], levels);
            i.value = data[i.item];
            i.level = level
            i.levelText = setLevelText(level);
        });
    });
    
    const allLevelInfo = category.reduce((acc, {group}) => {
        group.forEach(({level, item}) => {
            acc[level] = (acc[level] ? acc[level] : '') + item + ', ';
        });
        return acc;
    }, {});

    const underLevelInfo = ()=>{
        const a = createEl('div', {'class': 'under-level-info',
            'textContent': `1단계<${level1} | 2단계 ${level1}~${level2-0.01} | 3단계 ${level2}~${level3-0.01} | 4단계 ${level3}~${level4-0.01} | 5단계≥${level4} | 단위 ug/ml`
        });
        return a.cloneNode(true);
    }

    const createGraph = (value) =>{
        const score = 2.26;
        const levelArr = Object.values(levels).filter(lv => !isNaN(Number(lv))).sort((a,b)=>a-b);
        let result = 0;
        levelArr.some((level, idx, arr) => {
            if (value < level) {
                const prevLevel = arr[idx - 1] || 0;
                result = ((value - prevLevel) / (level - prevLevel)) * score + score * idx;
                return true;
            } 
        });
        if(value != 0 && result == 0){ result = 11.25; }
        return result;
    }

    const pageCreators = {
        createTitle : function(data){
            const {userName, date, userId} = data;
            const pageItem = createEl('div', {'class': 'cover-area'});
            pageItem.appendChild(createEl('div', {'class': 'name-area', 'textContent': userName+'님'}));
            pageItem.appendChild(createEl('div', {'class': 'date-area', 'textContent': date.substring(0,10)}));
            pageItem.appendChild(createEl('div', {'class': 'uuid-area', 'textContent': userId}));
            getEl('.page-1 .page-area').appendChild(pageItem);
        },
        createAllInfo : function(d, lv, resInfo){
            const pageItem = createEl('div', {'class': 'title-text-area'});
            const table = createEl('table', {'class': 'all-value-table', 'children': [
                createEl('thead', {'children': [
                    createEl('tr', {'children': [
                        createEl('th', {'textContent': '반응도'}),
                        createEl('th', {'textContent': '해당 항목'}),
                        createEl('th', {'textContent': '결과 해석'})
                    ]})
                ]}),
                createEl('tbody', {'children': ['5단계', '4단계', '3단계', '2단계', '1단계'].map((i, idx) => {
                    const {title, content} = resInfo[i];
                    const level = `level-tr level-${i.slice(0, -2)}`;
                    return createEl('tr', {'class': level,'children': [
                        createEl('td', {'textContent': i, 'class': 'lv-title'}),
                        createEl('td', {'textContent': lv[i]?.slice(0, -2)|| '해당 없음', 'class': 'lv-value'}),
                        createEl('td', {'children': [
                            createEl('div', {'textContent': title, 'class': 'lv-subtitle'}),
                            createEl('div', {'textContent': content, 'class': 'lv-content'})
                        ]})
                    ]})
                })})
            ]});
            pageItem.appendChild(createUserInfo(d));
            pageItem.appendChild(createEl('div', {'class': 'content-area', 'children': [
                createEl('div', {'class': 'title-text-area'}),
                createEl('div', {'class': 'info-table', 'children': [table]})
            ]}));
            getEl('.page-5 .page-area').appendChild(pageItem);
        },
        createIgGGraph : function(d, category){
            category.forEach((food) => {
                const pageItem = document.createDocumentFragment();
                const trs = food.group.reduce((frg, group, idx) => {
                    const {level, item, value} = group;
                    const tr = createEl('tr', {'class': `level-${level.substring(0,1)}`});
                    tr.appendChild(createEl('td', {/*'textContent': idx.toString().padStart(2, '0')*/}));
                    tr.appendChild(createEl('td', {/*'textContent': item*/}));
                    tr.appendChild(createEl('td', {'textContent': level, 'class': 'lv-title'}));
                    tr.appendChild(createEl('td', {'colspan': 5, 'children':[
                        createEl('div', {'class': 'graph-area', 'children': [
                            createEl('div', {'class': `level-graph lv-${level.substring(0,1)}`, 'textContent': formatNumber(value), 'style': `width: ${createGraph(value)}cm;`}),
                        ]})
                    ]}));
                    frg.appendChild(tr);
                    return frg;
                }, document.createDocumentFragment());
                const table = createEl('table',{
                    'children': [
                        createEl('tr',{'children':[
                            createEl('th',{'rowspan': 2}), /*No*/
                            createEl('th',{'rowspan': 2}), /*검사 항목*/
                            createEl('th',{'rowspan': 2}), /*반응도*/
                            createEl('th',{'colspan': 5}) /*그래프*/
                        ]}),
                        createEl('tr',{'children':[
                            createEl('th',{}), /*단계*/
                            createEl('th',{}), /*단계*/
                            createEl('th',{}), /*단계*/
                            createEl('th',{}), /*단계*/
                            createEl('th',{}) /*단계*/
                        ]})
                        ,trs
                    ]
                });
                pageItem.appendChild(createUserInfo(d));
                pageItem.appendChild(createEl('div', {'class': 'content-area', 'children': [
                    createEl('div', {'class': 'title-text-area'}),
                    createEl('div', {'class': 'table-area', 'children': [table]}),
                    underLevelInfo()
                ]}));
                getEl(`.page-${food.page} .page-area`).appendChild(pageItem);
            });
        }
    }
    pageCreators.createTitle(data);
    pageCreators.createAllInfo(data, allLevelInfo, resultInfo);
    pageCreators.createIgGGraph(data, category);

    if(data.userAge < 13){
        for(idx=1;idx<=3;idx++){
            const page = getEl('.page.hide').cloneNode(true);
            page.classList.remove('hide');
            page.classList.add('solution');
            page.classList.add(`page-kid-${idx}`);
            getEl('.report-area').appendChild(page);
        }
    }else if(data['칸디다균(곰팡이)'] < 12.5){
        for(idx=1;idx<=3;idx++){
            const page = getEl('.page.hide').cloneNode(true);
            page.classList.remove('hide');
            page.classList.add('solution');
            page.classList.add(`page-normal-${idx}`);
            getEl('.report-area').appendChild(page);
        }
    }else {
        for(idx=1;idx<=13;idx++){
            const page = getEl('.page.hide').cloneNode(true);
            page.classList.remove('hide');
            page.classList.add('solution');
            page.classList.add(`page-pang-${idx}`);
            getEl('.report-area').appendChild(page);
        }
    }
    
}
///////////////////////////////////////////////////////////////////
const saveLevelInfo = async () => {
    const form = document.levelInfoForm;
    const data = {};
    for(const input of form){
        if(input.name){
            data[input.name] = input.value;
            if(!input.value){
                alert('모든 항목을 입력해주세요.');
                return;
            }
        }
    }
    const response = await jsonProvider(`/api/IgGReport/insertLevels`, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(res=>{
        if(res.error){
            alert(res.error);
        }else{
            alert('저장 완료');
            window.location.reload();
        }
    });
}
//////////////////////////////////////////////////////////////////////////////////////////
const load = async () => {
    window.jsPDF = window.jspdf.jsPDF;
    // 페이지 생성
    for(idx=1;idx<=28;idx++){
        const page = getEl('.page.hide').cloneNode(true);
        page.classList.remove('hide');
        page.classList.add('result');
        page.classList.add(`page-${idx}`);
        getEl('.report-area').appendChild(page);
    }

    // 데이터 로드
    try {
        const username = document.getElementById('hiddenUsername').value;
        const data = await jsonProvider(`/api/IgGReport?username=${encodeURIComponent(username)}`);
        const levels = await jsonProvider(`/api/IgGReport/levels`);
        if (data.error) throw new Error(data.error);
        createPage(data.results[0], levels.result);
    } catch (error) {
        console.error('데이터 로딩 실패:', error);
        if(error == '사용자 이름이 없습니다.'){
            alert('차트번호가 없거나, 사용자 정보가 존재하지 않습니다. \n다시 확인해주세요.')
            window.open('/report/insertInfo?analysis=IgG');
        }else{
            alert('시스템 오류 입니다. \n전산 관련 문의는 연구개발팀에 문의해주세요. 내선:0981')
            window.open('/report/insertInfo?analysis=IgG');
        }
    }
    getEl('.back').addEventListener('click',()=>{window.open('/report/insertInfo?analysis=IgG')});
    getEl('.level-info-btn').addEventListener('click',saveLevelInfo);
    getEl('.level-btn').addEventListener('click',()=>{
        getEl('.level-info').classList.toggle('hide');
    });

    /**
     * print 기능 eventListener
     */
    document.querySelector('.header-btn').addEventListener('click',async ({target})=>{
        const report = getEl('.report-area');
        const userName = getEl('.name-area').textContent;
        const date = formatDate(new Date()).substring(0, 10).replaceAll('-','');
        const ids = getEl('.uuid-area').textContent;
        if(target.classList.contains('print')){
            report.classList.remove('solution')
            report.classList.remove('result')
            document.title = `바이오 지연성 알러지 검사_${userName}_${date}`;
            print_mode();
        }
        else if(target.classList.contains('print-result')){
            report.classList.remove('solution')
            report.classList.add('result');
            document.title = `${date}_${userName}_${ids}_바이오 지연성 알러지 검사 결과`;
            print_mode();
        }
        else if(target.classList.contains('print-solution')){
            report.classList.add('solution')
            report.classList.remove('result')
            document.title = `${date}_${userName}_${ids}_솔루션`;
            print_mode();
        }
        else if(target.classList.contains('save-pdf')){
            await savePDF();
        }
    });
}

/**
 * @description PDF 저장 기능
 */
const savePDF = async () => {
    try {
        // 로딩 표시 추가
        const loadingDiv = document.createElement('div');
        loadingDiv.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.8);color:white;padding:20px;border-radius:10px;z-index:9999;';
        loadingDiv.textContent = 'PDF 생성 중...';
        document.body.appendChild(loadingDiv);

        // 구버전 jsPDF 사용 (전역 변수로 등록됨)
        const doc = new jsPDF('p', 'mm', 'a4');
        const pages = document.querySelectorAll('.page:not(.hide)');
        
        for (let i = 0; i < pages.length; i++) {
            const canvas = await html2canvas(pages[i], {
                scale: 2,
                useCORS: true,
                logging: false,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });
            
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            
            if (i > 0) {
                doc.addPage();
            }
            
            // A4 크기에 맞게 이미지 추가
            doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        }
        
        // PDF 저장
        const userName = getEl('.report-name')?.textContent || 'unknown';
        const date = new Date().toISOString().slice(2,10).replace(/-/g,'');
        doc.save(`IgG_Report_${userName}_${date}.pdf`);

        document.body.removeChild(loadingDiv);
    } catch (error) {
        console.error('PDF 생성 중 오류:', error);
        alert('PDF 생성 중 오류가 발생했습니다.');
        if (document.body.contains(loadingDiv)) {
            document.body.removeChild(loadingDiv);
        }
    }
}

window.addEventListener('load', load);