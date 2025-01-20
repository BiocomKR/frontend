document.addEventListener('DOMContentLoaded', async function() {
    const logFileSelect = document.getElementById('logFile');
    const refreshBtn = document.getElementById('refreshBtn');
    const autoRefreshCheckbox = document.getElementById('autoRefresh');
    let autoRefreshInterval;
     // 초기 파일 목록 로드
    await updateFileList();
     // 로그 파일 선택 변경 이벤트
    logFileSelect.addEventListener('change', loadLogs);
     // 새로고침 버튼 클릭 이벤트
    refreshBtn.addEventListener('click', async () => {
        await updateFileList();
        await loadLogs();
    });
     // 자동 새로고침 체크박스 이벤트
    autoRefreshCheckbox.addEventListener('change', function() {
        if (this.checked) {
            autoRefreshInterval = setInterval(async () => {
                await updateFileList();
                await loadLogs();
            }, 10000);
        } else {
            clearInterval(autoRefreshInterval);
        }
    });
     // 초기 로그 로드
    if (logFileSelect.value) {
        await loadLogs();
    }
});

async function updateFileList() {
    try {
        const response = await fetch('/report/api/logs/files');
        const files = await response.json();
        
        const logFileSelect = document.getElementById('logFile');
        const currentValue = logFileSelect.value;
        
        // 기존 옵션들 제거
        logFileSelect.innerHTML = '';
        
        // 새로운 파일 목록 추가
        files.forEach(file => {
            const option = document.createElement('option');
            option.value = file;
            option.textContent = file;
            logFileSelect.appendChild(option);
        });
         // 이전 선택값 유지
        if (currentValue && files.includes(currentValue)) {
            logFileSelect.value = currentValue;
        }
    } catch (error) {
        console.error('파일 목록 업데이트 중 오류 발생:', error);
    }
}

async function loadLogs() {
    try {
        const logFile = document.getElementById('logFile').value;
        if (!logFile) return;
         const response = await fetch(`/api/logs/content/${logFile}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const logs = await response.text();
        
        const logContainer = document.getElementById('logContainer');
        logContainer.innerHTML = logs.split('\n')
            .map(line => `<div class="log-line">${line}</div>`)
            .join('');
            
        logContainer.scrollTop = logContainer.scrollHeight;
    } catch (error) {
        console.error('로그 로딩 중 오류 발생:', error);
    }
}