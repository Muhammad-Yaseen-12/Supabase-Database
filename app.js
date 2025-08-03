const SUPABASE_URL = `https://lysruuuthxwconiytdfq.supabase.co`;
const SUPABASE_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5c3J1dXV0aHh3Y29uaXl0ZGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3OTU2OTUsImV4cCI6MjA2OTM3MTY5NX0.-3K1v524kHNZRLJqUdNFGAgMlnt4oryv6euc1awlemo`;
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
let submit = document.getElementById("submit")
let fname = document.getElementById("fname")
let lname = document.getElementById("lname")
let list = document.getElementById("list")

submit.addEventListener("click", async () => {

    const { error } = await supabase
        .from('users')
        .insert({ fname: fname.value, lname: lname.value })

    if (error) {
        console.log(error)
    } else {
        console.log("Data inserted successfully")
        renderData()
    }
})
let renderData = async () => {
    list.innerHTML = "";
    const { data, error } = await supabase
        .from('users')
        .select("*")

    if (data) {
        console.log(data)
        data.map((v) => {
            list.innerHTML += `<li>${v.fname} ${v.lname} <button onclick="edit(${v.id})">edit</button> 
            <button onclick="deleteD(${v.id})">delete</button>
            </li>`
        })

    } else {
        console.log(error)
    }

}
renderData()


let edit = async (id) => {
    list.innerHTML = ""
    let newValue1 = prompt("Enter your first name");
    let newValue2 = prompt("Enter your last name");

    if (!newValue1 || !newValue2) {
        alert("Please enter a value");
        return;
    }

    const { data, error } = await supabase
        .from('users')
        .update({ fname: newValue1, lname: newValue2 })
        .eq('id', id)
        .select()


    if (data) {
        renderData();
        console.log(data);
    } else {

        console.log(error);
    }
};
window.edit = edit
let deleteD = async (id) => {
    list.innerHTML = ""


    const response = await supabase
        .from('users')
        .delete()
        .eq('id', id)
        // .select()
        // console.log(response);
        renderData()
        

};
window.deleteD = deleteD
