import nodemailer from 'nodemailer'
import { type User } from '../entity/User'

export const sendRegistrationMail = async (newUser: User): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    })

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: newUser.email,
        subject: `Wellcome ${newUser.first_name}`,
        text: `Hello ${newUser.first_name} ${newUser.last_name}`,
        html: `<b>Hello ${newUser.first_name} ${newUser.last_name}</b><br/>
                   <p>We are so excited to welcome you to our community.</p>
                   <p>Only Chuck Norris jokes are allowed here.</p>`,
    })

    console.log('Message sent to: ', newUser.email)
}
