const checkEmailResult = document.querySelector(".checkEmailResult");
const checkNameResult = document.querySelector(".checkNameResult");
const homeBtn = document.querySelector(".homeBtn");
const sendEmailBtn = document.querySelector(".sendEmailBtn");

const state = {
    name_check : false,
    email_check : false,
    email_authentication : false
}

document.querySelector("#registerForm").addEventListener("submit",registerConfirmFun);
document.querySelector(".checkEmailBtn").addEventListener("click", checkEmailFun);
document.querySelector(".checkNameBtn").addEventListener("click",checkNameFun);

sendEmailBtn.addEventListener("click", sendEmailCode);

async function registerConfirmFun(event){
    event.preventDefault();

    const userData={
        name : document.querySelector("#name").value,
        password : document.querySelector("#password").value,
        email : document.querySelector("#email").value.toLowerCase()
    };
    const isNameEmpty = !(/^\S+$/).test(userData.name);
    const isPasswordEmpty = !(/^\S+$/).test(userData.password);
    const isCorrectEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email);

    if(isNameEmpty || isPasswordEmpty || !(isCorrectEmail)){
        alert("입력 정보를 다시 확인해주세요");
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
        const textResponse = await response.text();
        const isNotOverlapped = textResponse === 'true';

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

homeBtn.addEventListener("click", function(){
    location.href = "/";
})


async function checkNameFun(){
    const name = document.querySelector("#name").value.toLowerCase();
    const url = `http://localhost:8080/checkUserName?name=${encodeURIComponent(name)}`;
    const isNotNameEmpty = /^\S+$/.test(name);
    try {
        const response = await fetch(url);
        const textResponse = await response.text();
        const isNotOverlapped = textResponse === 'true';

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

async function sendEmailCode(event){
        event.preventDefault();

    const userData = {
        name : document.querySelector("#name").value,
        password : document.querySelector("#password").value,
        email : document.querySelector("#email").value.toLowerCase()
    };


        const isNameEmpty = !(/^\S+$/).test(userData.name);
        const isPasswordEmpty = !(/^\S+$/).test(userData.password);
        const isCorrectEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email);

    if(isNameEmpty || isPasswordEmpty || !(isCorrectEmail)){
        alert("빈칸을 채워주세요");
        return;
    }


        try{
            const response = await fetch('http://localhost:8080/createAccountForm/sendEmail',{
                method: "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(userData)
            });

            const text = await response.text();
            if(response.ok) { // 성공적으로 이메일을 보냈을 때만 버튼 텍스트와 이벤트 리스너 변경
                alert(text);
                document.getElementById("emailCode").style.display = "block";
                document.querySelector("label[for='emailCode']").style.display = "block";
                const sendEmailBtn = document.querySelector(".sendEmailBtn");
                sendEmailBtn.innerText = "인증 코드 확인";

                sendEmailBtn.removeEventListener("click", sendEmailCode);
                sendEmailBtn.addEventListener("click", verifyEmailCode);
            } else {
                alert(text);
            }

        } catch(e){
            alert(e);
        }

}

async function verifyEmailCode(){
    const userData = {
        name : document.querySelector("#name").value,
        code : document.querySelector("#emailCode").value
    }
    try {
        const response = await fetch('http://localhost:8080/createAccountForm/checkEmailCode',{
            method: "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(userData)
        });

        const text = await response.text();

        if(response.ok) {
            alert(text);
            document.querySelector(".emailVerificationResult").style.display = "block";
            document.querySelector(".emailVerificationResult").innerText = "이메일 인증 완료!";
            document.getElementById("emailCode").style.display = "none";
            document.querySelector("label[for='emailCode']").style.display = "none";
            document.querySelector("#email").style.pointerEvents = "none";
            document.querySelector(".sendEmailBtn").style.display = "none"; // 버튼 숨기기
        } else {
            alert(text);
            document.querySelector(".emailVerificationResult").innerText = "인증 코드가 잘못되었습니다.";
            document.querySelector(".emailVerificationResult").style.display = "block";
        }

    } catch(e){
        alert(e);
    }

}



function showCheckEmailResult(boolean){
    if(boolean){
        checkEmailResult.innerHTML = "사용 가능한 이메일입니다.";
        checkEmailResult.style.cssText = "display: block; color: blue; ";
        state.email_check = true;
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