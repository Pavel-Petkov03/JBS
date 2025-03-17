import {createClient} from "redis"
const client = createClient({
    url : "redis://localhost:6379"
});
client.
    connect().
    then(() => {
        console.log("[CONNECTED TO REDIS SUCCESSFULLY]"); 
    }).catch((error) => {
        if (error instanceof Error){
            console.log("[REDIS SERVER ERROR]", error.message);
        }
    }); 

export default client
