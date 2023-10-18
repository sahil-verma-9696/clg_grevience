const form = document.querySelector("form");

const fetchData = (url,apiKey)=>{
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
    
        // Get form data
        const formData = new FormData(form);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        };
    
        try {
            const response = await fetch(`${url}/api/login`, options);
            if(response){
                location.reload();
            }
        } catch (error) {        
            console.log("Error during fetch:", error);
        }
    });
}   