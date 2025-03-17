import transporter from "../config/transporter";

async function generateEmail(email : string, subject : string, html : string, replaces : Map<string, string>){
    const currentHtml = html.replace(/{{(.*?)}}/g, (_, key) => replaces.get(key) || "");
    await transporter.sendMail({
        to: email,
        subject: subject,
        html: currentHtml,
    });
}
export default generateEmail