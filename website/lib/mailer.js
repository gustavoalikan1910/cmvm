import nodemailer from 'nodemailer';

export async function sendMail({ to, subject, html }) {
    // Cria uma conta de teste descartável (Ethereal Email) sempre que formos enviar para ambiente DEV
    let testAccount = await nodemailer.createTestAccount();
    
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    let info = await transporter.sendMail({
        from: '"CVMC Data Platform DaaS" <admin@cvmc.com>',
        to,
        subject,
        html,
    });

    console.log("---- NOVO E-MAIL MOCKADO ENVIADO ----");
    console.log("ASSUNTO: %s", info.subject);
    console.log("URL de Pré-visualização do Mock E-mail (CLIQUE AQUI PARA LER): %s", nodemailer.getTestMessageUrl(info));
    console.log("-----------------------------------------");

    return info;
}
