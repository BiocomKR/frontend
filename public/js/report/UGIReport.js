/***
 * @description 유기산 리포트 생성 js
 * @author jisoo
 * @date 24-11-01
 */

const print_mode = ()=>{
    document.body.classList.add('print-mode');
        window.print();
        setTimeout(() => {
            document.body.classList.remove('print-mode');
        }, 1000);
}

const createPage = (data) =>{

}


const load = async () => {
    // 데이터 로드
    try {
        const username = document.getElementById('hiddenUsername').value;
        const data = await jsonProvider(`/api/UGIReport?username=${encodeURIComponent(username)}`);
        if (data.error) throw new Error(data.error);
        console.log(data);
        
    } catch (error) {
        console.error('데이터 로딩 실패:', error);
    }




    // 프린트...
    document.querySelector('.header-btn').addEventListener('click',async ({target})=>{
        if(target.classList == 'print'){
            print_mode();
        }
        // if(target.classList == 'pdf-save'){
        //     window.scrollTo({ top: 0,}); 
        //     pdf_mode();
        // }
    });
}
window.addEventListener('load', load);