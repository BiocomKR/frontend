const createTable = (data)=>{

    const trs = data.reduce((frag, d)=>{
        const {userId, date, userName, userGender, userBirth } = d;
        const tr = createEl('tr', {'class' : 'userId'});
        tr.appendChild(createEl('td',{'textContent':userId}));
        tr.appendChild(createEl('td',{'textContent': date.substring(0,10)}));
        tr.appendChild(createEl('td',{'textContent':userName}));
        tr.appendChild(createEl('td',{'textContent':userGender}));
        tr.appendChild(createEl('td',{'textContent':birthFormatt(userBirth.substring(0,6)||'000000')}));
        tr.appendChild(createEl('td',{'children':[createEl('span',{'textContent':'조회','class':'submit','data-id':userId})]}));
        frag.appendChild(tr);
        return frag;
    },document.createDocumentFragment());  
    getEl('.user-list tbody').appendChild(trs)
}

const load = async () => {
    // 데이터 로드
    try {
        const data = await jsonProvider(`/api/UGIReport/list`);
        if (data.error) throw new Error(data.error);
        console.log(data.results[0]);
        createTable(data.results[0])
    } catch (error) {
        console.error('데이터 로딩 실패:', error);
    }
    getEl('.user-list tbody').addEventListener('click',e=>{
        if(!e.target.classList.contains('submit')) return ;
        document.userInfo.username.value = e.target.dataset.id;
        document.userInfo.submit();
    })
}
window.addEventListener('load', load);