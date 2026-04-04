import nodemailer from 'nodemailer';

export async function sendMail({ to, subject, html }) {
    // Utilizando conexão SMTP real validada através do Brevo configurada no Docker Compose
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false, // true para 465, false para 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: `"CVMC Data Platform DaaS" <${process.env.SMTP_FROM}>`,
        to,
        subject,
        html,
    });

    console.log("---- DISPARO DE E-MAIL REAL EFETUADO COM SUCESSO ----");
    console.log("Mensagem ID: %s", info.messageId);
    console.log("Destinatário: %s", to);
    console.log("-----------------------------------------------------");

    return info;
}
