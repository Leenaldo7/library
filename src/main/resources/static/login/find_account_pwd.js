const findPwd = document.querySelector("#findPwdForm");
const homeBtn = document.querySelector(".homeBtn");
const email = document.querySelector("#email");
const name = document.querySelector("#name");

window.onload = load;

findPwd.addEventListener("submit",checkPwd)

homeBtn.addEventListener("click",function(){
    location.href = "/login";
})

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

function load(){
    name.value = "";
    email.value = "";
}