const findPwd = document.querySelector("#findPwdForm");
const homeBtn = document.querySelector(".homeBtn");
const email = document.querySelector("#email");
const name = document.querySelector("#name");
const sendEmailBtn = document.querySelector(".sendEmailBtn");


window.onload = load;

findPwd.addEventListener("submit",checkPwd)
homeBtn.addEventListener("click",function(){
    location.href = "/login";
})
sendEmailBtn.addEventListener("click", sendEmailCode);

async function checkPwd(event){
    event.preventDefault();

    const userData = {
        name : name.value,
        email : email.value
    }

    if(userData.name === "" || userData.email === ""){
        alert("아이디와 비밀번호를 입력하세요");
        return;
    }

    try{
        const response = await fetch('http://localhost:8080/find_account_pwd/check_pwd', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(userData)
        });

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            // 응답이 JSON 형식인 경우
            const data = await response.json();
            if (!response.ok) {
                alert(data.message || "에러 발생");
                return;
            }
            if (data) {
                alert(`비밀번호는 ${data.password} 입니다`);
                location.href = "/login";
            } else {
                alert("사용자 정보를 찾을 수 없습니다.");
            }
        } else {
            // 응답이 텍스트 형식인 경우
            const text = await response.text();
            alert(text);
        }
    } catch(error){
        console.log(error);
    }
}

async function sendEmailCode(event){
    event.preventDefault();
    showLoading();
    const userData = {
        name : document.querySelector("#name").value,
        email : document.querySelector("#email").value.toLowerCase()
    };


    const isNameEmpty = !(/^\S+$/).test(userData.name);
    const isCorrectEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email);

    if(isNameEmpty || !(isCorrectEmail)){
        alert("빈칸을 채워주세요");
        return;
    }


    try{
        const response = await fetch('http://localhost:8080/find_account_pwd/sendEmail',{
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
    } finally {
        hideLoading();
    }

}
async function verifyEmailCode(){
    const userData = {
        name : document.querySelector("#name").value,
        code : document.querySelector("#emailCode").value
    }
    try {
        const response = await fetch('http://localhost:8080/find_account_pwd/checkEmailCode',{
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
function load(){
    name.value = "";
    email.value = "";
}

function showLoading() {
    document.querySelector('.loading').style.display = 'block';
}

function hideLoading() {
    document.querySelector('.loading').style.display = 'none';
}