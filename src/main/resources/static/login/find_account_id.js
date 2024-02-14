const findId = document.querySelector("#findForm");
const homeBtn = document.querySelector(".homeBtn");
const email = document.querySelector("#email");

window.onload = load;

findId.addEventListener("submit",checkId)

homeBtn.addEventListener("click",function(){
    location.href = "/login";
})

async function checkId(event){
    event.preventDefault();



    try{
        const response = await fetch('http://localhost:8080/find_account_id/check_email', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : email.value
        });

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            // 응답이 JSON 형식인 경우
            const data = await response.json();
            if (!response.ok) {
                alert(data.message || "An error occurred.");
                return;
            }
            if (data.name) {
                alert(`아이디는 ${data.name} 입니다`);
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
    email.value = "";
}