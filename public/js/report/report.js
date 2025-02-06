const createTable = (data)=>{
    removeAll(getEl('.user-list tbody'));
    const trs = data.reduce((frag, d)=>{
        const {userId, date, userName, userGender, userBirth } = d;
        const tr = createEl('tr', {'class' : 'userId'});
        tr.appendChild(createEl('td',{'textContent':userId}));
        tr.appendChild(createEl('td',{'textContent': date.substring(0,10)}));
        tr.appendChild(createEl('td',{'textContent':userName}));
        tr.appendChild(createEl('td',{'textContent':userGender}));
        tr.appendChild(createEl('td',{'textContent':birthFormatt(userBirth?.substring(0,6)||'생년월일 없음')}));
        tr.appendChild(createEl('td',{'children':[createEl('span',{'textContent':'조회','class':'submit','data-id':userId})]}));
        frag.appendChild(tr);
        return frag;
    },document.createDocumentFragment());  
    getEl('.user-list tbody').appendChild(trs)
}

const removeAll = el=>{
    while (el.firstChild) {
        el.removeChild(el.firstChild); 
    }
}

const createPagination = (t) => {
    const {totalPage, currentPage = 1} = t;
    const pagination = document.createDocumentFragment();
    const VISIBLE_PAGES = 5; // 현재 페이지 좌우로 보여줄 페이지 수
    
    // 이전 버튼 추가
    pagination.appendChild(createEl('span', {
        'textContent': '이전',
        'class': `page-nav ${currentPage <= 1 ? 'disabled' : ''}`,
        'data-page': currentPage - 1
    }));

    if(totalPage > 10) {
        // 첫 페이지 항상 표시
        pagination.appendChild(createEl('span', {
            'textContent': 1,
            'class': `page-number ${currentPage === 1 ? 'active' : ''}`,
            'data-page': 1
        }));

        // 현재 페이지 기준으로 앞뒤로 VISIBLE_PAGES만큼 표시
        let startPage = Math.max(2, currentPage - Math.floor(VISIBLE_PAGES / 2));
        let endPage = Math.min(totalPage - 1, startPage + VISIBLE_PAGES - 1);
        
        // startPage 조정
        if (endPage - startPage < VISIBLE_PAGES - 1) {
            startPage = Math.max(2, endPage - VISIBLE_PAGES + 1);
        }

        // 첫 페이지와 시작 페이지 사이에 간격이 있으면 ... 표시
        if(startPage > 2) {
            pagination.appendChild(createEl('span', {'textContent': '...', 'class': 'ellipsis'}));
        }

        // 중간 페이지들 표시
        for(let i = startPage; i <= endPage; i++) {
            pagination.appendChild(createEl('span', {
                'textContent': i,
                'class': `page-number ${currentPage === i ? 'active' : ''}`,
                'data-page': i
            }));
        }

        // 마지막 페이지 앞에 간격이 있으면 ... 표시
        if(endPage < totalPage - 1) {
            pagination.appendChild(createEl('span', {'textContent': '...', 'class': 'ellipsis'}));
        }

        // 마지막 페이지 항상 표시
        if(totalPage !== 1) {
            pagination.appendChild(createEl('span', {
                'textContent': totalPage,
                'class': `page-number ${currentPage === totalPage ? 'active' : ''}`,
                'data-page': totalPage
            }));
        }
    } else {
        // 10페이지 이하일 경우 모든 페이지 표시
        for(let i=1; i<=totalPage; i++){
            pagination.appendChild(createEl('span', {
                'textContent': i,
                'class': `page-number ${currentPage === i ? 'active' : ''}`,
                'data-page': i
            }));
        }
    }

    // 다음 버튼 추가
    pagination.appendChild(createEl('span', {
        'textContent': '다음',
        'class': `page-nav ${currentPage >= totalPage ? 'disabled' : ''}`,
        'data-page': currentPage + 1
    }));

    // 기존 페이지네이션 제거 후 새로운 페이지네이션 추가
    removeAll(getEl('.pagination'));
    getEl('.pagination').appendChild(pagination);
}

const load = async () => {
    // 데이터 로드
    const analysis = new URL(window.location.href).searchParams.get('analysis')||'UGI';
    try {
        const data = await jsonProvider(`/api/${analysis}Report/list`);
        if (data.error) throw new Error(data.error);
        getEl('.analysis').value = analysis;
        createTable(data.results)
        createPagination(data.totalPage)
    } catch (error) {
        console.error('데이터 로딩 실패:', error);
    }
    getEl('.analysis').addEventListener('change',async e=>{
        try {
            document.userInfo.action = `/report/${e.target.value}`;
            const data = await jsonProvider(`/api/${e.target.value}Report/list`);
            if (data.error) throw new Error(data.error);
            createTable(data.results)
            createPagination(data.totalPage)
        } catch (error) {
            console.error('데이터 로딩 실패:', error);
        }
    });
    getEl('.user-list tbody').addEventListener('click',e=>{
        if(!e.target.classList.contains('submit')) return ;
        document.userInfo.username.value = e.target.dataset.id;
        document.userInfo.submit();
    });
    getEl('.date-submit').addEventListener('click',async e=>{
        const reportType = getEl('.analysis').value;
        const date = getEl('#date').value;
        if(!date) return ;
        const data = await jsonProvider(`/api/${reportType}Report/list?date=${date}`);
        if (data.error) {
            alert('존재하지 않는 접수일자 또는 양식이 틀렸습니다.');
            throw new Error(data.error);
        }
        createTable(data.results)
        createPagination(data.totalPage)
    })
    getEl('.all-submit').addEventListener('click',async e=>{
        const reportType = getEl('.analysis').value;
        const data = await jsonProvider(`/api/${reportType}Report/list`);
        if (data.error) {
            alert('오류 발생 - 개발자 문의 필요');
            throw new Error(data.error);
        }
        createTable(data.results)
        createPagination(data.totalPage)
    })

    // 페이지네이션 이벤트 리스너 등록
    getEl('.pagination').addEventListener('click', async (e) => {
        const target = e.target;
        if (!target.dataset.page) return;
        if (target.classList.contains('disabled')) return;
        
        const reportType = getEl('.analysis').value;
        const date = getEl('#date').value;
        const pageNum = parseInt(target.dataset.page);
        
        let url = `/api/${reportType}Report/list?pageNo=${pageNum}`;
        if (date) url += `&date=${date}`;
        
        try {
            const data = await jsonProvider(url);
            if (data.error) throw new Error(data.error);
            createTable(data.results);
            createPagination({
                totalPage: data.totalPage.totalPage,
                currentPage: pageNum
            });
        } catch (error) {
            console.error('페이지 로딩 실패:', error);
        }
    });
}
window.addEventListener('load', load);