document.querySelector("#registerForm").addEventListener("submit",registerConfirmFun);
document.querySelector(".checkEmailBtn").addEventListener("click", checkEmailFun);
document.querySelector(".checkNameBtn").addEventListener("click",checkNameFun);
const checkEmailResult = document.querySelector(".checkEmailResult");
const checkNameResult = document.querySelector(".checkNameResult");
async function registerConfirmFun(event){
    event.preventDefault();

    const userData={
        name : document.querySelector("#name").value,
        password : document.querySelector("#password").value,
        email : document.querySelector("#email").value.toLowerCase()
    };
    const isNameEmpty = !(/^\S+$/).test(userData.name);
    const isCorrectEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email);
    if(isNameEmpty || !(isCorrectEmail)){
        alert("이름 또는 이메일을 다시 확인해주세요");
        return;
    }
    try{
        const response = await fetch('http://localhost:8080/user/member/createAccountConfirm', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert(errorText); // 중복 오류 메시지를 표시
            return; // 함수를 여기서 종료
        }

        const data = await response.text();
        alert(data);
        window.history.back();


    } catch(error){
        console.error("ERROR");
    }

}
async function checkEmailFun(){
    const email = document.querySelector("#email").value.toLowerCase();
    const url = `http://localhost:8080/checkUserEmail?email=${encodeURIComponent(email)}`;

    try {
        const isCorrectEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        const response = await fetch(url);
        const isNotOverlapped  = await response.text() === 'true';

        if(isCorrectEmail && isNotOverlapped) {
            showCheckEmailResult(true);
        }
        else {
            showCheckEmailResult(false);
        }

    } catch (error) {
        console.error(error);
    }
}
async function checkNameFun(){
    const name = document.querySelector("#name").value.toLowerCase();
    const url = `http://localhost:8080/checkUserName?name=${encodeURIComponent(name)}`;
    const isNotNameEmpty = /^\S+$/.test(name);
    try {
        const response = await fetch(url);
        const isNotOverlapped  = await response.text() === 'true';

        if(isNotNameEmpty && isNotOverlapped) {
            showCheckNameResult(true);
        }
        else {
            showCheckNameResult(false);
        }

    } catch (error) {
        console.error(error);
    }
}
function showCheckEmailResult(boolean){
    if(boolean){
        checkEmailResult.innerHTML = "사용 가능한 이메일입니다.";
        checkEmailResult.style.cssText = "display: block; color: blue; ";
    }
    else{
        checkEmailResult.innerHTML = "사용 불가능한 이메일입니다."
        checkEmailResult.style.cssText = "display: block; color: red;";
    }
}

function showCheckNameResult(boolean){
    if(boolean){
        checkNameResult.innerHTML = "사용 가능한 이름입니다.";
        checkNameResult.style.cssText = "display: block; color: blue; ";
    }
    else{
        checkNameResult.innerHTML = "사용 불가능한 이름입니다."
        checkNameResult.style.cssText = "display: block; color: red;";
    }
}