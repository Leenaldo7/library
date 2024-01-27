const loginForm = document.querySelector("#loginForm");
const homeBtn = document.querySelector(".homeBtn");

loginForm.addEventListener("submit", checkLogin);

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