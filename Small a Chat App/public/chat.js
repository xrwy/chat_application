const socket = io.connect('http://127.0.0.1:3000/');

const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');


document.getElementById('sender').disabled = true;

function getUserName(){
    base64Username1 = null;
    nameGet = prompt("Enter Username : ");
    if(nameGet == "" || nameGet == null){
        document.getElementById('sender').value = nameGet;
        document.getElementById('message').disabled = true;
        document.getElementById('submitBtn').disabled = true;
    }else{
        document.getElementById('sender').value = nameGet;
        let usernameBaseGet = btoa("username");
        const value = localStorage.getItem(usernameBaseGet);
        //localStorage.clear();
        let base64;
        if(value == null){
            base64 = btoa(nameGet);
            let usernameBaseKey = btoa("username");
            userNameInfo = {"dXNlcm5hbWU=":base64};
            let userNameInfoValues = [];
            userNameInfoValues.push(userNameInfo);
            let usernameBaseSet = btoa("username");
            localStorage.setItem(usernameBaseSet, JSON.stringify(userNameInfoValues));
        }else{
            base64Username1 = btoa(nameGet);
            userNameInfo = {"dXNlcm5hbWU=":base64Username1};
            let usernameBaseGet2 = btoa("username");
            let userNameGet = localStorage.getItem(usernameBaseGet2);
            array = JSON.parse(userNameGet);
            let c = 0;
            for(let i = 0; i < array.length; i++){
                console.log(array[i]["dXNlcm5hbWU="]);
                if(array[i]["dXNlcm5hbWU="] == base64Username1){
                    return;
                }else{
                    ''
                }
            }
            let base64Username2 = btoa(nameGet);
            let userNameValue = {"dXNlcm5hbWU=": base64Username2};
            array.push(userNameValue);
            let usernameBaseSet2 = btoa("username");
            localStorage.setItem(usernameBaseSet2, JSON.stringify(array));

        }
       
    }
}

getUserName();


submitBtn.addEventListener('click', () => {
    if(document.getElementById('message').value.length == 0){
        return;
    }
    else{
        socket.emit('chat', {
            message: message.value,
            sender: sender.value
        })
    }
})

let dateObj = new Date();

socket.on('chat', data => {
    feedback.innerHTML = '';
    if(dateObj.getHours() < 10){
        newHours = "0" + dateObj.getHours();
    }else{
        newHours = dateObj.getHours();
    }
    if(dateObj.getMinutes() < 10){
        newMınutes = "0" + dateObj.getMinutes();
    }else{
        newMınutes = dateObj.getMinutes();
    }


    output.innerHTML += `<p><strong> ${data.sender} :   </strong> <span style='margin-left:2px'>${ data.message}</span>  
        <span class='absolute font'><b>${newHours} : ${newMınutes}</b></span>
    </p>`;
    message.value = '';
})

message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value);
})

socket.on('typing', data => {
    feedback.innerHTML = `<p> ${data}  writing... </p>`;
});
