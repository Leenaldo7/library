const loginForm = document.querySelector("#loginForm");
const homeBtn = document.querySelector(".homeBtn");
const findBtnContainer = document.querySelector(".findBtnContainer");

loginForm.addEventListener("submit", checkLogin);

findBtnContainer.addEventListener("click", function(e){
        const name = e.target.className;

        switch(name){
                case 'findId':
                        location.href="/find_account_id";
                        return;
                case 'findPassword' :
                        location.href="/find_account_pwd";
                        return;

        }
})

homeBtn.addEventListener("click", function(){
        location.href = "/";
})

async function checkLogin(event){
        event.preventDefault();

        const userData = {
                name : document.querySelector("#name").value,
                password : document.querySelector("#password").value
        };

        if(userData.name === "" || userData.password === ""){
                alert("아이디와 비밀번호를 입력하세요");
                return;
        }
        try{
                const response = await fetch('http://localhost:8080/login/checkLogin', {
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
                sessionStorage.setItem("userName", userData.name);
                location.href = "/user"

        } catch(error){
                console.log(error);
        }

}