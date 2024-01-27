const header = document.querySelector(".header");
const userName = sessionStorage.getItem("userName");
const headerBtn = document.querySelector(".header_btn");

(load)();



headerBtn.addEventListener("click",(e)=>{

    switch (e.target.className) {
        case "logoutBtn":
            sessionStorage.removeItem("userName");
            window.location.replace("/");
            return;

        case "userInformationBtn":
            loadUserData().then( ()=>{})

    }

})







function load(){
    if(userName === null){
        window.location.replace('/');
    } else{
        const p = document.createElement("p");
        p.setAttribute("class", "name_p");
        p.innerText = userName+"님 환영합니다!";
        header.insertBefore(p,headerBtn);
    }
}

async function loadUserData(){
    const userData = {
        name : userName
    };

    try{
        const response = await fetch('http://localhost:8080/user/information', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(userData)
            });

        if(!response.ok){
            const errorText = await response.text();
            console.log(errorText);
            return;
        }

        const data = await response.text();
        sessionStorage.setItem("userInformation", data);
        location.href = "/user/profile";

    } catch(e){
        console.log("에러띠");
    }
}