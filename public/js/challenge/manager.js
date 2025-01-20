
const createUserList = (data)=>{
    removeAll(getEl('.userid'));
    const trs = data.reduce((frag, d)=>{
        const {name, userid} = d;
        const option = createEl('option',{'value':userid, 'textContent':name});
        frag.appendChild(option);
        return frag;
    },document.createDocumentFragment());  
    getEl('.userid').appendChild(trs)
}

const createTableChallenger = (data)=>{
    removeAll(getEl('.user-list tbody'));
    const trs = data.reduce((frag, d)=>{
        const {name, userid, groupCode, startDt, endDt } = d;
        const tr = createEl('tr', {'class' : 'userId'});
        tr.appendChild(createEl('td',{'textContent':name}));
        tr.appendChild(createEl('td',{'textContent': userid}));
        tr.appendChild(createEl('td',{'textContent':groupCode}));
        tr.appendChild(createEl('td',{'textContent':startDt}));
        tr.appendChild(createEl('td',{'textContent':endDt}));
        frag.appendChild(tr);
        return frag;
    },document.createDocumentFragment());  
    createUserList(data);
    getEl('.user-list tbody').appendChild(trs)
}

const createTableMapping = (data)=>{
    removeAll(getEl('.mapping-list tbody'));
    const trs = data.reduce((frag, d)=>{
        const {usercode, report, userid, testCode, testNm, fileNm } = d;
        const tr = createEl('tr', {'class' : 'userId'});
        tr.appendChild(createEl('td',{'textContent':usercode}));
        tr.appendChild(createEl('td',{'textContent': report}));
        tr.appendChild(createEl('td',{'textContent': userid}));
        tr.appendChild(createEl('td',{'textContent':testCode}));
        tr.appendChild(createEl('td',{'textContent':testNm}));
        tr.appendChild(createEl('td',{'textContent':fileNm}));
        frag.appendChild(tr);
        return frag;
    },document.createDocumentFragment());  
    getEl('.mapping-list tbody').appendChild(trs)
}   

const removeAll = el=>{
    while (el.firstChild) {
        el.removeChild(el.firstChild); 
      }
}

function submitChallengerForm() {
    const form = document.forms['challenger'];
    const formData = {
        username: form.username.value,
        userid: form.userid.value,
        groupCode: form.groupCode.value,
        startDt: form.startDt.value,
        endDt: form.endDt.value
    };
         // 폼 데이터 수집 전에 콘솔에 각 필드값 출력
   console.log('Form fields values:', {
    username: form.username.value,
    userid: form.userid.value,
    groupCode: form.groupCode.value,
    startDt: form.startDt.value,
    endDt: form.endDt.value
});
     fetch('/challenge/saveChallengerData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(({data}) => {
        createTableChallenger(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('등록 중 오류가 발생했습니다.');
    });
}
 function submitMappingForm() {
    const form = document.forms['mapping'];
    const formData = {
        username: form.username.value,
        report: form.report.value,
        userid: form.userid.value,
        testcode: form.testcode.value,
        testNm: form.testNm.value,
        fileNm: form.fileNm.value
    };

     fetch('/challenge/saveMappingData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(({data}) => {
        createTableMapping(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('매핑 등록 중 오류가 발생했습니다.');
    });
}

const load = async () => {
    // 데이터 로드
    try {
        const data = await jsonProvider(`/challenge/loadData`);
        if (data.error) throw new Error(data.error);
        createTableChallenger(data.challenger)
        createTableMapping(data.mapping)
    } catch (error) {
        console.error('데이터 로딩 실패:', error);
    }
    getEl('.btn-container1').addEventListener('click',submitChallengerForm);
    getEl('.btn-container2').addEventListener('click',submitMappingForm);

    document.querySelectorAll('.title').forEach(title=>{
        title.addEventListener('click',({target})=>{
            console.log(target)
            getEl('.title.on').classList.remove('on');
            target.classList.add('on');
            if(target.classList.contains('user-title')){
                getEl('.table-container1').classList.remove('hidden');
                getEl('.table-container2').classList.add('hidden');
            }else if(target.classList.contains('mapping-title')){
                getEl('.table-container1').classList.add('hidden');
                getEl('.table-container2').classList.remove('hidden');
            }
        });
    });
    getEl('#startDt').addEventListener('focusout',({target})=>{
        const value = target.value;
        const startDate = new Date(value);
        
        // startDt 포맷팅
        const startYear = startDate.getFullYear();
        const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
        const startDay = String(startDate.getDate()).padStart(2, '0');
        target.value = `${startYear}-${startMonth}-${startDay}`;
        
        // endDt 계산 (3주 후)
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 20); // 3주 = 21일
        
        // endDt 포맷팅
        const endYear = endDate.getFullYear();
        const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
        const endDay = String(endDate.getDate()).padStart(2, '0');
        
        // endDt 입력
        getEl('#endDt').value = `${endYear}-${endMonth}-${endDay}`;
    });
}
window.addEventListener('load', load);