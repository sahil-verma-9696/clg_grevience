const form = document.querySelector("form");
const fetchData = (apiKey)=>{
    form.addEventListener("submit",async (event)=>{
        event.preventDefault();    
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const api = `http://localhost:3000/api/stu_registration`;
        const option={
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body:JSON.stringify(formJson)
        }
        console.log(formJson);
        console.log(apiKey);  
        try {
            const responce = await fetch(api,option); 
            const raw = await responce.json();
            console.log(raw)
        } catch (error) {
            console.log(`registration ${error}`);
        }
    });
}       