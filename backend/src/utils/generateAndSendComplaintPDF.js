import fs from 'fs';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import nodemailer from 'nodemailer';

const generateAndSendComplaintPDF = async (user, ticket) => {
    const templatePath = path.join('assets', 'templates', 'NyayaSetu - Citizen Complaint Form.pdf');
    const templateBytes = await fs.promises.readFile(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const drawText = (text, x, y, size = 10) => {
        page.drawText(text || '-', {
            x,
            y,
            size,
            font,
            color: rgb(0, 0, 0),
        });
    };

    const wrapText = (text, maxChars = 90) => {
        const words = text.split(' ');
        const lines = [];
        let line = '';

        words.forEach(word => {
            if ((line + word).length <= maxChars) {
                line += word + ' ';
            } else {
                lines.push(line.trim());
                line = word + ' ';
            }
        });
        if (line) lines.push(line.trim());
        return lines;
    };

    drawText(ticket.title, 130, 570);
    drawText(ticket.department, 150, 545);
    drawText(user.name, 150, 435);
    drawText(user.email, 75, 405);
    drawText(ticket.officerName, 130, 300);
    drawText(ticket.location.city, 165, 155);
    drawText(ticket.location.state, 165, 145);
    drawText(new Date().toLocaleDateString(), 160, 130);

    const descriptionLines = wrapText(ticket.description || '', 80);
    descriptionLines.forEach((line, i) => {
        drawText(line, 200, 270 - i * 14);
    });

    const evidenceLines = wrapText(ticket.evidence || '', 80);
    evidenceLines.forEach((line, i) => {
        drawText(line, 100, 210 - i * 14);
    });

    const pdfBytes = await pdfDoc.save();
    const fileName = `complaint_${ticket._id}.pdf`;
    const filePath = path.join('public', 'tickets', fileName);
    await fs.promises.writeFile(filePath, pdfBytes);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Your Complaint Form – NyayaSetu',
        text: `Dear ${user.name},\n\nThank you for submitting your complaint. Please find the attached complaint form for your reference.\n\nNyayaSetu Team`,
        attachments: [
            {
                filename: fileName,
                path: filePath,
            },
        ],
    };

    await transporter.sendMail(mailOptions);
    try {
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error("Failed to delete PDF:", err.message);
    }

};

export default generateAndSendComplaintPDF;
