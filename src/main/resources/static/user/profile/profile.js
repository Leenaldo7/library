const header = document.querySelector(".edit_header");
const user = JSON.parse(sessionStorage.getItem("userInformation"));
const email = document.querySelector("#email");
const email_text = document.querySelector("#email_text");

(load())

const backBtn = document.querySelector(".backBtn");
const password = document.querySelector("#password");
const before_password = document.querySelector("#before_password");
const email_form = document.querySelector("#email-form");
const password_form = document.querySelector("#password-form");

email_form.addEventListener("submit", editEmail);

password_form.addEventListener("submit", editPassword);





async function editEmail(event){
    event.preventDefault();

    if(user.password !== before_password.value){
        alert("현재 비밀번호가 틀렸습니다!");
        return ;
    }
    const userData = {
        name : user.name,
        password : user.password,
        email : email.value.toLowerCase(),
        isadmin : user.isadmin
    };

    const isCorrectEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email);

    if(!(isCorrectEmail)){
        alert("입력 정보를 다시 확인해주세요");
        return;
    }

    try{
        const response = await fetch("http://localhost:8080/user/member/editEmail", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(userData)
        });

        if(!response.ok){
            const errorText = await response.text();
            alert(errorText);
            return;
        }

        const data = await response.text();
        alert(data);
        window.history.back();


    } catch(error){
        console.log(error);
    }
}

async function editPassword(event){
    event.preventDefault();
    if(user.password !== before_password.value){
        alert("현재 비밀번호가 틀렸습니다!");
        return ;
    }
    const userData = {
        name : user.name,
        password : password.value,
        email : user.email,
        isadmin : user.isadmin
    };
    const isPasswordEmpty = !(/^\S+$/).test(userData.password);

    if(isPasswordEmpty){
        alert("비밀번호를 입력하세요");
        return;
    }

    try{
        const response = await fetch("http://localhost:8080/user/member/editPassword", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(userData)
        });

        if(!response.ok){
            const errorText = await response.text();
            alert(errorText);
            return;
        }

        const data = await response.text();
        alert(data);
        window.history.back();

    } catch(error){
        console.log(error);
    }
}
function load(){
    if(user.name === null){
        window.location.replace('/');
    }
    else{
        header.innerText = user.name+"님의 회원정보 수정";
        email_text.innerText = `현재 이메일 : ${user.email} `;
    }
}
backBtn.addEventListener("click",function(){
    location.href = "/user";
})

